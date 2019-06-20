using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraControl2 : MonoBehaviour
{
    public float lookSpeedH = 2f;
    public float lookSpeedV = 2f;
    public float zoomSpeed = 2f;
    //public float zoomSpeedForMobile = 20f;
    public float dragSpeed = 2f;
    public float initTouchDistance;
    public float tempDistance;

    private float yaw = 0f;
    private float pitch = 0f;
    
    void Start() {
        pitch = transform.parent.eulerAngles.x;
    }

    void Update()
    {
        //drag camera around with Middle Mouse
        if (Input.GetMouseButton(2)) {  // || Input.touchCount >= 3
            transform.Translate(-Input.GetAxisRaw("Mouse X") * Time.deltaTime * dragSpeed, -Input.GetAxisRaw("Mouse Y") * Time.deltaTime * dragSpeed, 0);
        }
        else if(Input.GetMouseButtonDown(1))
        {
            //if (Input.touchCount > 1) {
                yaw = transform.parent.eulerAngles.y;
                pitch = transform.parent.eulerAngles.x;                
            //}
        }
        else if (Input.GetMouseButton(1)) {
            if( Input.touchCount > 1) {
                tempDistance = Vector2.Distance(Input.GetTouch(0).position, Input.GetTouch(1).position);
                if (tempDistance > initTouchDistance + 20) {
                    transform.Translate(0, 0, 0.5f, Space.Self);
                }
                else if(tempDistance < initTouchDistance - 20) {
                    transform.Translate(0, 0, -0.5f, Space.Self);
                }
                else {
                    yaw += lookSpeedH * Input.GetAxis("Mouse X");
                    pitch -= lookSpeedV * Input.GetAxis("Mouse Y");
                    transform.parent.eulerAngles = new Vector3(pitch, yaw, 0f);
                }
                initTouchDistance = tempDistance;                
            }
            else {  // Right Mouse
                yaw += lookSpeedH * Input.GetAxis("Mouse X");
                pitch -= lookSpeedV * Input.GetAxis("Mouse Y");
                transform.parent.eulerAngles = new Vector3(pitch, yaw, 0f);
            }
        }

        //Zoom in and out with Mouse Wheel
        transform.Translate(0, 0, Input.GetAxis("Mouse ScrollWheel") * zoomSpeed, Space.Self);        
    }
}
