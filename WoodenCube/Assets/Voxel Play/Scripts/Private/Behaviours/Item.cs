﻿using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace VoxelPlay {

	/// <summary>
	/// This behaviour should be attached to any object in the scene that can be recovered or damaged by the player
	/// </summary>
	public class Item : MonoBehaviour {

		/// <summary>
		/// The item type represented by this object.
		/// </summary>
		public ItemDefinition itemDefinition;

		public float quantity = 1f;

		public bool autoRotate = true;

		/// <summary>
		/// If set to true, this item will be added to the chunk items list. If item moves (ie. falls down), it will switch chunk automatically
		/// </summary>
		public bool persistentItem;

		/// <summary>
		/// Resistance points left for this item. Used for items that can be damaged on the scene (not voxels).
		/// </summary>
		[NonSerialized]
		public byte resistancePointsLeft;

		/// <summary>
		/// If this object represents an item that can be picked up by a player
		/// </summary>
		[NonSerialized]
		public bool canPickUp;

		[NonSerialized]
		public float creationTime;

		const float PICK_UP_START_DISTANCE_SQR = 6.5f;
		const float PICK_UP_END_DISTANCE_SQR = 0.81f;
		const float ROTATION_SPEED = 40f;

		[NonSerialized, HideInInspector]
		public Rigidbody rb;

		[NonSerialized]
		public bool pickingUp;

		VoxelPlayEnvironment env;
		VoxelChunk lastChunk;
		Material mat;
		Vector3 lastPosition;


		void Start () {
			if (rb == null) {
				rb = GetComponent<Rigidbody> ();
			}
			if (persistentItem) {
				env = VoxelPlayEnvironment.instance;
				// Clone material to support voxel lighting
				Renderer renderer = GetComponent<Renderer> ();
				if (renderer != null) {
					mat = renderer.sharedMaterial;
					if (mat != null) {
						mat = Instantiate<Material> (mat);
						renderer.sharedMaterial = mat;
					}
				}
				ManageItem ();
			}
		}

		void Update () {
			if (!canPickUp || itemDefinition == null || rb == null)
				return;

			if (autoRotate) {
				rb.rotation = Quaternion.Euler (Misc.vector3up * ((Time.time * ROTATION_SPEED) % 360));
			}

			if (persistentItem) {
				ManageItem ();
			}

			if (!pickingUp) {
				if (Time.frameCount % 10 != 0)
					return;
			}

			// Check if player is near
			Vector3 playerPosition = VoxelPlayEnvironment.instance.playerGameObject.transform.position;
			Vector3 pos = transform.position;

			float dx = playerPosition.x - pos.x;
			float dy = playerPosition.y - pos.y;
			float dz = playerPosition.z - pos.z;

			if (pickingUp) {
				pos.x += dx * 0.25f;
				pos.y += dy * 0.25f;
				pos.z += dz * 0.25f;
				rb.transform.position = pos;
			}

			if (Time.time - creationTime > 1f) { 
				float dist = dx * dx + dy * dy + dz * dz;
				if (dist < PICK_UP_END_DISTANCE_SQR) {
					VoxelPlayPlayer.instance.AddInventoryItem (itemDefinition, quantity);
					VoxelPlayUI.instance.RefreshInventoryContents ();
					PlayPickupSound (itemDefinition.pickupSound);
					if (persistentItem) {
						Destroy (gameObject);
					} else {
						gameObject.SetActive (false);
					}
				} else if (dist < PICK_UP_START_DISTANCE_SQR) {
					pickingUp = true;
				}
			}
		}

		void PlayPickupSound (AudioClip sound) {
			AudioSource audioSource = VoxelPlayPlayer.instance.audioSource;
			if (audioSource == null)
				return;
			if (sound != null) {
				audioSource.PlayOneShot (sound);
			} else if (VoxelPlayEnvironment.instance.defaultPickupSound != null) {
				audioSource.PlayOneShot (VoxelPlayEnvironment.instance.defaultPickupSound);
			}
		}

		void ManageItem () {
			if (env == null )
				return;
			
			Vector3 currentPosition = transform.position;

			if (lastChunk != null && lastChunk.isRendered) {
				if (currentPosition == lastPosition) {
					return;
				}
				lastPosition = currentPosition;
			}

			// Update lighting
			if (mat != null) {
				mat.SetFloat ("_VoxelLight", env.GetVoxelLight (currentPosition));
			}

			// Update owner chunk
			VoxelChunk currentChunk;
			if (!env.GetChunk (currentPosition, out currentChunk, true))
				return;
			if (currentChunk != lastChunk) {
				if (lastChunk != null) {
					lastChunk.RemoveItem (this);
				}
				currentChunk.AddItem (this);
				lastChunk = currentChunk;
			}

			if (currentChunk.isRendered && rb != null && !rb.useGravity) {
				rb.useGravity = true;
			}
		}

		void OnDestroy() {
			if (lastChunk != null) {
				lastChunk.RemoveItem (this);
			}
		}


	}

}