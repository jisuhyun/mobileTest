using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using VoxelPlay;

namespace VoxelPlayDemos
{

    public class WoodenBlock : MonoBehaviour {

		public ModelDefinition modelToLoad;
		public Font font;
		public Shader textShader;
        public string saveName;
        public VoxelDefinition newVoxelDefine;
        public GameObject colorPanel;
        public Canvas uiCanvas;        

        VoxelPlayEnvironment env;
		float orbitDistance;
        VoxelPlayFirstPersonController fps;
        public enum ControlMode { NONE =-1, BUILD, COLOR, ERASE, ALL, HORIZONTAL, VERTICAL }
        public ControlMode controlMode = ControlMode.NONE;
        //bool isPropertyVisible = false;
        byte[] saveGameData;
        Color createColor = Color.white;
        public Color currentColor = Color.white;
        int modelSize = 6;
		int modelHeight = 10;

        VoxelChunk currentChunk_;
        public VoxelChunk currentChunk {
            get { return currentChunk_; }
            private set { currentChunk_ = value; }
        }
        int currentVoxelIndex_;
        public int currentVoxelIndex
        {
            get { return currentVoxelIndex_; }
            private set { currentVoxelIndex_ = value; }
        }

        WoodenBlockVoxelLibrary voxelLib;

        private void Awake() {
            Screen.SetResolution(1280, 720, false);
        }

        void Start() {
			env = VoxelPlayEnvironment.instance;
            voxelLib = WoodenBlockVoxelLibrary.instance;

            // Position player on the scene and setup orbit parameters
            fps = VoxelPlayFirstPersonController.instance;

			// Create scene objects
			CreateCube();
            //CreateInputSwatch();            

            // Color the voxel in black when clicked OR place a new voxel
            env.OnVoxelClick += (chunk, voxelIndex, buttonIndex, hitInfo) => {                
                if (!EventSystem.current.IsPointerOverGameObject()) {
                    if(false == voxelLib.isGridBlock(chunk, voxelIndex)) {
                        currentChunk = chunk;
                        currentVoxelIndex = voxelIndex;
                        env.VoxelHighlight(hitInfo, Color.red, 30);
                    }
                    if (buttonIndex == 0) {
                        switch (controlMode) {
                            case ControlMode.BUILD:
                                {
                                    if (voxelLib.isGridBlock(hitInfo)) {
                                        if (hitInfo.normal.y == 1) { // only can make Top Direction
                                            Vector3 position = hitInfo.voxelCenter + hitInfo.normal;
                                            //env.VoxelPlace(position, newVoxelDefine, createColor, true);
                                            VoxelChunk chunk_;
                                            int voxelIndex_;
                                            env.VoxelPlace(position, newVoxelDefine, currentColor, out chunk_, out voxelIndex_,  true);
                                            currentChunk = chunk_;
                                            currentVoxelIndex = voxelIndex_;

                                            hitInfo.voxelCenter = position;
                                            hitInfo.chunk = chunk_;
                                            hitInfo.voxelIndex = voxelIndex_;
                                            env.VoxelHighlight(hitInfo, Color.red, 30);
                                        }
                                    }
                                    else {
                                        Vector3 position = hitInfo.voxelCenter + hitInfo.normal;
                                        if (false == voxelLib.isGridBlock(position)) {
                                            //env.VoxelPlace(position, newVoxelDefine, createColor, true);
                                            VoxelChunk chunk_;
                                            int voxelIndex_;
                                            env.VoxelPlace(position, newVoxelDefine, currentColor, out chunk_, out voxelIndex_, true);
                                            currentChunk = chunk_;
                                            currentVoxelIndex = voxelIndex_;

                                            hitInfo.voxelCenter = position;
                                            hitInfo.chunk = chunk_;
                                            hitInfo.voxelIndex = voxelIndex_;
                                            env.VoxelHighlight(hitInfo, Color.red, 30);
                                        }
                                    }
                                }
                                break;
                            case ControlMode.COLOR:
                                //Vector2 pos = Camera.main.WorldToScreenPoint(hitInfo.voxelCenter);
                                //RectTransformUtility.ScreenPointToLocalPointInRectangle(uiCanvas.transform as RectTransform, pos, uiCanvas.worldCamera, out pos);
                                //colorPanel.transform.position = uiCanvas.transform.TransformPoint(pos);
                                //colorPanel.SetActive(true);
                                //isPropertyVisible = true;
                                env.VoxelSetColor(currentChunk, currentVoxelIndex, currentColor);
                                break;
                            case ControlMode.ERASE:
                                break;
                        }
                    }
                }
			};

			// Control erase mode
			env.OnVoxelDamaged += (VoxelChunk chunk, int voxelIndex, ref int damage) => {
				if (controlMode != ControlMode.ERASE) {
					damage = 0;
				}
                else {
                    if(voxelLib.isGridBlock(chunk, voxelIndex))
                        damage = 0;
                }
			};

            var data = PlayerPrefs.GetString("0");
            if (string.IsNullOrEmpty(data)) {
                SaveGame("0");
            }

            Camera[] cameras = GetComponentsInChildren<Camera>(true);
            for (int i = 0; i < cameras.Length; ++i)
                cameras[i].gameObject.SetActive(true);

        }

