////////////////////////////////////////////////////////////////////////////////
//  
// @module Android Native Plugin for Unity3D 
// @author Osipov Stanislav (Stan's Assets) 
// @support stans.assets@gmail.com 
//
////////////////////////////////////////////////////////////////////////////////



using UnityEngine;
using System.Collections;

public class TwitterAndroidUseExample : MonoBehaviour {


	//Replace with your key and secret
	private static string TWITTER_CONSUMER_KEY = "wEvDyAUr2QabVAsWPDiGwg";
	private static string TWITTER_CONSUMER_SECRET = "igRxZbOrkLQPNLSvibNC3mdNJ5tOlVOPH3HNNKDY0";




	private static bool IsUserInfoLoaded = false;

	private static bool IsAuntifivated = false;

	public Texture2D ImageToShare;
	public DefaultPreviewButton connectButton;
	public SA_Texture avatar;
	public SA_Label Location;
	public SA_Label Language;
	public SA_Label Status;
	public SA_Label Name;
	public GameObject[] showedOnAuth;

	void Awake() {


		AndroidTwitterManager.instance.addEventListener(TwitterEvents.TWITTER_INITED,  OnInit);
		AndroidTwitterManager.instance.addEventListener(TwitterEvents.AUTHENTICATION_SUCCEEDED,  OnAuth);

		AndroidTwitterManager.instance.addEventListener(TwitterEvents.POST_SUCCEEDED,  OnPost);
		AndroidTwitterManager.instance.addEventListener(TwitterEvents.POST_FAILED,  OnPostFailed);

		AndroidTwitterManager.instance.addEventListener(TwitterEvents.USER_DATA_LOADED,  OnUserDataLoaded);
		AndroidTwitterManager.instance.addEventListener(TwitterEvents.USER_DATA_FAILED_TO_LOAD,  OnUserDataLoadFailed);


		//You can use:
		//AndroidTwitterManager.instance.Init();
		//if TWITTER_CONSUMER_KEY and TWITTER_CONSUMER_SECRET was alredy set in 
		//Window -> Mobile Social Plugin -> Edit Settings menu.


		AndroidTwitterManager.instance.Init(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);



	}

	void FixedUpdate() {
		if(IsAuntifivated) {
			connectButton.text = "Disconnect";
			Name.text = "Player Connected";
			foreach(GameObject o in showedOnAuth) {
				o.SetActive(true);
			}
		} else {
			foreach(GameObject o in showedOnAuth) {
				o.SetActive(false);
			}
			connectButton.text = "Connect";
			Name.text = "Player Disconnected";

			return;
		}


		if(IsUserInfoLoaded) {


			if(AndroidTwitterManager.instance.userInfo.profile_image != null) {
				avatar.texture = AndroidTwitterManager.instance.userInfo.profile_image;
			}

			Name.text = AndroidTwitterManager.instance.userInfo.name + " aka " + AndroidTwitterManager.instance.userInfo.screen_name;
			Location.text = AndroidTwitterManager.instance.userInfo.location;
			Language.text = AndroidTwitterManager.instance.userInfo.lang;
			Status.text = AndroidTwitterManager.instance.userInfo.status.text;
			
		
		}

	}

	private void Connect() {
		if(!IsAuntifivated) {
			AndroidTwitterManager.instance.AuthenticateUser();
		} else {
			LogOut();
		}
	}

	private void PostWithAuthCheck() {
		AndroidTwitterManager.instance.PostWithAuthCheck("Hello, I'am posting this from my app");
	}

	private void PostNativeScreenshot() {
		StartCoroutine(PostTWScreenshot());
	}

	private void PostMSG() {
		AndroidSocialGate.StartShareIntent("Hello Share Intent", "This is my text to share",  "twi");
	}


	private void PostImage() {
		AndroidSocialGate.StartShareIntent("Hello Share Intent", "This is my text to share", ImageToShare,  "twi");
	}
	
	
	
	private IEnumerator PostTWScreenshot() {
		
		
		yield return new WaitForEndOfFrame();
		// Create a texture the size of the screen, RGB24 format
		int width = Screen.width;
		int height = Screen.height;
		Texture2D tex = new Texture2D( width, height, TextureFormat.RGB24, false );
		// Read screen contents into the texture
		tex.ReadPixels( new Rect(0, 0, width, height), 0, 0 );
		tex.Apply();
		
		AndroidSocialGate.StartShareIntent("Hello Share Intent", "This is my text to share", tex,  "twi");
		
		Destroy(tex);
		
	}


	private void LoadUserData() {
		AndroidTwitterManager.instance.LoadUserData();
	}
	
	private void PostMessage() {
		AndroidTwitterManager.instance.Post("Hello, I'am posting this from my app");
	}
	
	private void PostScreehShot() {
		StartCoroutine(PostScreenshot());
	}

