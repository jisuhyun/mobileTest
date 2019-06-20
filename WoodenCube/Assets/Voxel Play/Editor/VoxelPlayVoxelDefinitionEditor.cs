using UnityEngine;
using UnityEditor;
using System;
using System.Collections;

namespace VoxelPlay {
				
	[CustomEditor (typeof(VoxelDefinition))]
	public class VoxelPlayVoxelDefinitionEditor : Editor {

		SerializedProperty title, renderType, overrideMaterial, overrideMaterialGeo, overrideMaterialNonGeo, opaque;
		SerializedProperty textureTop, textureTopEmission, textureTopNRM, textureTopDISP;
		SerializedProperty textureSide, textureSideEmission, textureSideNRM, textureSideDISP;
		SerializedProperty textureRight, textureRightEmission, textureRightNRM, textureRightDISP;
		SerializedProperty textureForward, textureForwardEmission, textureForwardNRM, textureForwardDISP;
		SerializedProperty textureLeft, textureLeftEmission, textureLeftNRM, textureLeftDISP;
		SerializedProperty textureBottom, textureBottomEmission, textureBottomNRM, textureBottomDISP;
		SerializedProperty showFoam, tintColor, colorVariation;
		SerializedProperty pickupSound, buildSound, footfalls, jumpSound, landingSound, impactSound, destructionSound;
		SerializedProperty resistancePoints, canBeCollected, hidden, dropItem, icon, triggerCollapse, willCollapse, navigatable, windAnimation;
		SerializedProperty model, gpuInstancing, castShadows, receiveShadows, createGameObject;
		SerializedProperty offset, offsetRandom, offsetRandomRange, scale, rotation, rotationRandomY, promotesTo;
		SerializedProperty spreads, drains, spreadDelay, spreadDelayRandom, diveColor, height;
		SerializedProperty playerDamage, playerDamageDelay, ignoresRayCast, placeFacingPlayer, allowsTextureRotation;
		SerializedProperty triggerEnterEvent, triggerWalkEvent;
		SerializedProperty biomeDirtCounterpart;

		GUIContent[] renderTypesNames = new GUIContent[] {
			new GUIContent ("Opaque 3 Textures"),
			new GUIContent ("Opaque 3 Textures (No AO)"),
			new GUIContent ("Opaque 6 Textures"),
			new GUIContent ("Transparent 6 textures"),
			new GUIContent ("Cutout"),
			new GUIContent ("Water"),
			new GUIContent ("CutoutCross (Vegetation)"),
			new GUIContent ("Custom"),
			new GUIContent ("Empty")
		};
		int[] renderTypesValues = new int[] {
			(int)RenderType.Opaque,
			(int)RenderType.OpaqueNoAO,
			(int)RenderType.Opaque6tex,
			(int)RenderType.Transp6tex,
			(int)RenderType.Cutout,
			(int)RenderType.Water,
			(int)RenderType.CutoutCross,
			(int)RenderType.Custom,
			(int)RenderType.Empty
		};


		Color titleColor;
		static GUIStyle titleLabelStyle;
		VoxelPlayEnvironment _env;

