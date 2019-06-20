using System;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace VoxelPlay
{

	public class DualTouchController_Algeomath : VoxelPlayInputController
	{

		public float dragThreshold = 10f;
		public float rotationSpeed = 0.1f;
		public float alpha = 0.7f;
		public float fadeInSpeed = 2f;

		GameObject touchControls;
		bool dragged;
		Rect buttonJumpRect, buttonCrouchRect, buttonBuildRect, buttonInventoryRect;
		CanvasGroup canvasGroup;
		float startTime;
		bool leftTouched;
		bool pressingFire;
		float pressTime, liftTime;
		Vector3 leftTouchPos;

		protected override bool Initialize ()
		{
            //touchControls = GameObject.Instantiate<GameObject>(Resources.Load<GameObject>("VoxelPlay/UI/CanvasTouch"));
            //touchControls.name = "VoxelPlay Touch Interface";
            //canvasGroup = touchControls.GetComponent<CanvasGroup>();
            //canvasGroup.alpha = 0;

            ////touchControls.transform.Find("ButtonBuild").gameObject.SetActive(false);
            ////touchControls.transform.Find("ButtonJump").gameObject.SetActive(false);
            ////touchControls.transform.Find("ButtonCrouch").gameObject.SetActive(false);
            //buttonBuildRect = GetRect(touchControls.transform.Find("ButtonBuild"));
            //buttonJumpRect = GetRect(touchControls.transform.Find("ButtonJump"));
            //buttonCrouchRect = GetRect(touchControls.transform.Find("ButtonCrouch"));

            //Transform tInventory = touchControls.transform.Find("ButtonInventory");
            //buttonInventoryRect = GetRect(tInventory);
            //tInventory.gameObject.SetActive(false);
            startTime = Time.time;
			return true;
		}

		protected override void UpdateInputState ()
		{
			//if (canvasGroup.alpha < alpha) {
			//	float t = (Time.time - startTime) / fadeInSpeed;
			//	if (t > alpha)
			//		t = alpha;
			//	canvasGroup.alpha = t;
			//}

			screenPos = Input.mousePosition;
			focused = true;

			int touchCount = Input.touchCount;
            if(touchCount == 1) {
                ManageTouch(0);
            }
			//for (int k = 0; k < touchCount; k++) {
			//	ManageTouch (k);
			//}
		}

		void ManageTouch (int touchIndex)
		{
			Touch t = Input.touches [touchIndex];

			if (t.phase == TouchPhase.Began) {
				dragged = false;
                buttons [(int)InputButtonNames.Button1].pressState = InputButtonPressState.Down;
				pressTime = Time.time;
				pressingFire = (Time.time - liftTime) < 0.3f;
			} else if (t.phase == TouchPhase.Moved) {
				float deltaX = t.deltaPosition.x;
				if (deltaX > 0) {
					deltaX -= dragThreshold;
					if (deltaX < 0)
						deltaX = 0;
				} else if (deltaX < 0) {
					deltaX += dragThreshold;
					if (deltaX > 0)
						deltaX = 0;
				}
				deltaX *= rotationSpeed;
				mouseX = mouseX * 0.9f + deltaX * 0.1f;

				float deltaY = t.deltaPosition.y;
				if (deltaY > 0) {
					deltaY -= dragThreshold;
					if (deltaY < 0)
						deltaY = 0;
				} else if (deltaY < 0) {
					deltaY += dragThreshold;
					if (deltaY > 0)
						deltaY = 0;
				}
				deltaY *= rotationSpeed;
				mouseY = mouseY * 0.9f + deltaY * 0.1f;
				dragged = mouseX != 0 || mouseY != 0;
			} else if (t.phase == TouchPhase.Ended) {
				mouseX = mouseY = 0;
				pressingFire = false;
				if (!dragged && Time.time - pressTime < 0.3f) {
					buttons [(int)InputButtonNames.Button1].pressState = InputButtonPressState.Pressed;
					liftTime = Time.time;
				}
			} else {
				dragged = false;
			}
			if (pressingFire) {
				buttons [(int)InputButtonNames.Button1].pressState = InputButtonPressState.Pressed;
			}
		}
	}
}
