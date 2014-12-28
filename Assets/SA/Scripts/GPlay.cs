using UnityEngine;
using System.Collections;
using GooglePlayGames;
using System;
using System.Text.RegularExpressions;

public class GPlay : MonoBehaviour {

	// Use this for initialization
	void Start ()
	{
		PlayGamesPlatform.Activate ();
	}
	
	// Update is called once per frame
	void Update ()
	{
	}

	public void GoogleButton ()
	{
		Social.localUser.Authenticate((bool success) =>
		                              {
			if (success)
			{
				string strippedName = Social.localUser.userName;
				strippedName = Regex.Replace(strippedName, "( )+", "");
				Debug.Log ("Logged in as: " + strippedName);
				
				PlayerPrefs.SetString ("AutoCreatePlayername", strippedName);
				PlayerPrefs.SetString ("AutoCreatePassword", Social.localUser.id);
				Debug.Log (Social.localUser.id);
				PlayerPrefs.SetInt ("AutoCreateName", 2);
			}
			else
			{
				Debug.Log("Error logged into Google Play");
			}
		});
	}

	void OnApplicationPause ()
	{
		if (Application.loadedLevelName == "trinispace")
		{
			((PlayGamesPlatform)Social.Active).SignOut ();
		}
	}

	void OnApplicationResume ()
	{
		if (Application.loadedLevelName == "trinispace")
		{
			PlayGamesPlatform.Activate ();
		}
	}

	/*void OnGUI ()
	{
		//if (!FB.IsLoggedIn)                                                                                              
		//{                                                                                                                
			if (GUI.Button(new Rect(10, 100, 200, 50), "Login to Google Play"))                                      
			{                                                                                                            
				Social.localUser.Authenticate((bool success) =>
			    {
					if (success)
					{
						string strippedName = Social.localUser.userName;
						strippedName = Regex.Replace(strippedName, "( )+", "");
						Debug.Log ("Logged in as: " + strippedName);
						
						PlayerPrefs.SetString ("AutoCreatePlayername", strippedName);
						PlayerPrefs.SetString ("AutoCreatePassword", Social.localUser.id);
						Debug.Log (Social.localUser.id);
						PlayerPrefs.SetInt ("AutoCreateName", 2);
					}
					else
					{
						Debug.Log("Error logged into Google Play");
					}
				});
			}
		//}  
	}*/

}
