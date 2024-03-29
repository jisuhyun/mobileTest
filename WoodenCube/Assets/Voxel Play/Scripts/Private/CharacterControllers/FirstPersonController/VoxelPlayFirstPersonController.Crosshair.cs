﻿using System;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

namespace VoxelPlay
{


	public partial class VoxelPlayFirstPersonController : VoxelPlayCharacterControllerBase
	{
		[Header ("Crosshair")]
		public float crosshairScale = 0.1f;
		public float targetAnimationSpeed = 0.75f;
		public float targetAnimationScale = 0.2f;
		public Color crosshairOnTargetColor = Color.yellow;
		public Color crosshairNormalColor = Color.white;
		[Tooltip ("Crosshair will change over a reachable voxel.")]
		public bool changeOnBlock = true;
		[Tooltip ("Enable move crosshair on screen")]
		public bool freeMode;
		[Tooltip ("When enabled, crosshair colors invert according to background color to enhance visibility. This feature uses GrabPass which can be expensive on mobile.")]
		public bool autoInvertColors = true;

		[Header ("Voxel Highlight")]
		public bool voxelHighlight = true;
		public Color voxelHighlightColor = Color.yellow;
		[Range(1f,100f)]
		public float voxelHighlightEdge = 20f;


		Transform crosshair;
		const string CROSSHAIR_NAME = "Crosshair";
		Material crosshairMat;
		bool forceUpdateCrosshair;

		void InitCrosshair ()
		{
			if (env.crosshairPrefab == null) {
				Debug.LogError ("Crosshair prefab not assigned to this world.");
				return;
			} 
			GameObject obj = Instantiate<GameObject> (env.crosshairPrefab);
			obj.name = CROSSHAIR_NAME;
			if (autoInvertColors) {
				crosshairMat = Resources.Load<Material> ("VoxelPlay/Materials/VP Crosshair");
			} else {
				crosshairMat = Resources.Load<Material> ("VoxelPlay/Materials/VP Crosshair No GrabPass");
			}
			crosshairMat = Instantiate<Material> (crosshairMat);
			crosshairMat.hideFlags = HideFlags.DontSave;
			obj.GetComponent<Renderer> ().sharedMaterial = crosshairMat;
			if (env.crosshairTexture != null) {
				crosshairMat.mainTexture = env.crosshairTexture;
			}
			crosshair = obj.transform;
			crosshair.SetParent (m_Camera.transform, false);
			ResetCrosshairPosition ();

			// ensure crosshair gets updated when a chunk changes on screen (including custom voxels which are created when rendering the chunk)
			env.OnChunkRender += (VoxelChunk chunk) => {
				forceUpdateCrosshair = true;
			};
		}

		public void ResetCrosshairPosition ()
		{
			UpdateCrosshairScreenPosition ();
			crosshair.localRotation = Misc.quaternionZero;
			crosshair.localScale = Misc.vector3one * crosshairScale;
			crosshairMat.color = crosshairNormalColor;
		}

		void UpdateCrosshairScreenPosition ()
		{
			if (freeMode) {
				Vector3 scrPos = input.screenPos;
				scrPos.z = m_Camera.nearClipPlane + 0.001f;
				Vector3 newPosition = m_Camera.ScreenToWorldPoint (scrPos);
				if (switchingLapsed < 1f) {
					crosshair.position = Vector3.Lerp (crosshair.position, newPosition, switchingLapsed);
				} else {
					crosshair.position = newPosition;
				}
			} else {
				if (switchingLapsed < 1f) {
					crosshair.localPosition = Vector3.Lerp (crosshair.localPosition, Misc.vector3forward * (m_Camera.nearClipPlane + 0.001f), switchingLapsed);
				} else {
					crosshair.localPosition = Misc.vector3forward * (m_Camera.nearClipPlane + 0.001f);
				}
			}
		}


		void LateUpdate ()
		{
			if (env == null || !env.applicationIsPlaying)
				return;

			if (freeMode || switching) {
				UpdateCrosshairScreenPosition ();
				forceUpdateCrosshair = true;
			}

			if (env.cameraHasMoved || forceUpdateCrosshair) {
				forceUpdateCrosshair = false;

				Ray ray;
				if (freeMode || switching) {
					ray = m_Camera.ScreenPointToRay (input.screenPos);
				} else {
					ray = new Ray (m_Camera.transform.position, m_Camera.transform.forward);
				}

				// Check if there's a voxel in range
				crosshairOnBlock = env.RayCast (ray, out crosshairHitInfo, VoxelPlayPlayer.instance.hitRange) && crosshairHitInfo.voxelIndex>=0; 
				if (changeOnBlock) {
					if (crosshairOnBlock) {
						// Puts crosshair over the voxel but do it only if crosshair won't disappear because of the angle or it's switching from orbit to free mode (or viceversa)
						float d = -1;
						if (crosshairHitInfo.sqrDistance > 6f) {
							d = Vector3.Dot (ray.direction, crosshairHitInfo.normal);
						}
						if (d < -0.2f && switchingLapsed >= 1f) {
							crosshair.position = crosshairHitInfo.point;
							crosshair.LookAt (crosshairHitInfo.point + crosshairHitInfo.normal);
						} else {
							crosshair.localRotation = Misc.quaternionZero;
						}
						crosshairMat.color = crosshairOnTargetColor;
					} else {
						ResetCrosshairPosition ();
					}
				}
			}
			//if (crosshairOnBlock) {
			//	crosshair.localScale = Misc.vector3one * (crosshairScale * (1f - targetAnimationScale * 0.5f + Mathf.PingPong (Time.time * targetAnimationSpeed, targetAnimationScale)));
			//	if (voxelHighlight) {
   //                 if (crosshairHitInfo.voxelCenter.y != 0.5f) {
   //                     env.VoxelHighlight(crosshairHitInfo, voxelHighlightColor, voxelHighlightEdge);
   //                 }
   //                 else
   //                 {
   //                     env.VoxelHighlight(false);
   //                 }
   //             }
			//} else {
			//	env.VoxelHighlight (false);
			//}
		}
	}
}

