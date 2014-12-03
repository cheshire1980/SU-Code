using UnityEngine;
using System.Collections;

public class loginMenu : MonoBehaviour {





	//FORM SETTINGS
	//LOGIN FORM
	[HideInInspector]
	public string formNick = "";
	[HideInInspector]
	public string formPassword = "";
	

	//REGISTER FORM
	[HideInInspector]
	public string formNickREG = "";
	[HideInInspector]
	public string formPasswordREG = "";
	[HideInInspector]
	public string formConfirmPasswordREG = "";


	//CALL BACK MESSAGE FROM THE PHP PAGE
	[HideInInspector]
	public string callBackText = ""; 


	public bool showGUI = true;


	public bool moveToGameScene; //true if you want to load the game_scene level
	public string sceneName = "inLogin_gameScene"; 



	//APPLICATION START
	void Awake () {

		//SI IL Y A DEJA UN JOUEUR D'ENREGISTRER ET UN MOT DE PASSE, SE CONNECTE
		if(PlayerPrefs.GetString("SAVED_username", "") != "" && PlayerPrefs.GetString("SAVED_password", "") != "") {
			formNick = PlayerPrefs.GetString("SAVED_username", "");
			formPassword = PlayerPrefs.GetString("SAVED_password", "");

			//uncomment this if you want to login automaticly if the form is already filled
			//StartCoroutine( Login() ); 
		}

	}
	







	//DRAW THE FORM
	void OnGUI() {

		if(showGUI) {
		float LeftMenuX = -250;
		float RightMenuX = 250;
		GUI.skin.label.alignment = TextAnchor.UpperCenter;
		GUI.skin.label.fontSize = 25;
	
		//LOGIN LABEL TITLE
		GUI.Label( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX
		                    ,((50)*(Screen.height/5))/100 //y
		                    ,((200)*(Screen.height/5))/100 //width
		                    ,80f  ) //height
		          , "LOGIN");


		//USERNAME LABEL
		GUI.Label( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX
		                    ,((125)*(Screen.height/5))/100 //y
		                    ,((200)*(Screen.height/5))/100 //width
		                    ,80f  ) //height
		          , "Username:");
		