		void OnEnable () {
			titleColor = EditorGUIUtility.isProSkin ? new Color (0.52f, 0.66f, 0.9f) : new Color (0.12f, 0.16f, 0.4f);

			title = serializedObject.FindProperty ("title");
			renderType = serializedObject.FindProperty ("renderType");
			overrideMaterial = serializedObject.FindProperty ("overrideMaterial");
			overrideMaterialGeo = serializedObject.FindProperty ("overrideMaterialGeo");
			overrideMaterialNonGeo = serializedObject.FindProperty ("overrideMaterialNonGeo");
			opaque = serializedObject.FindProperty ("opaque");
			textureTop = serializedObject.FindProperty ("textureTop");
			textureTopEmission = serializedObject.FindProperty ("textureTopEmission");
			textureTopNRM = serializedObject.FindProperty ("textureTopNRM");
			textureTopDISP = serializedObject.FindProperty ("textureTopDISP");
			textureSide = serializedObject.FindProperty ("textureSide");
			textureSideEmission = serializedObject.FindProperty ("textureSideEmission");
			textureSideNRM = serializedObject.FindProperty ("textureSideNRM");
			textureSideDISP = serializedObject.FindProperty ("textureSideDISP");
			textureRight = serializedObject.FindProperty ("textureRight");
			textureRightEmission = serializedObject.FindProperty ("textureRightEmission");
			textureRightNRM = serializedObject.FindProperty ("textureRightNRM");
			textureRightDISP = serializedObject.FindProperty ("textureRightDISP");
			textureForward = serializedObject.FindProperty ("textureForward");
			textureForwardEmission = serializedObject.FindProperty ("textureForwardEmission");
			textureForwardNRM = serializedObject.FindProperty ("textureForwardNRM");
			textureForwardDISP = serializedObject.FindProperty ("textureForwardDISP");
			textureLeft = serializedObject.FindProperty ("textureLeft");
			textureLeftEmission = serializedObject.FindProperty ("textureLeftEmission");
			textureLeftNRM = serializedObject.FindProperty ("textureLeftNRM");
			textureLeftDISP = serializedObject.FindProperty ("textureLeftDISP");
			textureBottom = serializedObject.FindProperty ("textureBottom");
			textureBottomEmission = serializedObject.FindProperty ("textureBottomEmission");
			textureBottomNRM = serializedObject.FindProperty ("textureBottomNRM");
			textureBottomDISP = serializedObject.FindProperty ("textureBottomDISP");

			showFoam = serializedObject.FindProperty ("showFoam");
			tintColor = serializedObject.FindProperty ("tintColor");
			colorVariation = serializedObject.FindProperty ("colorVariation");

			pickupSound = serializedObject.FindProperty ("pickupSound");
			buildSound = serializedObject.FindProperty ("buildSound");
			footfalls = serializedObject.FindProperty ("footfalls");
			jumpSound = serializedObject.FindProperty ("jumpSound");
			landingSound = serializedObject.FindProperty ("landingSound");
			impactSound = serializedObject.FindProperty ("impactSound");
			destructionSound = serializedObject.FindProperty ("destructionSound");
			resistancePoints = serializedObject.FindProperty ("resistancePoints");

			canBeCollected = serializedObject.FindProperty ("canBeCollected");
			hidden = serializedObject.FindProperty ("hidden");
			dropItem = serializedObject.FindProperty ("dropItem");
			icon = serializedObject.FindProperty ("icon");
			navigatable = serializedObject.FindProperty ("navigatable");
			windAnimation = serializedObject.FindProperty ("windAnimation");
			model = serializedObject.FindProperty ("model");
			gpuInstancing = serializedObject.FindProperty ("gpuInstancing");
			castShadows = serializedObject.FindProperty ("castShadows");
			receiveShadows = serializedObject.FindProperty ("receiveShadows");
			createGameObject = serializedObject.FindProperty ("createGameObject");
			offset = serializedObject.FindProperty ("offset");
			offsetRandom = serializedObject.FindProperty ("offsetRandom");
			offsetRandomRange = serializedObject.FindProperty ("offsetRandomRange");
			scale = serializedObject.FindProperty ("scale");
			rotation = serializedObject.FindProperty ("rotation");
			rotationRandomY = serializedObject.FindProperty ("rotationRandomY");
			promotesTo = serializedObject.FindProperty ("promotesTo");
			triggerCollapse = serializedObject.FindProperty ("triggerCollapse");
			willCollapse = serializedObject.FindProperty ("willCollapse");

			spreads = serializedObject.FindProperty ("spreads");
			drains = serializedObject.FindProperty ("drains");
			spreadDelay = serializedObject.FindProperty ("spreadDelay");
			spreadDelayRandom = serializedObject.FindProperty ("spreadDelayRandom");
			diveColor = serializedObject.FindProperty ("diveColor");
			height = serializedObject.FindProperty ("height");

			playerDamage = serializedObject.FindProperty ("playerDamage");
			playerDamageDelay = serializedObject.FindProperty ("playerDamageDelay");
			ignoresRayCast = serializedObject.FindProperty ("ignoresRayCast");
			allowsTextureRotation = serializedObject.FindProperty ("allowsTextureRotation");
			placeFacingPlayer = serializedObject.FindProperty ("placeFacingPlayer");

			triggerEnterEvent = serializedObject.FindProperty ("triggerEnterEvent");
			triggerWalkEvent = serializedObject.FindProperty ("triggerWalkEvent");

			biomeDirtCounterpart = serializedObject.FindProperty ("biomeDirtCounterpart");
		}


