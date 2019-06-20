﻿using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace VoxelPlay {

	public enum VoxelPlaySkybox {
		UserDefined = 0,
		Earth = 1,
		Space = 2,
		EarthSimplified = 3,
		EarthNightCubemap = 4,
		EarthDayNightCubemap = 5
	}


	[CreateAssetMenu (menuName = "Voxel Play/World Definition", fileName = "WorldDefinition", order = 103)]
	[HelpURL("https://kronnect.freshdesk.com/support/solutions/articles/42000001884-world-definition-fields")]
	public partial class WorldDefinition : ScriptableObject {

		public int seed;

		public BiomeDefinition[] biomes;

		[Tooltip("Default biome used if no biome matches altitude/moisture at a given position. Optional.")]
		public BiomeDefinition defaultBiome;

		[Tooltip("Generate infinite world.")]
		public bool infinite = true;

		[Tooltip("The world extents (half of size) assuming the center is at 0,0,0. Extents must be a multiple of chunk size (16). For example, if extents X = 1024 the world will be generated between -1024 and 1024.")]
		public Vector3 extents = new Vector3 (1024, 1024, 1024);

		[Header ("Content Generators")]
		public VoxelPlayTerrainGenerator terrainGenerator;
		public VoxelPlayDetailGenerator[] detailGenerators;

		[Header ("Sky & Lighting")]
		public VoxelPlaySkybox skyboxDesktop = VoxelPlaySkybox.Earth;
		public VoxelPlaySkybox skyboxMobile = VoxelPlaySkybox.EarthSimplified;
		public Texture skyboxDayCubemap, skyboxNightCubemap;

		[Range (-10, 10)]
		public float dayCycleSpeed = 1f;

		public bool setTimeAndAzimuth;

		[Range (0, 24)]
		public float timeOfDay = 0f;

		[Range(0,360)]
		public float azimuth = 15f;

		[Range (0, 2f)]
		public float exposure = 1f;

		[Tooltip ("Used to create clouds")]
		public VoxelDefinition cloudVoxel;

		[Range (0, 255)]
		public int cloudCoverage = 110;

		[Range (0, 1024)]
		public int cloudAltitude = 150;

		public Color skyTint = new Color (0.52f, 0.5f, 1f);

		public float lightScattering = 1f;
		public float lightIntensityMultiplier = 1f;

		[Header ("FX")]
		[Tooltip("Duration for the emission animation on certain materials")]
		public float emissionAnimationSpeed = 0.5f;
		public float emissionMinIntensity = 0.5f;
		public float emissionMaxIntensity = 1.2f;

		[Tooltip("Duration for the voxel damage cracks")]
		public float damageDuration = 3f;
		public Texture2D[] voxelDamageTextures;
		public float gravity = -9.8f;

		[Tooltip("When set to true, voxel types with 'Trigger Collapse' will fall along nearby voxels marked with 'Will Collapse' flag")]
		public bool collapseOnDestroy = true;

		[Tooltip("The maximum number of voxels that can fall at the same time")]
		public int collapseAmount = 50;

		[Tooltip("Delay for consolidating collapsed voxels into normal voxels. A value of zero keeps dynamic voxels in the scene. Note that consolidation takes place when chunk is not in frustum to avoid visual glitches.")]
		public int consolidateDelay = 5;

		[Header ("Additional Objects")]
		public VoxelDefinition[] moreVoxels;
		public ItemDefinition[] items;

		// TODO: TILE RULES ARE UNDER DEVELOPMENT
		[HideInInspector, Header("Tile Rules")]
		public TileRuleSet[] tileRuleSets;

	}

}