﻿using System.Text;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace VoxelPlay {

	public partial class VoxelPlayEnvironment : MonoBehaviour {

		struct TreeRequest {
			public VoxelChunk chunk;
			public Vector3 chunkOriginalPosition;
			public Vector3 rootPosition;
			public ModelDefinition tree;
		}

		const int TREES_CREATION_BUFFER_SIZE = 20000;

		TreeRequest[] treeRequests;
		int treeRequestLast, treeRequestFirst;
		List<VoxelChunk> treeChunkRefreshRequests;

		void InitTrees () {
			if (treeRequests == null || treeRequests.Length != TREES_CREATION_BUFFER_SIZE) {
				treeRequests = new TreeRequest[TREES_CREATION_BUFFER_SIZE];
			}
			treeRequestLast = -1;
			treeRequestFirst = -1;
			treeChunkRefreshRequests = new List<VoxelChunk> ();
		}


		public ModelDefinition GetTree (BiomeTree[] trees, float random) {
			float acumProb = 0;
			int index = 0;
			for (int t = 0; t < trees.Length; t++) {
				acumProb += trees [t].probability;
				if (random < acumProb) {
					index = t;
					break;
				}
			}
			return trees [index].tree;
		}

		/// <summary>
		/// Requests the tree creation.
		/// </summary>
		/// <param name="chunkOriginalIndex">Chunk original index.</param>
		/// <param name="chunkOriginalPosition">Chunk original position.</param>
		/// <param name="position">Position.</param>
		/// <param name="trees">Trees.</param>
		/// <param name="random">Random value to choose the tree model.</param>
		public void RequestTreeCreation (VoxelChunk chunk, Vector3 position, ModelDefinition treeModel) {
			if (treeModel == null)
				return;

			treeRequestLast++;
			if (treeRequestLast >= treeRequests.Length) {
				treeRequestLast = 0;
			}
			if (treeRequestLast != treeRequestFirst) {
				treeRequests [treeRequestLast].chunk = chunk;
				treeRequests [treeRequestLast].chunkOriginalPosition = chunk.position;
				treeRequests [treeRequestLast].rootPosition = position;
				treeRequests [treeRequestLast].tree = treeModel; // trees[index].tree;
				treesInCreationQueueCount++;
			} else {
				ShowMessage ("New trees request buffer exhausted.");
			}
		}

		/// <summary>
		/// Monitors queue of new trees requests. This function calls CreateTree to create the tree data and pushes a chunk refresh.
		/// </summary>
		void CheckTreeRequests (float endTime) {
			int max = maxTreesPerFrame > 0 ? maxTreesPerFrame : 10000;
			for (int k = 0; k < max; k++) {
				if (treeRequestFirst == treeRequestLast)
					return;
				treeRequestFirst++;
				if (treeRequestFirst >= treeRequests.Length) {
					treeRequestFirst = 0;
				}
				treesInCreationQueueCount--;
				VoxelChunk chunk = treeRequests [treeRequestFirst].chunk;
				if ((object)chunk != null && chunk.allowTrees && chunk.position == treeRequests [treeRequestFirst].chunkOriginalPosition) {
					CreateTree (treeRequests [treeRequestFirst].rootPosition, treeRequests [treeRequestFirst].tree, Random.Range (0, 4));
				}
				long elapsed = stopWatch.ElapsedMilliseconds;
				if (elapsed >= endTime)
					break;
			}
		}

		void CreateTree (Vector3 position, ModelDefinition tree, int rotation) {

			if ((object)tree == null) {
				return;
			}
			Vector3 pos;
			treeChunkRefreshRequests.Clear ();
			VoxelChunk lastChunk = null;
			int modelOneYRow = tree.sizeZ * tree.sizeX;
			int modelOneZRow = tree.sizeX;
			int halfSizeX = tree.sizeX / 2;
			int halfSizeZ = tree.sizeZ / 2;
			int tmp;
			for (int b = 0; b < tree.bits.Length; b++) {

				int bitIndex = tree.bits [b].voxelIndex;
				int py = bitIndex / modelOneYRow;
				int remy = bitIndex - py * modelOneYRow;
				int pz = remy / modelOneZRow;
				int px = remy - pz * modelOneZRow;

				// Random rotation
				switch (rotation) {
				case 0:
					tmp = px;
					px = halfSizeZ - pz;
					pz = tmp - halfSizeX;
					break;
				case 1:
					tmp = px;
					px = pz - halfSizeZ;
					pz = tmp - halfSizeX;
					break;
				case 2:
					tmp = px;
					px = pz - halfSizeZ;
					pz = halfSizeX - tmp;
					break;
				default:
					px -= halfSizeX;
					pz -= halfSizeZ;
					break;
				}

				pos.x = position.x + tree.offsetX + px;
				pos.y = position.y + tree.offsetY + py;
				pos.z = position.z + tree.offsetZ + pz;

				VoxelChunk chunk;
				int voxelIndex;

				if (GetVoxelIndex (pos, out chunk, out voxelIndex)) {
					if (!chunk.modified && (chunk.voxels [voxelIndex].opaque < FULL_OPAQUE || voxelDefinitions [chunk.voxels [voxelIndex].typeIndex].renderType == RenderType.CutoutCross)) {
						VoxelDefinition treeVoxel = tree.bits [b].voxelDefinition ?? defaultVoxel;
						chunk.voxels [voxelIndex].Set (treeVoxel, tree.bits [b].finalColor);
						if (py == 0) {
							// fills one voxel beneath with tree voxel to avoid the issue of having some trees floating on some edges/corners
							if (voxelIndex >= ONE_Y_ROW) {
								if (chunk.voxels [voxelIndex - ONE_Y_ROW].hasContent != 1) {
									chunk.voxels [voxelIndex - ONE_Y_ROW].Set (treeVoxel, tree.bits [b].finalColor);
								}
							} else {
								VoxelChunk bottom = chunk.bottom;
								if (bottom != null && !bottom.modified) {
									if (bottom.voxels [voxelIndex + 15 * ONE_Y_ROW].hasContent != 1) {
										chunk.voxels [voxelIndex + 15 * ONE_Y_ROW].Set (treeVoxel, tree.bits [b].finalColor);
										if (!treeChunkRefreshRequests.Contains (bottom))
											treeChunkRefreshRequests.Add (bottom);
									}
								}
							}
						}
						if (chunk != lastChunk) {
							lastChunk = chunk;
							if (!chunk.inqueue && !treeChunkRefreshRequests.Contains (chunk)) {
								treeChunkRefreshRequests.Add (chunk);
							}
						}
					}
				}
			}
			treesCreated++;

			int refreshChunksCount = treeChunkRefreshRequests.Count;
			for (int k = 0; k < refreshChunksCount; k++) {
				ChunkRequestRefresh (treeChunkRefreshRequests [k], false, true);
			}
		}

	}



}
