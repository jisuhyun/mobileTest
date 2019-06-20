using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using Random = UnityEngine.Random;

namespace VoxelPlay {

	public abstract partial class VoxelPlayCharacterControllerBase : MonoBehaviour {


		[Header ("Start Position")]
		[Tooltip ("Places player on a random position in world which is flat. If this option is not enabled, the current gameobject transform position will be used.")]
		public bool startOnFlat = true;

		[Tooltip ("Number of terrain checks to determine a flat position. The more iterations the lower the resulting starting position.")]
		[Range (1, 100)]
		public int startOnFlatIterations = 50;

		[Header ("State Flags (Informative)")]
		[Tooltip ("Player is flying - can go up/down with E and Q keys.")]
		public bool isFlying;

		[Tooltip ("Player is moving (walk or run)")]
		public bool isMoving;

		[Tooltip ("Player is pressing any move key")]
		public bool isPressingMoveKeys;

		[Tooltip ("Player is running")]
		public bool isRunning;

		[Tooltip ("Player is either on water surface or under water")]
		public bool isInWater;

		[Tooltip ("Player is on water surface.")]
		public bool isSwimming;

		[Tooltip ("Player is below water surface.")]
		public bool isUnderwater;

		[Tooltip ("Player is on ground.")]
		public bool isGrounded;

		[Tooltip ("Player is crouched.")]
		public bool isCrouched;

        [Tooltip("Player is rotate Mouse")]
        public bool isMouseRotation;



        [Header ("Swimming")]

		// the sound played when character enters water.
		public AudioClip waterSplash;
		// an array of swim stroke sounds that will be randomly selected from.
		public AudioClip[] swimStrokeSounds;
		public float swimStrokeInterval = 8;

		[Header ("Walking")]
		// an array of footstep sounds that will be randomly selected from.
		public AudioClip[] footstepSounds;

		[Range (0f, 1f)] public  float runstepLenghten = 0.7f;
		public float footStepInterval = 5;

		// the sound played when character leaves the ground.
		public AudioClip jumpSound;

		// the sound played when character touches back on ground.
		public AudioClip landSound;

		[Header ("Other Sounds")]
		public AudioClip cancelSound;

		[Header ("World Limits")]
		public bool limitBoundsEnabled;
		public Bounds limitBounds;

		/// <summary>
		/// Triggered when player enters a voxel if that voxel definition has triggerEnterEvent = true
		/// </summary>
		public event VoxelEvent OnVoxelEnter;

		/// <summary>
		/// Triggered when a player walks over a voxel if that voxel definition has triggerWalkEvent = true
		/// </summary>
		public event VoxelEvent OnVoxelWalk;


		// internal fields
		AudioSource m_AudioSource;
		int lastPosX, lastPosY, lastPosZ;
		int lastVoxelTypeIndex;
		float nextPlayerDamageTime;
		float lastDiveTime;
		float m_StepCycle;
		float m_NextStep;
		bool modelBuildPreview;
		bool modelBuildInProgress;
		Vector3 modelBuildPreviewPosition;
		int modelBuildRotation;
		GameObject modelBuildPreviewGO;

		[NonSerialized]
		public VoxelHitInfo crosshairHitInfo;
		[NonSerialized]
		public bool crosshairOnBlock;

		protected VoxelPlayPlayer _player;

		public VoxelPlayPlayer player {
			get {
				if (_player == null) {
					_player = GetComponent<VoxelPlayPlayer> ();
					if (_player == null) {
						_player = gameObject.AddComponent<VoxelPlayPlayer> ();
					}
				}
				return _player;
			}
		}

		[NonSerialized]
		public VoxelPlayEnvironment env;



		protected void Init () {
			m_AudioSource = GetComponent<AudioSource> ();
			m_StepCycle = 0f;
			m_NextStep = m_StepCycle / 2f;

			// Check player can collide with voxels
			#if UNITY_EDITOR
			if (env != null && Physics.GetIgnoreLayerCollision (gameObject.layer, env.layerVoxels)) {
				Debug.LogError ("Player currently can't collide with voxels. Please check physics collision matrix in Project settings or change Voxels Layer in VoxelPlayEnvironment component.");
			}
			#endif
		}

		/// <summary>
		/// Toggles on/off character light
		/// </summary>
		public void ToggleCharacterLight () {
			Light light = GetComponentInChildren<Light> ();
			if (light != null) {
				light.enabled = !light.enabled;
			}
			env.UpdateLights ();
			if (light.enabled) {
				env.ShowMessage ("<color=green>Player torch <color=yellow>ON</color></color>");
			} else {
				env.ShowMessage ("<color=green>Player torch <color=yellow>OFF</color></color>");
			}
		}