	void OnGUI() {


	
		/*

		if(!IsAuntifivated) {
			GUI.Label(new Rect(10, 10, Screen.width, 100), "App do not have permission to use your twitter account, press the button to auntificate", style);
			if(GUI.Button(new Rect(10, 70, 150, 50), "Twitter Auth")) {
				AndroidTwitterManager.instance.AuthificateUser();
			}
		} else {

			if(!IsUserInfoLoaded) {
				GUI.Label(new Rect(10, 10, Screen.width, 100), "Great, app have  permission to use your twitter account, see the avaliable action bellow", style);

				if(GUI.Button(new Rect(10, 70, 150, 50), "Load User Data")) {
					AndroidTwitterManager.instance.LoadUserData();
				}
				
				if(GUI.Button(new Rect(10, 130, 150, 50), "Post Message")) {
					AndroidTwitterManager.instance.Post("Hello, I'am posting this from my app");
				}

				if(GUI.Button(new Rect(10, 190, 150, 50), "Post ScreehShot")) {
					StartCoroutine(PostScreenshot());
				}

				if(GUI.Button(new Rect(10, 250, 150, 50), "Log out")) {
					LogOut();
				}
			} else {

				if(AndroidTwitterManager.instance.userInfo.profile_background != null) {
					GUI.DrawTexture(new Rect(0, 0, AndroidTwitterManager.instance.userInfo.profile_background.width, AndroidTwitterManager.instance.userInfo.profile_background.height),  AndroidTwitterManager.instance.userInfo.profile_background);
				}


				if(AndroidTwitterManager.instance.userInfo.profile_image != null) {
					GUI.DrawTexture(new Rect(10, 10, 60, 60),  AndroidTwitterManager.instance.userInfo.profile_image);
				}


				GUI.Label(new Rect(150, 10, Screen.width, 100),  AndroidTwitterManager.instance.userInfo.name + " aka " + AndroidTwitterManager.instance.userInfo.screen_name, style2);
				GUI.Label(new Rect(150, 30, Screen.width, 100),  "Location:  " + AndroidTwitterManager.instance.userInfo.location, style2);
				GUI.Label(new Rect(150, 50, Screen.width, 100),  "Language:  " + AndroidTwitterManager.instance.userInfo.lang, style2);

				GUI.Label(new Rect(150, 70, Screen.width, 100),  "Status:  " + AndroidTwitterManager.instance.userInfo.status.text , style2);

				GUI.Label(new Rect(150, 90, Screen.width, 100),  AndroidTwitterManager.instance.userInfo.name + " has  " + AndroidTwitterManager.instance.userInfo.friends_count +  " friends and " + AndroidTwitterManager.instance.userInfo.statuses_count + " twits", style2);


				if(GUI.Button(new Rect(10, 130, 150, 50), "Post Message")) {
					AndroidTwitterManager.instance.Post("Hello, I'am posting this from my app");
				}
				
				if(GUI.Button(new Rect(10, 190, 150, 50), "Post ScreehShot")) {
					StartCoroutine(PostScreenshot());
				}
				
				if(GUI.Button(new Rect(10, 250, 150, 50), "Log out")) {
					LogOut();
				}
			}
		}

*/
	}



	// --------------------------------------
	// EVENTS
	// --------------------------------------



	private void OnUserDataLoadFailed() {
		Debug.Log("Opps, user data load failed, something was wrong");
	}


	private void OnUserDataLoaded() {
		IsUserInfoLoaded = true;
		AndroidTwitterManager.instance.userInfo.LoadProfileImage();
		AndroidTwitterManager.instance.userInfo.LoadBackgroundImage();


		//style2.normal.textColor 							= AndroidTwitterManager.instance.userInfo.profile_text_color;
		//Camera.main.GetComponent<Camera>().backgroundColor  = AndroidTwitterManager.instance.userInfo.profile_background_color;
	}


	private void OnPost() {
		Debug.Log("Congrats, you just postet something to twitter");
	}

	private void OnPostFailed() {
		Debug.Log("Opps, post failed, something was wrong");
	}


	private void OnInit() {
		if(AndroidTwitterManager.instance.IsAuthed) {
			OnAuth();
		}
	}


	private void OnAuth() {
		IsAuntifivated = true;
	}

	// --------------------------------------
	// PRIVATE METHODS
	// --------------------------------------

	private IEnumerator PostScreenshot() {
		
		
		yield return new WaitForEndOfFrame();
		// Create a texture the size of the screen, RGB24 format
		int width = Screen.width;
		int height = Screen.height;
		Texture2D tex = new Texture2D( width, height, TextureFormat.RGB24, false );
		// Read screen contents into the texture
		tex.ReadPixels( new Rect(0, 0, width, height), 0, 0 );
		tex.Apply();
		
		AndroidTwitterManager.instance.Post("My app ScreehShot", tex);
		
		Destroy(tex);
		
	}

	private void LogOut() {
		IsUserInfoLoaded = false;
		
		IsAuntifivated = false;

		AndroidTwitterManager.instance.LogOut();
	}
}