		public override void OnInspectorGUI () {
#if UNITY_5_6_OR_NEWER
			serializedObject.UpdateIfRequiredOrScript ();
#else
			serializedObject.UpdateIfDirtyOrScript();
#endif
			if (titleLabelStyle == null) {
				titleLabelStyle = new GUIStyle (EditorStyles.label);
			}
			titleLabelStyle.normal.textColor = titleColor;
			titleLabelStyle.fontStyle = FontStyle.Bold;
			EditorGUIUtility.labelWidth = 130;

			EditorGUILayout.Separator ();
			GUILayout.Label ("Rendering", titleLabelStyle);
			EditorGUILayout.IntPopup (renderType, renderTypesNames, renderTypesValues);

			switch (renderType.intValue) {
			case (int)RenderType.Custom:
				EditorGUILayout.PropertyField (model);
				EditorGUILayout.PropertyField (offset);
				EditorGUILayout.PropertyField (offsetRandom);
				if (offsetRandom.boolValue) {
					EditorGUI.indentLevel++;
					EditorGUILayout.PropertyField (offsetRandomRange, new GUIContent ("Offset Range", "Scale applied to random on each axis."));
					EditorGUI.indentLevel--;
				}
				EditorGUILayout.PropertyField (scale);
				EditorGUILayout.PropertyField (rotation);
				EditorGUILayout.PropertyField (rotationRandomY);
				TextureField (textureSide, "Texture Sample", "Texture that represents the model. Used for sampling particle colors and inventory.");
				EditorGUILayout.PropertyField (opaque, new GUIContent ("Opaque", "Set this value to 15 to specify that this is a fully solid object that occludes other adjacent voxels. A lower value let light pass through and reduces it by this amount. 0 = fully transparent."));
				EditorGUILayout.PropertyField (gpuInstancing, new GUIContent ("GPU Instancing", "Uses GPU instancing to render the model."));
				if (gpuInstancing.boolValue) {
					EditorGUI.indentLevel++;
					EditorGUILayout.PropertyField (castShadows, new GUIContent ("Cast Shadows", "If this instanced voxel can cast shadows."));
					EditorGUILayout.PropertyField (receiveShadows, new GUIContent ("Receive Shadows", "If this instanced voxel can cast shadows."));
					EditorGUILayout.PropertyField (createGameObject, new GUIContent ("Create GameObject", "When GPU instancing is enabled, the rendering will be done in GPU but you can still force the creation of a gameobject which can hold colliders or custom scripts."));
					EditorGUI.indentLevel--;
				}
				break;
			case (int)RenderType.Opaque:
			case (int)RenderType.OpaqueNoAO:
			case (int)RenderType.Cutout:
			case (int)RenderType.Water:
				TextureField (textureTop);
				if (renderType.intValue == (int)RenderType.Opaque) {
					EditorGUI.indentLevel++;
					TextureField (textureTopEmission, "Emission Mask");
					EditorGUI.indentLevel--;
				}
				EditorGUI.indentLevel++;
				TextureField (textureTopNRM, "Normal Map");
				TextureField (textureTopDISP, "Displacement Map");
				EditorGUI.indentLevel--;
				TextureField (textureSide);
				if (textureSide.objectReferenceValue != textureTop.objectReferenceValue) {
					if (renderType.intValue == (int)RenderType.Opaque) {
						EditorGUI.indentLevel++;
						TextureField (textureSideEmission, "Emission Mask");
						EditorGUI.indentLevel--;
					}
					EditorGUI.indentLevel++;
					TextureField (textureSideNRM, "Normal Map");
					TextureField (textureSideDISP, "Displacement Map");
					EditorGUI.indentLevel--;
				}
				TextureField (textureBottom);
				if (textureBottom.objectReferenceValue != textureTop.objectReferenceValue && textureBottom.objectReferenceValue != textureSide.objectReferenceValue) {
					if (renderType.intValue == (int)RenderType.Opaque) {
						EditorGUI.indentLevel++;
						TextureField (textureBottomEmission, "Emission Mask");
						EditorGUI.indentLevel--;
					}
					EditorGUI.indentLevel++;
					TextureField (textureBottomNRM, "Normal Map");
					TextureField (textureBottomDISP, "Displacement Map");
					EditorGUI.indentLevel--;
				}
				if (renderType.intValue == (int)RenderType.Water) {
					EditorGUILayout.PropertyField (showFoam);
				} else {
					EditorGUI.BeginChangeCheck ();
					EditorGUILayout.PropertyField (tintColor);
					if (!EditorGUI.EndChangeCheck ()) {
						CheckTintColorFeature ();
					}
				}
				break;
			case (int)RenderType.Opaque6tex:
			case (int)RenderType.Transp6tex:
				TextureField (textureTop);
				if (renderType.intValue == (int)RenderType.Opaque) {
					EditorGUI.indentLevel++;
					TextureField (textureTopEmission, "Emission Mask");
					EditorGUI.indentLevel--;
				}
				EditorGUI.indentLevel++;
				TextureField (textureTopNRM, "Normal Map");
				TextureField (textureTopDISP, "Displacement Map");
				EditorGUI.indentLevel--;
				TextureField (textureBottom);
				if (textureBottom.objectReferenceValue != textureTop.objectReferenceValue) {
					if (renderType.intValue == (int)RenderType.Opaque) {
						EditorGUI.indentLevel++;
						TextureField (textureBottomEmission, "Emission Mask");
						EditorGUI.indentLevel--;
					}
					EditorGUI.indentLevel++;
					TextureField (textureBottomNRM, "Normal Map");
					TextureField (textureBottomDISP, "Displacement Map");
					EditorGUI.indentLevel--;
				}
				TextureField (textureSide, "Texture Back");
				if (textureSide.objectReferenceValue != textureTop.objectReferenceValue) {
					if (renderType.intValue == (int)RenderType.Opaque) {
						EditorGUI.indentLevel++;
						TextureField (textureSideEmission, "Emission Mask");
						EditorGUI.indentLevel--;
					}
					EditorGUI.indentLevel++;
					TextureField (textureSideNRM, "Normal Map");
					TextureField (textureSideDISP, "Displacement Map");
					EditorGUI.indentLevel--;
				}
				TextureField (textureRight, "Texture Right");
				if (textureRight.objectReferenceValue != textureTop.objectReferenceValue) {
					if (renderType.intValue == (int)RenderType.Opaque) {
						EditorGUI.indentLevel++;
						TextureField (textureRightEmission, "Emission Mask");
						EditorGUI.indentLevel--;
					}
					EditorGUI.indentLevel++;
					TextureField (textureRightNRM, "Normal Map");
					TextureField (textureRightDISP, "Displacement Map");
					EditorGUI.indentLevel--;
				}
				TextureField (textureForward, "Texture Forward");
				if (textureForward.objectReferenceValue != textureTop.objectReferenceValue) {
					if (renderType.intValue == (int)RenderType.Opaque) {
						EditorGUI.indentLevel++;
						TextureField (textureForwardEmission, "Emission Mask");
						EditorGUI.indentLevel--;
					}
					EditorGUI.indentLevel++;
					TextureField (textureForwardNRM, "Normal Map");
					TextureField (textureForwardDISP, "Displacement Map");
					EditorGUI.indentLevel--;
				}
				TextureField (textureLeft, "Texture Left");
				if (textureLeft.objectReferenceValue != textureTop.objectReferenceValue) {
					if (renderType.intValue == (int)RenderType.Opaque) {
						EditorGUI.indentLevel++;
						TextureField (textureLeftEmission, "Emission Mask");
						EditorGUI.indentLevel--;
					}
					EditorGUI.indentLevel++;
					TextureField (textureLeftNRM, "Normal Map");
					TextureField (textureLeftDISP, "Displacement Map");
					EditorGUI.indentLevel--;
				}
				EditorGUILayout.PropertyField (placeFacingPlayer);
				EditorGUILayout.PropertyField (allowsTextureRotation, new GUIContent ("Texture Rotation", "Allows texture rotation by using VoxelRotateTextures and similar methods."));
				EditorGUI.BeginChangeCheck ();
				EditorGUILayout.PropertyField (tintColor);
				if (!EditorGUI.EndChangeCheck ()) {
					CheckTintColorFeature ();
				}
				break;
			case (int)RenderType.CutoutCross:
				TextureField (textureSide, "Texture");
				break;
			}
			if (renderType.intValue == (int)RenderType.Cutout || renderType.intValue == (int)RenderType.CutoutCross) {
				EditorGUILayout.PropertyField (colorVariation);
			}
			if (renderType.intValue != (int)RenderType.Custom) {
				EditorGUILayout.PropertyField (overrideMaterial);
				if (overrideMaterial.boolValue) {
					EditorGUI.indentLevel++;
					EditorGUILayout.HelpBox ("Material shader must be compatible with the original VP shader. You can provide a geo and non-geo compatible material, depending if you want to support geometry shaders. If you provide both materials, they will automatically be picked depending on the platform capability.\nCheck the online documentation for more details.", MessageType.Info);
					EditorGUILayout.BeginHorizontal ();
					EditorGUILayout.PropertyField (overrideMaterialGeo, new GUIContent ("Geo Compatible", "Material compatible with geometry shaders."));
					if (GUILayout.Button ("Locate Original")) {
						LocateOriginal ((RenderType)renderType.intValue, true);
					}
					EditorGUILayout.EndHorizontal ();
					EditorGUILayout.BeginHorizontal ();
					EditorGUILayout.PropertyField (overrideMaterialNonGeo, new GUIContent ("Non Geo Compatible", "Material not compatible with geometry shaders."));
					if (GUILayout.Button ("Locate Original")) {
						LocateOriginal ((RenderType)renderType.intValue, false);
					}
					EditorGUILayout.EndHorizontal ();
					EditorGUI.indentLevel--;
				}
			}
			EditorGUILayout.Separator ();

			GUILayout.Label ("Sound Effects", titleLabelStyle);
			EditorGUILayout.PropertyField (pickupSound);
			EditorGUILayout.PropertyField (buildSound);
			if (renderType.intValue != (int)RenderType.Cutout && renderType.intValue != (int)RenderType.CutoutCross && renderType.intValue != (int)RenderType.Water) {
				EditorGUILayout.PropertyField (footfalls, true);
			}
			EditorGUILayout.PropertyField (jumpSound);
			EditorGUILayout.PropertyField (landingSound);
			EditorGUILayout.PropertyField (impactSound);
			EditorGUILayout.PropertyField (destructionSound);

			EditorGUILayout.Separator ();

			RenderType rt = (RenderType)renderType.intValue; 

			GUILayout.Label ("Special Events", titleLabelStyle);
			EditorGUILayout.PropertyField (triggerWalkEvent);
			EditorGUILayout.PropertyField (triggerEnterEvent);

			EditorGUILayout.Separator ();

			GUILayout.Label ("Other Attributes", titleLabelStyle);
			EditorGUILayout.PropertyField (title);
			EditorGUILayout.PropertyField (resistancePoints);

			EditorGUILayout.PropertyField (hidden);
			if (!hidden.boolValue) {
				EditorGUILayout.PropertyField (canBeCollected);
				if (canBeCollected.boolValue) {
					EditorGUILayout.PropertyField (dropItem);
				}
				EditorGUILayout.PropertyField (icon);
				EditorGUILayout.PropertyField (promotesTo);
			}

			EditorGUILayout.PropertyField (biomeDirtCounterpart);

			if (rt.supportsNavigation ()) {
				EditorGUILayout.PropertyField (navigatable);
			}

			if (rt.supportsWindAnimation ()) {
				EditorGUILayout.PropertyField (windAnimation);
			}
			if (rt == RenderType.Water) {
				EditorGUILayout.PropertyField (height);
				EditorGUILayout.PropertyField (diveColor);
				EditorGUILayout.PropertyField (spreads);
				GUI.enabled = spreads.boolValue;
				EditorGUILayout.PropertyField (drains);
				EditorGUILayout.PropertyField (spreadDelay);
				EditorGUILayout.PropertyField (spreadDelayRandom);
				GUI.enabled = true;
			}

			if (renderType.intValue != (int)RenderType.CutoutCross && renderType.intValue != (int)RenderType.Water && renderType.intValue != (int)RenderType.Empty) {
				EditorGUILayout.PropertyField (triggerCollapse);
				EditorGUILayout.PropertyField (willCollapse);
			}

			EditorGUILayout.PropertyField (playerDamage);
			GUI.enabled = playerDamage.intValue > 0;
			EditorGUILayout.PropertyField (playerDamageDelay);
			GUI.enabled = true;

			EditorGUILayout.PropertyField (ignoresRayCast);

			serializedObject.ApplyModifiedProperties ();

		}