		/// <summary>
		/// Toggles on/off character light
		/// </summary>
		public void ToggleCharacterLight (bool state) {
			Light light = GetComponentInChildren<Light> ();
			if (light != null) {
				light.enabled = state;
			}
		}


		protected void CheckFootfalls () {
			if (!isGrounded && !isInWater) {
				Vector3 curPos = transform.position;
				int x = (int)curPos.x;
				int y = (int)curPos.y;
				int z = (int)curPos.z;
				if (x != lastPosX || y != lastPosY || z != lastPosZ) {
					lastPosX = x;
					lastPosY = y;
					lastPosZ = z;
					VoxelIndex index = env.GetVoxelUnderIndex (curPos, true);
					if (index.typeIndex != lastVoxelTypeIndex) {
						lastVoxelTypeIndex = index.typeIndex;
						if (lastVoxelTypeIndex != 0) {
							VoxelDefinition vd = index.type;
							SetFootstepSounds (vd.footfalls, vd.landingSound, vd.jumpSound);
							if (vd.triggerWalkEvent && OnVoxelWalk != null) {
								OnVoxelWalk (index.chunk, index.voxelIndex);
							}
							CheckDamage (vd);
						}
					}
				}
			}
		}

		protected void CheckDamage (VoxelDefinition voxelType) {
			if (voxelType == null)
				return;
			int playerDamage = voxelType.playerDamage;
			if (playerDamage > 0 && Time.time > nextPlayerDamageTime) {
				nextPlayerDamageTime = Time.time + voxelType.playerDamageDelay;
				player.life -= playerDamage;
			}
		}

		protected void CheckEnterTrigger (VoxelChunk chunk, int voxelIndex) {
			if (chunk != null && env.voxelDefinitions [chunk.voxels [voxelIndex].typeIndex].triggerEnterEvent && OnVoxelEnter != null) {
				OnVoxelEnter (chunk, voxelIndex);
			}
		}

		public void SetFootstepSounds (AudioClip[] footStepsSounds, AudioClip jumpSound, AudioClip landSound) {
			this.footstepSounds = footStepsSounds;
			this.jumpSound = jumpSound;
			this.landSound = landSound;
		}

		public void PlayLandingSound () {
			if (isInWater || m_AudioSource == null)
				return;
			m_AudioSource.clip = landSound;
			m_AudioSource.Play ();
			m_NextStep = m_StepCycle + .5f;
		}



		public void PlayJumpSound () {
			if (isInWater || isFlying || m_AudioSource == null)
				return;
			m_AudioSource.clip = jumpSound;
			m_AudioSource.Play ();
		}


		public void PlayCancelSound () {
			if (m_AudioSource == null)
				return;
			m_AudioSource.clip = cancelSound;
			m_AudioSource.Play ();
		}


		public void PlayWaterSplashSound () {
			if (Time.time - lastDiveTime < 1f)
				return;
			lastDiveTime = Time.time;
			m_NextStep = m_StepCycle + swimStrokeInterval;
			if (waterSplash != null && m_AudioSource != null) {
				m_AudioSource.clip = waterSplash;
				m_AudioSource.Play ();
			}
		}

		/// <summary>
		/// Plays a sound at character position
		/// </summary>
		public void PlayCustomSound (AudioClip sound) {
			if (sound != null && m_AudioSource != null) {
				m_AudioSource.clip = sound;
				m_AudioSource.Play ();
			}
		}


		protected void ProgressStepCycle (Vector3 velocity, float speed) {
			if (velocity.sqrMagnitude > 0 && isPressingMoveKeys) {
				m_StepCycle += (velocity.magnitude + (speed * (isMoving ? 1f : runstepLenghten))) * Time.fixedDeltaTime;
			}

			if (!(m_StepCycle > m_NextStep)) {
				return;
			}

			m_NextStep = m_StepCycle + footStepInterval;

			PlayFootStepAudio ();
		}



