using UnityEngine;
using System.Collections;

public class moneyScript : MonoBehaviour {



	private string formMoney = "";





	void Start () {

		//LOAD PLAYER MONEY
		StartCoroutine( GetOnlineVariable("money") ); //(****SAME AS THE ONLINE DATABASE****)

	}




	
	//DRAW THE FORM
	void OnGUI() {
		
		
		float LeftMenuX = -250;
		float RightMenuX = 250;
		GUI.skin.label.alignment = TextAnchor.UpperCenter;
		GUI.skin.label.fontSize = 25;



		//---------GET PLAYER MONEY

		//MONEY LABEL
		GUI.Label( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX
		                    ,((125)*(Screen.height/5))/100 //y
		                    ,((200)*(Screen.height/5))/100 //width
		                    ,80f  ) //height
		          , "Get Money:"+global.usermoney);


		//REFRESH MONEY BUTTON
		if(GUI.Button ( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX ,((175)*(Screen.height/5))/100 , 316*0.58f ,75*0.58f) , "Refresh" ) //connect button
		   ) {
			//GET MONEY ONLINE
			StartCoroutine( GetOnlineVariable("money") ); //(****SAME AS THE ONLINE DATABASE****)
		}





		//-------UPDATE PLAYER MONEY


		//MONEY LABEL
		GUI.Label( new Rect( (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX
		                    ,((225)*(Screen.height/5))/100 //y
		                    ,((200)*(Screen.height/5))/100 //width
		                    ,80f  ) //height
		          , "Update Money:");



		//USERNAME INPUT
		formMoney = GUI.TextField ( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX
		                                    ,((300)*(Screen.height/5))/100 //y
		                                    ,((200)*(Screen.height/5))/100 //width
		                                    ,25f  ) //height
		                           , formMoney);

		//REFRESH MONEY BUTTON
		if(GUI.Button ( new Rect(  (Screen.width /2f)-(((100)*(Screen.height/5))/100)+LeftMenuX ,((375)*(Screen.height/5))/100 , 316*0.58f ,75*0.58f) , "Refresh" ) //connect button
		   ) {
			//SEND MOLNEY ONLINE
			StartCoroutine( SetOnlineVariable("money", formMoney) ); //(****SAME AS THE ONLINE DATABASE****)
		}







	} //end of OnGUI()












	
	
	public IEnumerator GetOnlineVariable(string myVarToGet) { //myVarToGet = SAME AS THE ONLINE DATABASE)
		
		WWWForm form = new WWWForm(); //here you create a new form connection

		form.AddField( "PHP_hash", global.gameHashCode ); //your hash
		
		form.AddField( "PHP_username", global.username ); //joueur connecter
		
		form.AddField( "PHP_password", global.userpassword ); //joueur connecter
		
		form.AddField( "PHP_variable", myVarToGet ); //enter your variable name here (****SAME AS THE ONLINE DATABASE****)
		
		form.AddField( "PHP_action", "GetVariable" );


		WWW w = new WWW(global.URL_GetSetVariable , form); //here we create a var called 'w' and we sync with our URL and the form
		
		yield return w;
		
		if (w.error != null) {

			//ERROR

		} else {

			//SUCCESS
			Debug.Log( w.text );
			if(myVarToGet == "money" && w.text.Length > 0) {
				global.usermoney = int.Parse(w.text); 
			}
			
			w.Dispose(); 
			
		}
		
	} 






	
	public IEnumerator SetOnlineVariable(string myVarToGet, string varValue) {  //myVarToGet = SAME AS THE ONLINE DATABASE)
		
		WWWForm form = new WWWForm(); //here you create a new form connection
		
		form.AddField( "PHP_hash", global.gameHashCode ); //your hash
		
		form.AddField( "PHP_username", global.username ); //joueur connecter
		
		form.AddField( "PHP_password", global.userpassword ); //joueur connecter
		
		form.AddField( "PHP_variable", myVarToGet ); //enter your variable name here (****SAME AS THE ONLINE DATABASE****)

		form.AddField( "PHP_varValue", varValue ); //enter your variable name here (****SAME AS THE ONLINE DATABASE****)

		form.AddField( "PHP_action", "SetVariable" ); 

		
		WWW w = new WWW(global.URL_GetSetVariable , form); //here we create a var called 'w' and we sync with our URL and the form
		
		yield return w;
		
		if (w.error != null) {
			
			//ERROR
			
		} else {
			
			//SUCCESS
			Debug.Log( w.text );
			if(myVarToGet == "money") {
				global.usermoney = int.Parse( varValue ); 
			}
			
			w.Dispose(); 
			
		}
		
	} 









}
