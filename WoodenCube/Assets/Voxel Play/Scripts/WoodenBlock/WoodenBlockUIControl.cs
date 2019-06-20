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

    public class WoodenBlockUIControl : MonoBehaviour {        				
		public Text eraseModeText, userInputText;
		public GameObject colorButtonTemplate;
        public GameObject slotButtonTemplate;
        public GameObject inputButtonTemplate;        
        public Button excuteButton;
        public Button cancelButton;
        public GameObject colorPanel;
        public Canvas uiCanvas;
        public List<Button> QuestionButtons;        
        public GameObject userInputPanel;


        WoodenBlock woodenBlock;
        VoxelPlayEnvironment env;
        WoodenBlockVoxelLibrary voxelLib;


        void Start() {
            woodenBlock = GetComponent<WoodenBlock>();
            env = VoxelPlayEnvironment.instance;
            voxelLib = WoodenBlockVoxelLibrary.instance;
            // Create scene objects
            CreateColorSwatch();
            CreateSlotSwatch();
            CreateInputSwatch();            
            InitMenuButtons();            
        }

        void InitMenuButtons() {

            QuestionButtons[0].onClick.AddListener(
                this.onClickBuildButton
            );
            QuestionButtons[1].onClick.AddListener(
                this.onClickColorButton
            );
            QuestionButtons[2].onClick.AddListener(
                this.onClickEraseButton
            );
            for (int i = 3; i < QuestionButtons.Count; ++i) {
                int j = i;
                QuestionButtons[i].onClick.AddListener(() => {
                    this.onClickCountButton((WoodenBlock.ControlMode)j);
                });
            }
            onClickBuildButton();            
        }

        public void onClickBuildButton() {
            this.onClickMenuButton(WoodenBlock.ControlMode.BUILD);
            eraseModeText.text = "<color=yellow>Build Mode</color>";
            colorPanel.SetActive(true);
            userInputPanel.SetActive(false);

            //colorBlock = QuestionButtons[(int)countMode_].colors;
            //colorBlock.normalColor = Color.red;
            //colorBlock.selectedColor = Color.red;
            //QuestionButtons[(int)countMode_].colors = colorBlock;
        }

        public void onClickColorButton() {
            this.onClickMenuButton(WoodenBlock.ControlMode.COLOR);
            eraseModeText.text = "<color=yellow>Color Mode</color>";
            colorPanel.SetActive(true);
            userInputPanel.SetActive(false);
        }

        public void onClickEraseButton() {
            this.onClickMenuButton(WoodenBlock.ControlMode.ERASE);
            eraseModeText.text = "<color=yellow>Erase Mode</color>";
            colorPanel.SetActive(false);
            userInputPanel.SetActive(false);
        }

        public void onClickMenuButton(WoodenBlock.ControlMode countMode_) {
            if (woodenBlock.controlMode == countMode_)
            {
                //if (userInputPanel.activeSelf) {
                //    userInputPanel.SetActive(false);
                //    countMode = CountMode.NONE;
                //    ColorBlock colorBlock = QuestionButtons[(int)countMode_].colors;
                //    colorBlock.normalColor = Color.white;
                //    colorBlock.selectedColor = Color.white;
                //    QuestionButtons[(int)countMode_].colors = colorBlock;
                //}
            }
            else
            {
                ColorBlock colorBlock;
                for (int i = 0; i < QuestionButtons.Count; ++i)
                {
                    colorBlock = QuestionButtons[i].colors;
                    colorBlock.normalColor = Color.white;
                    colorBlock.selectedColor = Color.white;
                    QuestionButtons[i].colors = colorBlock;
                }

                colorBlock = QuestionButtons[(int)countMode_].colors;
                colorBlock.normalColor = Color.red;
                colorBlock.selectedColor = Color.red;
                QuestionButtons[(int)countMode_].colors = colorBlock;
                woodenBlock.SetControlMode(countMode_);
            }
        }

        public void onClickCountButton(WoodenBlock.ControlMode countMode_) {
            this.onClickMenuButton(countMode_);            
            userInputPanel.SetActive(true);
            colorPanel.SetActive(false);
        }
       
        void CreateColorSwatch() {
			Vector2 pos = colorButtonTemplate.transform.localPosition;
            UnityEngine.Random.InitState(0);
			for (int j = 0; j < 6; j++) {
				for (int k = 0; k < 4; k++) {
					Vector2 newPos = new Vector2(pos.x + k * 32, pos.y - j * 32);
					GameObject newColorSwatch = Instantiate<GameObject>(colorButtonTemplate);
					newColorSwatch.SetActive(true);
					newColorSwatch.transform.SetParent(colorButtonTemplate.transform.parent, false);
					newColorSwatch.transform.localPosition = newPos;
					Button button = newColorSwatch.GetComponent<Button>();
					ColorBlock colorBlock = button.colors;
					Color buttonColor = new Color(UnityEngine.Random.value, UnityEngine.Random.value, UnityEngine.Random.value);
					colorBlock.normalColor = buttonColor;
					colorBlock.pressedColor = new Color(buttonColor.r, buttonColor.g, buttonColor.b, 0.5f);
					colorBlock.highlightedColor = new Color(buttonColor.r * 1.1f, buttonColor.g * 1.1f, buttonColor.b * 1.1f);
					button.colors = colorBlock;
					button.onClick.AddListener(() => {
                        woodenBlock.currentColor = colorBlock.normalColor;
                        //env.VoxelSetColor(currentChunk, currentVoxelIndex, colorBlock.normalColor);
                    });											
				}
			}
		}

        void CreateSlotSwatch() {
            Vector2 pos = slotButtonTemplate.transform.localPosition;
            UnityEngine.Random.InitState(0);
            int buttonNo = 0;
            List<Button> lbuttons = new List<Button>();
            for (int j = 0; j < 6; j++) {
                for (int k = 0; k < 4; k++) {
                    Vector2 newPos = new Vector2(pos.x + k * 32, pos.y - j * 32);
                    GameObject newColorSwatch = Instantiate<GameObject>(slotButtonTemplate);
                    newColorSwatch.SetActive(true);
                    newColorSwatch.transform.SetParent(slotButtonTemplate.transform.parent, false);
                    newColorSwatch.transform.localPosition = newPos;

                    lbuttons.Add(newColorSwatch.GetComponent<Button>());
                }
            }
            ColorBlock colorBlock;
            for (int i=0; i<lbuttons.Count; ++i) {
                Button button_ = lbuttons[i];
                Text text = button_.transform.gameObject.GetComponentInChildren<Text>();
                text.text = (++buttonNo).ToString();
                button_.name = "slot" + text.text;
                button_.onClick.AddListener(() => {                    
                    for (int j = 0; j < lbuttons.Count; ++j) {
                        colorBlock = lbuttons[j].colors;
                        colorBlock.normalColor = Color.white;
                        colorBlock.selectedColor = Color.white;
                        lbuttons[j].colors = colorBlock;
                    }
                    woodenBlock.saveName = text.text;
                    colorBlock = button_.colors;
                    colorBlock.normalColor = Color.red;
                    colorBlock.selectedColor = Color.red;
                    button_.colors = colorBlock;
                });
            }
            lbuttons[0].onClick.Invoke();
        }

        void CreateInputSwatch()
        {
            Vector2 pos = inputButtonTemplate.transform.localPosition;
            UnityEngine.Random.InitState(0);
            int buttonNo = 0;
            ColorBlock colorBlock;
            for (int j = 0; j < 4; j++) {
                for (int k = 0; k < 3; k++) {
                    if (11 == ++buttonNo) break;
                    Vector2 newPos = new Vector2(pos.x + k * 96, pos.y - j * 84);
                    GameObject newColorSwatch = Instantiate<GameObject>(inputButtonTemplate);
                    newColorSwatch.SetActive(true);
                    newColorSwatch.transform.SetParent(inputButtonTemplate.transform.parent, false);
                    newColorSwatch.transform.localPosition = newPos;

                    Button button_ = newColorSwatch.GetComponent<Button>();
                    Text text = newColorSwatch.GetComponentInChildren<Text>();
                    text.text = (buttonNo % 10).ToString();
                    button_.name = "input" + text.text;
                    colorBlock = button_.colors;
                    colorBlock.pressedColor = Color.red;
                    button_.colors = colorBlock;
                    button_.onClick.AddListener(() => {
                        if(3 > userInputText.text.Length )
                            userInputText.text += text.text;
                    });
                }
            }
            cancelButton.onClick.AddListener(() => {
                if(userInputText.text.Length > 0)
                    userInputText.text = userInputText.text.Remove(userInputText.text.Length - 1);
            });
            excuteButton.onClick.AddListener(() => {

                int blockCount = -1;
                switch(woodenBlock.controlMode) {
                    case WoodenBlock.ControlMode.ALL:
                        blockCount = voxelLib.GetCountBlockAboveGrid();
                        break;
                    case WoodenBlock.ControlMode.HORIZONTAL:                        
                        blockCount = voxelLib.GetCountBlockSameHeight(woodenBlock.currentChunk, woodenBlock.currentVoxelIndex);
                        break;
                    case WoodenBlock.ControlMode.VERTICAL:
                        blockCount = voxelLib.GetCountBlockYAxisLine(woodenBlock.currentChunk, woodenBlock.currentVoxelIndex);
                        break;
                }
                
                int input = 0;
                try
                {
                    input = int.Parse(userInputText.text);
                }
                catch
                {
                    input = -1;
                }
                if (blockCount == input)
                    env.ShowMessage("<color=yellow>Success!</color>");
                else
                    env.ShowMessage("<color=red>Fail!</color>");
            });
        }

        void Update()
        {
            // Manages orbit or free mode according to distance to model
            //fps.SetOrbitMode(fps.transform.position.sqrMagnitude > orbitDistance);

            if (Input.GetKeyDown(KeyCode.X))
            {
                onClickEraseButton();
            }
            else if (env.input.GetButtonDown(InputButtonNames.Build))
            {
                onClickBuildButton();
            }
            else if (Input.GetKeyDown(KeyCode.C))
            {
                onClickColorButton();
            }
            //else if (Input.GetKeyDown(KeyCode.G))
            //{
            //    ToggleGlobalIllum();
            //}
            //else if (Input.GetKeyDown(KeyCode.F1))
            //{
            //    LoadModel();
            //}
            //else if (Input.GetKeyDown(KeyCode.O))
            //{
            //    SaveGame(saveName);
            //}
            //else if (Input.GetKeyDown(KeyCode.P))
            //{
            //    LoadGame(saveName);
            //}
            //else if (Input.GetKeyDown(KeyCode.N))
            //{
            //    NewGame();
            //}
            //else if (Input.GetKeyDown(KeyCode.H))
            //{
            //    env.ShowMessage(env.welcomeMessage, env.welcomeMessageDuration, true);
            //}
        }
    }
}