		private void PlayFootStepAudio () {
			if (!isGrounded || m_AudioSource == null) {
				return;
			}
			if (footstepSounds == null || footstepSounds.Length == 0)
				return;
			// pick & play a random footstep sound from the array,
			// excluding sound at index 0
			int n;
			if (footstepSounds.Length == 1) {
				n = 0;
			} else {
				n = Random.Range (1, footstepSounds.Length);
			}
			m_AudioSource.clip = footstepSounds [n];
			m_AudioSource.PlayOneShot (m_AudioSource.clip);
			// move picked sound to index 0 so it's not picked next time
			footstepSounds [n] = footstepSounds [0];
			footstepSounds [0] = m_AudioSource.clip;
		}


		protected void ProgressSwimCycle (Vector3 velocity, float speed) {
			if (velocity.sqrMagnitude > 0 && isPressingMoveKeys) {
				m_StepCycle += (velocity.magnitude + speed) * Time.fixedDeltaTime;
			}

			if (!(m_StepCycle > m_NextStep)) {
				return;
			}

			m_NextStep = m_StepCycle + swimStrokeInterval;

			if (!isUnderwater) {
				PlaySwimStrokeAudio ();
			}
		}


		private void PlaySwimStrokeAudio () {
			if (swimStrokeSounds == null || swimStrokeSounds.Length == 0 || m_AudioSource == null)
				return;
			// pick & play a random swim stroke sound from the array,
			// excluding sound at index 0
			int n;
			if (swimStrokeSounds.Length == 1) {
				n = 0;
			} else {
				n = Random.Range (1, swimStrokeSounds.Length);
			}
			m_AudioSource.clip = swimStrokeSounds [n];
			m_AudioSource.PlayOneShot (m_AudioSource.clip);
			// move picked sound to index 0 so it's not picked next time
			swimStrokeSounds [n] = swimStrokeSounds [0];
			swimStrokeSounds [0] = m_AudioSource.clip;
		}


		/// <summary>
		/// Moves character controller to a new position. Use this method instead of changing the transform position
		/// </summary>
		public abstract void MoveTo (Vector3 newPosition);