		void Update() {
			// Manages orbit or free mode according to distance to model
			//fps.SetOrbitMode(fps.transform.position.sqrMagnitude > orbitDistance);

			//if (Input.GetKeyDown(KeyCode.G)) {
			//	ToggleGlobalIllum();
			//}
   //         else 
            if (Input.GetKeyDown(KeyCode.F1)) {
				LoadModel();
			}
            else if (Input.GetKeyDown(KeyCode.O)) {
				SaveGame(saveName);
			}
            else if (Input.GetKeyDown(KeyCode.P)) {
				LoadGame(saveName);
			}
            else if (Input.GetKeyDown(KeyCode.N)) {
                NewGame();
            }
            else if (Input.GetKeyDown(KeyCode.H)) {
                env.ShowMessage(env.welcomeMessage, env.welcomeMessageDuration, true);
            }
        }

        //void LateUpdate()
        //{
        //    if (env.input.GetButtonDown(InputButtonNames.Button1)) {
        //        if (EventSystem.current.IsPointerOverGameObject())
        //        {
        //            if (isPropertyVisible)
        //                isPropertyVisible = false;
        //        }
        //        else
        //        {
        //            if (isPropertyVisible)
        //                isPropertyVisible = false;
        //            else
        //            {
        //                colorPanel.SetActive(false);
        //            }
        //        }
        //    }
        //}

        public void SetControlMode(ControlMode m) {
            controlMode = m;
        }

        void CreateCube() {
			// Fill a 3D array with random colors and place it on the scene
			Color[,,] myModel = new Color[1, modelSize, modelSize];

			int maxY = myModel.GetUpperBound(0);
			int maxZ = myModel.GetUpperBound(1);
			int maxX = myModel.GetUpperBound(2);
			for (int y = 0; y <= maxY; y++) {
				for (int z = 0; z <= maxZ; z++) {
					for (int x = 0; x <= maxX; x++) {
                        //Color r = new Color(UnityEngine.Random.value, UnityEngine.Random.value, UnityEngine.Random.value);
                        Color r = Color.gray;
                        myModel[y, z, x] = r;
					}
				}
			}
			env.ModelPlace(Vector3.zero, myModel);
			SetupNavigation();
		}

		//void CreateLabels() {
		//	// Create a label for each row
		//	font.material.shader = textShader;

		//	for (int k = 0; k < modelHeight; k++) {
		//		string rowName = "Row " + k.ToString();
		//		GameObject t = new GameObject(rowName);
		//		t.transform.position = new Vector3(0, k + 0.5f, -modelSize / 2);
		//		TextMesh tm = t.AddComponent<TextMesh>();
		//		tm.font = font;
		//		tm.GetComponent<Renderer>().sharedMaterial = font.material;
		//		tm.text = rowName;
		//		tm.color = Color.white;
		//		tm.alignment = TextAlignment.Center;
		//		tm.anchor = TextAnchor.MiddleCenter;
		//		t.transform.localScale = new Vector3(0.03f, 0.03f, 1f);
		//	}
		//}

        void SaveGame(string name) {
            var binaryFormatter = new BinaryFormatter();
            var memoryStream = new MemoryStream();
            binaryFormatter.Serialize(memoryStream, env.SaveGameToByteArray());
            PlayerPrefs.SetString(name, Convert.ToBase64String(memoryStream.GetBuffer()));
			env.ShowMessage("<color=yellow>World saved into memory!</color>");
		}

		bool LoadGame(string name) {
            var data = PlayerPrefs.GetString(name);
            if (!string.IsNullOrEmpty(data)) {
                var binaryFormatter = new BinaryFormatter();
                var memoryStream = new MemoryStream(Convert.FromBase64String(data));

                if (env.LoadGameFromByteArray((byte[])binaryFormatter.Deserialize(memoryStream), true))
                {
                    env.ShowMessage("<color=yellow>World restored!</color>");                    
                    return true;
                }
            }
            env.ShowMessage("<color=red>World could not be restored!</color>");
            return false;
        }

        bool NewGame() {            
            return LoadGame("0");
        }

        void LoadModel() {
			if (modelToLoad != null) {
				env.DestroyAllVoxels();
				env.ModelPlace(Vector3.zero, modelToLoad);
				modelSize = Mathf.Max(modelToLoad.sizeX, modelToLoad.sizeZ);
				modelHeight = modelToLoad.sizeY;
				SetupNavigation();
			}
		}

		void SetupNavigation() {
            //fps.transform.position = new Vector3(0, modelSize * 1.7f, -modelSize * 0.9f);
            //fps.lookAt = new Vector3(0, modelSize / 2f, 0);

            fps.transform.position = new Vector3(0, modelSize * 1.2f, -modelSize * 1.8f);
            fps.lookAt = new Vector3(modelSize * 2f, modelSize / 2f, 0);

            orbitDistance = Mathf.Pow(modelSize * 1.1f, 2f);
		}
    }

}