		//PASSWORD LABEL
		GUI.Label( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX
		                    ,((225)*(Screen.height/5))/100 //y
		                    ,((200)*(Screen.height/5))/100 //width
		                    ,80f  ) //height
		          , "Password:");
		
		
		//USERNAME INPUT
		formNick = GUI.TextField ( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX
		                                    ,((175)*(Screen.height/5))/100 //y
		                                    ,((200)*(Screen.height/5))/100 //width
		                                    ,25f  ) //height
		                          , formNick);
		
		//PASSWORD INPUT
		formPassword = GUI.PasswordField ( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX
		                                            ,((300)*(Screen.height/5))/100 //y
		                                            ,((200)*(Screen.height/5))/100 //width
		                                            ,25f  ) //height
		                                  , formPassword, "*"[0], 150);



		//CONNECT BOUTTON
		if(GUI.Button ( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX ,((400)*(Screen.height/5))/100 , 316*0.58f ,75*0.58f) , "Login" ) //connect button
			) {
			//START THE LOGIN VERIFICATION
			StartCoroutine( Login() );
		}



















		//REGISTER LABEL TITLE
		GUI.Label( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+RightMenuX
		                    ,((50)*(Screen.height/5))/100 //y
		                    ,((200)*(Screen.height/5))/100 //width
		                    ,80f  ) //height
		          , "REGISTER");

		//USERNAME LABEL
		GUI.Label( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+RightMenuX
		                    ,((125)*(Screen.height/5))/100 //y
		                    ,((200)*(Screen.height/5))/100 //width
		                    ,80f  ) //height
		          , "Username:");
		
		//PASSWORD LABEL
		GUI.Label( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+RightMenuX
		                    ,((225)*(Screen.height/5))/100 //y
		                    ,((200)*(Screen.height/5))/100 //width
		                    ,80f  ) //height
		          , "Password:");
		
		
		//USERNAME INPUT
		formNickREG = GUI.TextField ( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+RightMenuX
		                                    ,((175)*(Screen.height/5))/100 //y
		                                    ,((200)*(Screen.height/5))/100 //width
		                                    ,25f  ) //height
		                             , formNickREG);
		
		//PASSWORD INPUT
		formPasswordREG = GUI.PasswordField ( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+RightMenuX
		                                            ,((300)*(Screen.height/5))/100 //y
		                                            ,((200)*(Screen.height/5))/100 //width
		                                            ,25f  ) //height
		                                     , formPasswordREG, "*"[0], 150);

		//CONFIRM PASSWORD INPUT
		formConfirmPasswordREG = GUI.PasswordField ( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+RightMenuX
		                                               ,((340)*(Screen.height/5))/100 //y
		                                               ,((200)*(Screen.height/5))/100 //width
		                                               ,25f  ) //height
		                                            , formConfirmPasswordREG, "*"[0], 150);
		
		
		
		//CONNECT BOUTTON
		if(GUI.Button ( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+RightMenuX ,((400)*(Screen.height/5))/100 , 316*0.58f ,75*0.58f) , "Register" ) //connect button
		   ) {
			//START THE LOGIN VERIFICATION
			if(formPasswordREG == formConfirmPasswordREG) { //compare password
				StartCoroutine( Register() );
			}
		}


		}// END showGUI bool
	} //END OnGUI()








	public void loginFromPlaymaker() {
		//START THE LOGIN VERIFICATION
		StartCoroutine( Login() );
	}



	public void registerFromPlaymaker() {
		//START THE LOGIN VERIFICATION
		StartCoroutine( Register() );
	}






	//THE LOGIN COROUTINE YOU CAN CALL IT WITH, StartCoroutine( Login() );
	private IEnumerator Login() {
		
		WWWForm form = new WWWForm(); //here you create a new form connection
		
		form.AddField( "PHP_hash", global.gameHashCode ); //this variable name is the same as in PHP file
		
		form.AddField( "PHP_username", formNick ); //this variable name is the same as in PHP file
		
		form.AddField( "PHP_password", formPassword ); //this variable name is the same as in PHP file

		form.AddField( "PHP_gameVersion", global.gameVersion ); //this variable name is the same as in PHP file

		form.AddField( "PHP_action", "login" ); //determine the action (login or register)
		
		WWW w = new WWW(global.URL_loginRegister, form); //here we create a var called 'w' and we sync with our URL and the form

		yield return w; //this is the webpage result
		

		
		if (w.error != null) { 

			//ERROR
			
			print(w.error); //if there is an error, tell us
			
			callBackText = "Connection to the Server cannot be established!"; //here we return the data our PHP told us
			global.PM_ConnectionState = 2; //fail
			
		} else { 

			//SUCCESS
			

			if(w.text == "BadGameVersion") { //BAD GAME VERSION+++++++++++++++++++++

				//IF BAD GAME VERSION
				Debug.Log("Game Version is different from the php page");
				global.PM_ConnectionState = 2; //fail

			} 
			else if(w.text == "IMCONNECTED") { //WE ARE CONNECTED+++++++++++++++++++

				//SET THE GLOBAL SETTINGS FOR THE GAME SESSION
				global.username = formNick;
				global.userpassword = formPassword;
				global.playerState = "connected";
				global.PM_ConnectionState = 1; //success

				//SAVE USERNAME AND PASSWORD LOCALLY
				PlayerPrefs.SetString("SAVED_username", formNick); 
				PlayerPrefs.SetString("SAVED_password", formPassword);

				Debug.Log("Player Connected: "+formNick);

				//MOVE TO NEXT SCENE
				if(moveToGameScene) {
					Application.LoadLevel(sceneName); 
				}

			} else { //IF THERE IS SOMETHING ELSE+++++++++++++++++++++++++++++++++++

				//CALL BACK MESSAGE FROM THE PHP FILE
				callBackText = w.text; //if you want to show the error to the user
				Debug.Log("CallBack from PHP: "+callBackText);
				global.PM_ConnectionState = 2; //fail

			}
			w.Dispose(); //clear our form in game
		}		
	} //END of Login()















	private IEnumerator Register() {
		
		WWWForm form = new WWWForm(); //here you create a new form connection
		
		form.AddField( "PHP_hash", global.gameHashCode ); //this variable name is the same as in PHP file
		
		form.AddField( "PHP_username", formNickREG ); //this variable name is the same as in PHP file
		
		form.AddField( "PHP_password", formPasswordREG ); //this variable name is the same as in PHP file
		
		form.AddField( "PHP_gameVersion", global.gameVersion ); //this variable name is the same as in PHP file
		
		form.AddField( "PHP_action", "register" ); //determine the action (login or register)
		
		WWW w = new WWW(global.URL_loginRegister, form); //here we create a var called 'w' and we sync with our URL and the form
		
		yield return w; //this is the webpage result
		
		
		
		if (w.error != null) { 
			
			//ERROR
			
			print(w.error); //if there is an error, tell us
			
			callBackText = "Connection to the Server cannot be established!"; //here we return the data our PHP told us
			global.PM_ConnectionState = 2; //fail
			
		} else { 
			
			//SUCCESS
			
			
			if(w.text == "BadGameVersion") { //BAD GAME VERSION+++++++++++++++++++++
				
				//IF BAD GAME VERSION
				Debug.Log("Game Version is different from the php page");
				
			} 
			else if(w.text == "IMCONNECTED") { //WE ARE CONNECTED+++++++++++++++++++
				
				//SET THE GLOBAL SETTINGS FOR THE GAME SESSION
				global.username = formNickREG;
				global.userpassword = formPasswordREG;
				global.playerState = "connected";
				global.PM_ConnectionState = 1; //success
				
				//SAVE USERNAME AND PASSWORD LOCALLY
				PlayerPrefs.SetString("SAVED_username", formNickREG); 
				PlayerPrefs.SetString("SAVED_password", formPasswordREG);
				
				Debug.Log("Player Connected: "+formNickREG);
				
				//MOVE TO NEXT SCENE
				if(moveToGameScene) {
					Application.LoadLevel(sceneName); 
				}
				
			} else { //IF THERE IS SOMETHING ELSE+++++++++++++++++++++++++++++++++++
				
				//CALL BACK MESSAGE FROM THE PHP FILE
				callBackText = w.text; //if you want to show the error to the user
				Debug.Log("CallBack from PHP: "+callBackText);
				global.PM_ConnectionState = 2; //fail
				
			}
			w.Dispose(); //clear our form in game
		}		
	} //END of Login()




	




}