		/// <summary>
		/// Implements building stuff
		/// </summary>
		/// <param name="camPos">The camera position OR the character position in a 3rd person controller</param>">
		protected void DoBuild (Vector3 camPos, Vector3 forward, Vector3 hintedPlacePos) {
			if (player.selectedItemIndex < 0 || player.selectedItemIndex >= player.items.Count)
				return;

			InventoryItem inventoryItem = player.GetSelectedItem ();
			ItemDefinition currentItem = inventoryItem.item;
			switch (currentItem.category) {
			case ItemCategory.Voxel:

				// Basic placement rules
				bool canPlace = crosshairOnBlock;
				Voxel existingVoxel = crosshairHitInfo.voxel;
				VoxelDefinition existingVoxelType = existingVoxel.type;
				Vector3 placePos;
				if (currentItem.voxelType.renderType == RenderType.Water && !canPlace) {
					canPlace = true; // water can be poured anywhere
					placePos = camPos + forward * 3f;
				} else {
					placePos = crosshairHitInfo.voxelCenter + crosshairHitInfo.normal;
					if (canPlace && crosshairHitInfo.normal.y == 1) {
						// Make sure there's a valid voxel under position (ie. do not build a voxel on top of grass)
						canPlace = (existingVoxelType != null && existingVoxelType.renderType != RenderType.CutoutCross && (existingVoxelType.renderType != RenderType.Water || currentItem.voxelType.renderType == RenderType.Water));
					}
				}
				VoxelDefinition placeVoxelType = currentItem.voxelType;

				// Check voxel promotion
				bool isPromoting = false;
				if (canPlace) {
					if (existingVoxelType == currentItem.voxelType) {
						if (existingVoxelType.promotesTo != null) {
							// Promote existing voxel
							env.VoxelDestroy (crosshairHitInfo.voxelCenter);
							placePos = crosshairHitInfo.voxelCenter;
							placeVoxelType = existingVoxelType.promotesTo;
							isPromoting = true;
						} else if (crosshairHitInfo.normal.y > 0 && existingVoxelType.biomeDirtCounterpart != null) {
							env.VoxelPlace (crosshairHitInfo.voxelCenter, existingVoxelType.biomeDirtCounterpart);
						}
					}
				}

				// Compute rotation
				int textureRotation = 0;
				if (placeVoxelType.placeFacingPlayer && placeVoxelType.renderType.supportsTextureRotation ()) {
					// Orient voxel to player
					if (Mathf.Abs (forward.x) > Mathf.Abs (forward.z)) {
						if (forward.x > 0) {
							textureRotation = 1;
						} else {
							textureRotation = 3;
						}
					} else if (forward.z < 0) {
						textureRotation = 2;
					}
				}

				// Final check, does it overlap existing geometry?
				if (canPlace && !isPromoting) {
					Quaternion rotationQ = Quaternion.Euler (0, Voxel.GetTextureRotationDegrees (textureRotation), 0);
					canPlace = !env.VoxelOverlaps (placePos, placeVoxelType, rotationQ, 1 << env.layerVoxels);
					if (!canPlace) {
						PlayCancelSound ();
					}
				}
				#if UNITY_EDITOR
				else if (env.constructorMode) {
					placePos = hintedPlacePos;
					placeVoxelType = currentItem.voxelType;
					canPlace = true;
				}
				#endif
				// Finally place the voxel
				if (canPlace) {
					// Consume item first
					if (!env.buildMode) {
						player.ConsumeItem ();
					}
					// Place it
					float amount = inventoryItem.quantity < 1f ? inventoryItem.quantity : 1f;
					env.VoxelPlace (placePos, placeVoxelType, true, placeVoxelType.tintColor, amount, textureRotation);

					// Moves back character controller if voxel is put just on its position
					const float minDist = 0.5f;
					float distSqr = Vector3.SqrMagnitude (camPos - placePos);
					if (distSqr < minDist * minDist) {
						MoveTo (transform.position + crosshairHitInfo.normal);
					}

				}
				break;
			case ItemCategory.Torch:
				if (crosshairOnBlock) {
					GameObject torchAttached = env.TorchAttach (crosshairHitInfo);
					if (!env.buildMode && torchAttached != null) {
						player.ConsumeItem ();
					}
				}
				break;
			case ItemCategory.Model:
				if (!modelBuildInProgress) {
					if (modelBuildPreview) {
						ModelPreviewCancel ();
						// check if building position is in frustum, otherwise cancel building
						Vector3 viewportPos = env.cameraMain.WorldToViewportPoint (modelBuildPreviewPosition);
						if (viewportPos.x < 0 || viewportPos.x > 1f || viewportPos.y < 0 || viewportPos.y > 1f || viewportPos.z < 0) {
							return;
						}
						modelBuildInProgress = true;
						env.ModelPlace (modelBuildPreviewPosition, currentItem.model, currentItem.model.buildDuration, modelBuildRotation, 1f, true, FinishBuilding);
						player.ConsumeItem ();
					} else {
						if (crosshairOnBlock) {
							modelBuildPreviewPosition = crosshairHitInfo.voxelCenter + new Vector3 (0f, 1f, 0f);
							// Orient voxel to player
							modelBuildRotation = 0;
							if (Mathf.Abs (forward.x) > Mathf.Abs (forward.z)) {
								if (forward.x > 0) {
									modelBuildRotation = 1;
								} else {
									modelBuildRotation = 3;
								}
							} else if (forward.z < 0) {
								modelBuildRotation = 2;
							}
							modelBuildRotation = (int)Voxel.GetTextureRotationDegrees (modelBuildRotation);
							modelBuildPreviewGO = env.ModelHighlight (currentItem.model, crosshairHitInfo.voxelCenter + new Vector3 (0.5f, -0.5f, 0.5f));
							modelBuildPreviewGO.transform.localRotation = Quaternion.Euler (0, modelBuildRotation, 0);
							modelBuildPreview = true;
						}
					}
				}
				break;
			case ItemCategory.General:
				ThrowCurrentItem (camPos, forward);
				break;
			}
		}

		/// <summary>
		/// Removes an unit fcrom current item in player inventory and throws it into the scene
		/// </summary>
		public void ThrowCurrentItem (Vector3 playerPos, Vector3 direction) {
			InventoryItem inventoryItem = player.ConsumeItem ();
			if (inventoryItem == InventoryItem.Null)
				return;

			if (inventoryItem.item.category == ItemCategory.Voxel) {
				env.VoxelThrow (playerPos, direction, 15f, inventoryItem.item.voxelType, Misc.color32White);
			} else if (inventoryItem.item.category == ItemCategory.General) {
				env.ItemThrow (playerPos, direction, 15f, inventoryItem.item);
			}
		}


		void FinishBuilding (ModelDefinition modelDefinition, Vector3 position) {
			modelBuildInProgress = false;
		}

		public bool ModelPreviewCancel () {
			if (modelBuildPreview) {
				modelBuildPreview = false;
				if (modelBuildPreviewGO != null) {
					modelBuildPreviewGO.SetActive (false);
				}
				return true;
			} else {
				return false;
			}
		}



	}
}