		void TextureField (SerializedProperty texture, string label = null, string tooltip = null) {
			EditorGUI.BeginChangeCheck ();
			if (label != null) {
				EditorGUILayout.PropertyField (texture, new GUIContent (label, tooltip));
			} else {
				EditorGUILayout.PropertyField (texture);
			}

			if (EditorGUI.EndChangeCheck ()) {
				if (texture.objectReferenceValue != null) {
					Texture textureAsset = (Texture)texture.objectReferenceValue;
					VoxelPlayEditorCommons.CheckImportSettings (textureAsset);
				}
			}
		}

		VoxelPlayEnvironment env {
			get {
				if (_env == null) {
					_env = VoxelPlayEnvironment.instance;
				}
				return _env;
			}
		}

		void CheckTintColorFeature () {
			if (tintColor.colorValue.r != 1f || tintColor.colorValue.g != 1f || tintColor.colorValue.b != 1f) {
				VoxelPlayEnvironment e = env;
				if (e != null) {
					if (!e.enableTinting) {
						EditorGUILayout.HelpBox ("Tint Color shader feature is disabled in Voxel Play Environment component.", MessageType.Warning);
					}
				}
			}
		}

		void LocateOriginal (RenderType renderType, bool compatibleWithGeometryShaders) {
			Material mat = renderType.GetDefaultMaterial (compatibleWithGeometryShaders);
			if (mat != null) {
				EditorGUIUtility.PingObject(mat);
			} else {
				Debug.LogError ("Default material not found.");
			}
		}

	}

}
