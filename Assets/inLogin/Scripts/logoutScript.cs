using UnityEngine;
using System.Collections;

public class logoutScript : MonoBehaviour {



	void OnGUI() {

		
		//LOGOUT BOUTTON
		if(GUI.Button ( new Rect(  (Screen.width /2f)-((316*0.5f)/2) ,350 , 316*0.5f ,75*0.5f) , "LOGOUT!" ) //connect button
		   ) {

			//RESET GLOBAL PLAYER SETTINGS
			global.username = "";
			global.userpassword = "";
			global.usermoney = 0;
			global.playerState = "disconnected";

			//MOVE TO MAIN SCENE
			Application.LoadLevel("inLogin_loginScene");
		}


	}




}
