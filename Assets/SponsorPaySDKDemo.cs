using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;

/**
 * This is an example on how to use the SponsorPay Unity Plugin.
 * If you attach it to a game object, it will draw a user interface 
 * from which the plugin's methods can be exercised.
 */
public class SponsorPaySDKDemo : MonoBehaviour {
#if UNITY_ANDROID && !UNITY_EDITOR
	string appId = "1246"; 
	string securityToken = "12345678";		
#else
	string appId = "1245"; 
	string securityToken = "888";
#endif
	string userId = "test_user_id_1";
	string customCurrencyName = "TestCoins";

	SponsorPay.SponsorPayPlugin sponsorPayPlugin;
	
	bool showScrollView = true;

	ScreenOrientation currentOrientation;
	
	void Start() {
		print ("SponsorPaySDKDemo's Start invoked");

		// get a hold of the SponsorPay plugin instance (SponsorPayPluginMonoBehaviour must be attached to a scene object)
		sponsorPayPlugin = SponsorPayPluginMonoBehaviour.PluginInstance;

		sponsorPayPlugin.EnableLogging(true);

		// Register delegates to be notified of the result of the "get new coins" request
		sponsorPayPlugin.OnDeltaOfCoinsReceived +=
			new	SponsorPay.DeltaOfCoinsResponseReceivedHandler(OnSPDeltaOfCoinsReceived);
		sponsorPayPlugin.OnDeltaOfCoinsRequestFailed +=
			new SponsorPay.ErrorHandler(OnSPDeltaOfCoinsRequestFailed);
		
		// Register delegates to be notified of the result of a BrandEngage request
		sponsorPayPlugin.OnBrandEngageRequestResponseReceived +=
			new SponsorPay.BrandEngageRequestResponseReceivedHandler (OnSPBrandEngageResponseReceived);
		sponsorPayPlugin.OnBrandEngageRequestErrorReceived += 
			new SponsorPay.BrandEngageRequestErrorReceivedHandler (OnSPBrandEngageErrorReceived);
				
		// Register delegates to be notified when a native exception occurs on the plugin
		sponsorPayPlugin.OnNativeExceptionReceived += 
			new SponsorPay.NativeExceptionHandler (OnNativeExceptionReceivedFromSDK);
		
		sponsorPayPlugin.OnOfferWallResultReceived +=
			new SponsorPay.OfferWallResultHandler (OnOFWResultReceived);
		
		sponsorPayPlugin.OnBrandEngageResultReceived +=
			new SponsorPay.BrandEngageResultHandler (OnMBEResultReceived);

		//Interstitial delegates
		sponsorPayPlugin.OnInterstitialRequestResponseReceived +=
			new SponsorPay.InterstitialRequestResponseReceivedHandler (OnSPInterstitialResponseReceived);
		sponsorPayPlugin.OnInterstitialRequestErrorReceived += 
			new SponsorPay.InterstitialRequestErrorReceivedHandler (OnSPInterstitialErrorReceived);

		sponsorPayPlugin.OnInterstitialStatusCloseReceived +=
			new SponsorPay.InterstitialStatusCloseHandler (OnSPInterstitialStatusCloseReceived);
		sponsorPayPlugin.OnInterstitialStatusErrorReceived += 
			new SponsorPay.InterstitialStatusErrorHandler (OnSPInterstitialStatusErrorReceived);
		
		showScrollView = Screen.height < 810;
		currentOrientation = Screen.orientation;

		Dictionary<string, string> dictionary = new Dictionary<string, string>();
		dictionary.Add("additionalParam", "WOOT");
		dictionary.Add("anotherOne", "ImHERE");

		sponsorPayPlugin.AddParameters(dictionary);
	}
	
	void OnGUI() {
		// This will draw the test GUI to show the buttons and fields which let you test the SDK features
		if (currentOrientation != Screen.orientation) 
		{
			currentOrientation = Screen.orientation;
			showScrollView = Screen.height < 810;
		}
		drawTestUI();
	}

	// Starts the SDK with the values entered in the GUI
	private void start() {
		credentialsToken = sponsorPayPlugin.Start(appId, userId, securityToken);
	}

	// Launches the Mobile Offer Wall for the appId and userId entered in the GUI fields
	private void launchOfferWall() {
		if (overrideCredentials) {
			sponsorPayPlugin.LaunchOfferWall(credentialsToken, customCurrencyName);
		} else{
			sponsorPayPlugin.LaunchOfferWall(customCurrencyName);
		}
	}

	public void OnNativeExceptionReceivedFromSDK(string message)
	{
		dialogTitle = "Error";
		dialogMessage = message;
		showDialog = true;
	}
	
	public void OnOFWResultReceived(string message)
	{
		dialogTitle = "OfferWall return status";
		dialogMessage = message;
		showDialog = true;
	}
		
	public void OnMBEResultReceived(string message)
	{
		mbeOffersStatus = "No offers";
		dialogTitle = "BrandEngage return status";
		dialogMessage = message;
		showDialog = true;
	}
	
	public void OnSPInterstitialStatusCloseReceived(string closeReason)
	{
		interstitialAdStatus = "No offers";
		dialogTitle = "Interstitial return status";
		dialogMessage = closeReason;
		showDialog = true;
	}

	public void OnSPInterstitialStatusErrorReceived(string message)
	{
		interstitialAdStatus = "No offers";
		dialogTitle = "Interstitial return error message";
		dialogMessage = message;
		showDialog = true;
	}
	
	/** VCS functionality **/ 

	// Sends the request for new coins to SponsorPay's Virtual Currency Server.
	// The result will be delivered asynchronously to the delegates registered on
	// sponsorPayPlugin.OnDeltaOfCoinsReceived or sponsorPayPlugin.OnDeltaOfCoinsRequestFailed
	private void requestNewCoins() {
		if (overrideCredentials) {
#if UNITY_ANDROID && !UNITY_EDITOR
			sponsorPayPlugin.RequestNewCoins(credentialsToken, customCurrencyName);
#else
			sponsorPayPlugin.RequestNewCoins(credentialsToken, null);
#endif
		} else {
#if UNITY_ANDROID && !UNITY_EDITOR
			sponsorPayPlugin.RequestNewCoins(customCurrencyName);
#else
			sponsorPayPlugin.RequestNewCoins();
#endif
		}
	}
	
	private void showVCSNotification(bool shownNotification) {
		sponsorPayPlugin.ShowVCSNotifications(showNotification);
	}
	
	private void reportActionCompletion(string actionId) {
		if(overrideCredentials) {
			sponsorPayPlugin.ReportActionCompletion(credentialsToken, actionId);
		} else {
			sponsorPayPlugin.ReportActionCompletion(actionId);
		}
	}
	
	// Registered to be called upon reception of the answer for a successful delta of coins request	
	public void OnSPDeltaOfCoinsReceived(double deltaOfCoins, string lastTransactionId)
	{
		coinsLabel = "Delta of coins: " + deltaOfCoins.ToString() +
				". Transaction ID: " + lastTransactionId;
	}

	// Registered to be called if an error is triggered by the delta of coins request
	public void OnSPDeltaOfCoinsRequestFailed(SponsorPay.RequestError error)
	{
		// Update the UI with information about the error
		coinsLabel = String.Format("Delta of coins request failed.\n"
			+ "Error Type: {0}\nError Code: {1}\nError Message: {2}",
			error.Type, error.Code, error.Message);
	}

	/** SponsorPay BrandEngage functionality **/
	
	private void requestMBEOffers()
	{
		if (overrideCredentials) {
			sponsorPayPlugin.RequestBrandEngageOffers (credentialsToken, customCurrencyName, mbeVCSshowNotification);
		} else {
			sponsorPayPlugin.RequestBrandEngageOffers (customCurrencyName, mbeVCSshowNotification);
		}
	}
	
	
	private void showMBERewardNotification (bool showRewardNotification)
	{
		sponsorPayPlugin.ShowBrandEngageRewardNotification (showRewardNotification);
	}
	
	
	private void startMBEEngagement ()
	{
		sponsorPayPlugin.StartBrandEngage();
	}
	
	// Registered to be called upon reception of the answer for a successful offer request	
	public void OnSPBrandEngageResponseReceived(bool offersAvailable)
	{
		if (offersAvailable)
		{
			mbeOffersStatus = "Offers are available";
		}
		else
		{
			mbeOffersStatus = "No offers";
		}
		
	}

	// Registered to be called if an error is triggered by the offer request
	public void OnSPBrandEngageErrorReceived(string message)
	{
		mbeOffersStatus = "Error:\n" + message;
	}

	/** SponsorPay Interstitial functionality **/
	
	private void requestInterstitialAds()
	{
		if (overrideCredentials) {
			sponsorPayPlugin.RequestInterstitialAds(credentialsToken);
		} else {
			sponsorPayPlugin.RequestInterstitialAds();
		}
	}
	
	private void showInterstitialAd ()
	{
		sponsorPayPlugin.ShowInterstitialAd();
	}
	
	// Registered to be called upon reception of the answer for a successful offer request	
	public void OnSPInterstitialResponseReceived(bool adsAvailable)
	{
		if (adsAvailable)
		{
			interstitialAdStatus = "Ads are available";
		}
		else
		{
			interstitialAdStatus = "No ads";
		}
	}

	// Registered to be called if an error is triggered by the offer request
	public void OnSPInterstitialErrorReceived(string message)
	{
		interstitialAdStatus = "Error:\n" + message;
	}


	/* Test user interface drawing code. Look at it at your own peril. */

	static readonly float ScrollBarWidth = 20;
	static readonly float HorizontalMargin = 8;
	static readonly float GuiRectWidth = 0.95f * (Screen.width - (2 * HorizontalMargin) - ScrollBarWidth);
	static readonly float GuiLabelHeight = 25;
	static readonly float GuiTapTargetHeight = 45;
	static readonly float GuiRectSmallPadding = 0;
	static readonly float GuiRectBigPadding = 15;
	static readonly	float HorizontalPadding = 5;

	string coinsLabel = "";

    Vector2 scrollPosition = Vector2.zero;
	
	string actionId = "";
	
	string dialogTitle;
	string dialogMessage;
	bool showDialog = false;
	
	bool showNotification = true;
	bool toggleOn = true;
	
	bool mbeShowNotification = false;
	bool mbeToggleOn = false;
	string mbeOffersStatus = "No offers";
	string interstitialAdStatus = "No ads available";
	
	bool mbeVCStoggleOn = false;
	bool mbeVCSshowNotification = false;

	string credentialsToken = "";
	bool overrideCredentials = false;
	
	void drawTestUI() {
		if (showDialog) 
		{
			drawDialogMessage();
		} 
		else 
		{
			float y = 5.0f; // Top margin
			float x = HorizontalMargin;
	
			if (showScrollView)
			{
				Rect outerScrollRect = new Rect(0, 0, Screen.width, Screen.height);
				Rect innerScrollRect = new Rect(0, 0, Screen.width - ScrollBarWidth, 920);
		        scrollPosition = GUI.BeginScrollView(outerScrollRect, scrollPosition, innerScrollRect, false, true);
			}

			GUI.Label(new Rect(x, y, GuiRectWidth, GuiLabelHeight),  "App ID:");
			y += GuiLabelHeight + GuiRectSmallPadding;
	
			appId = GUI.TextField(new Rect(x, y, GuiRectWidth, GuiTapTargetHeight), appId);
			y += GuiTapTargetHeight + GuiRectBigPadding;
	
			GUI.Label(new Rect(x, y, GuiRectWidth, GuiLabelHeight),  "User ID: ");
			y += GuiLabelHeight + GuiRectSmallPadding;
	
			userId = GUI.TextField(new Rect(x, y, GuiRectWidth, GuiTapTargetHeight), userId);
			y += GuiTapTargetHeight + GuiRectBigPadding;
	
			GUI.Label(new Rect(x, y, GuiRectWidth, GuiLabelHeight),  "Security Token: ");
			y += GuiLabelHeight + GuiRectSmallPadding;
	
			securityToken = GUI.TextField(new Rect(x, y, GuiRectWidth, GuiTapTargetHeight), securityToken);
			y += GuiTapTargetHeight + GuiRectBigPadding;
	
			if (GUI.Button(new Rect (x, y, GuiRectWidth, GuiTapTargetHeight), "Start SDK"))
			{
				start();
			}
			y += GuiTapTargetHeight + GuiRectBigPadding;
	
			float buttonWidth = (GuiRectWidth / 2.0f) - (HorizontalPadding);

			x = HorizontalMargin;

			credentialsToken = GUI.TextField(new Rect(x, y, buttonWidth, GuiTapTargetHeight), credentialsToken);
			x += buttonWidth + HorizontalPadding;
			
			overrideCredentials = GUI.Toggle(new Rect (x, y + (GuiTapTargetHeight/3.0f), buttonWidth, GuiTapTargetHeight/2.0f), overrideCredentials, "Use credentials token");

			x = HorizontalMargin;
			y += GuiTapTargetHeight + GuiRectBigPadding;
				
			if (GUI.Button(new Rect (x, y, buttonWidth, GuiTapTargetHeight), "Launch OfferWall")) 
			{
				launchOfferWall();
			}
			
			x = HorizontalMargin;
			y += GuiTapTargetHeight + GuiRectBigPadding;
	
			if (GUI.Button(new Rect (x, y, buttonWidth, GuiTapTargetHeight), "Get delta of coins")) 
			{
				requestNewCoins();
				coinsLabel = "Waiting for response from VCS...";
			}
			
			x += buttonWidth + HorizontalPadding;
			
			toggleOn = GUI.Toggle(new Rect (x, y + (GuiTapTargetHeight/3.0f), buttonWidth, GuiTapTargetHeight/2.0f), toggleOn, "Show VCS Notifications");
			
			if (showNotification ^ toggleOn)
			{
				showNotification = toggleOn;
				showVCSNotification ( showNotification );
			}
			
			x = HorizontalMargin;
			y += GuiTapTargetHeight + GuiRectSmallPadding;
	
			buttonWidth = (GuiRectWidth / 3.0f) - (HorizontalPadding);
			
			float coinsLabelHeight = GuiLabelHeight * 3;
			GUI.Label(new Rect(x, y, GuiRectWidth, coinsLabelHeight),  coinsLabel);
			y += coinsLabelHeight + GuiRectBigPadding;
	
			GUI.Label(new Rect(x, y, GuiRectWidth, GuiLabelHeight),  "Custom currency name: (leave empty to use default)");
			y += GuiLabelHeight + GuiRectSmallPadding;
	
			customCurrencyName = GUI.TextField(new Rect(x, y, GuiRectWidth, GuiTapTargetHeight), customCurrencyName);
			y += GuiTapTargetHeight + GuiRectBigPadding;
	
			x = HorizontalMargin;
			
			buttonWidth = (GuiRectWidth / 3.0f) - (HorizontalPadding);
	
			actionId = GUI.TextField(new Rect(x, y, buttonWidth * 2, GuiTapTargetHeight), actionId);
			x += (2*buttonWidth) + HorizontalPadding;
			
			if (GUI.Button(new Rect (x, y, buttonWidth, GuiTapTargetHeight), "Report action completion"))
			{
				reportActionCompletion(actionId);
			}
			
			x = HorizontalMargin;
			y += GuiTapTargetHeight + GuiRectSmallPadding;
			
	
			if (GUI.Button(new Rect (x, y, buttonWidth, GuiTapTargetHeight), "Request offers")) 
			{
				requestMBEOffers();
			}
			x += buttonWidth + HorizontalPadding;
	
			GUI.Label(new Rect(x, y + (GuiLabelHeight/2.0f), buttonWidth, GuiLabelHeight),  "Offers available?");
			x += buttonWidth + HorizontalPadding;
			
			GUI.Label(new Rect(x, y + (GuiLabelHeight/2.0f), buttonWidth, GuiLabelHeight),  mbeOffersStatus);
			
		
			x = HorizontalMargin;
			y += GuiTapTargetHeight + GuiRectSmallPadding;
	
			buttonWidth = (GuiRectWidth / 2.0f) - (HorizontalPadding);
			
			mbeToggleOn  = GUI.Toggle(new Rect (x, y + (GuiTapTargetHeight/3.0f), buttonWidth, GuiTapTargetHeight/2.0f), mbeToggleOn, "Show rewards notification");
			
			if (mbeShowNotification ^ mbeToggleOn)
			{
				mbeShowNotification = mbeToggleOn;
				showMBERewardNotification ( mbeShowNotification );
			}
			
			x += buttonWidth + HorizontalPadding;
			
			mbeVCStoggleOn = GUI.Toggle(new Rect (x, y + (GuiTapTargetHeight/3.0f), buttonWidth, GuiTapTargetHeight/2.0f), mbeVCStoggleOn, "Show VCS Notifications");
			
			if (mbeVCSshowNotification ^ mbeVCStoggleOn)
			{
				mbeVCSshowNotification = mbeVCStoggleOn;
			}
			
			x = HorizontalMargin;
			y += GuiTapTargetHeight + GuiRectSmallPadding;
			
			if (GUI.Button(new Rect (x, y, GuiRectWidth, GuiTapTargetHeight), "Start MBE Engagement"))
			{
				startMBEEngagement();
			}
			
			buttonWidth = (GuiRectWidth / 3.0f) - (HorizontalPadding);

			x = HorizontalMargin;
			y += GuiTapTargetHeight + GuiRectBigPadding;
			
			if (GUI.Button(new Rect (x, y, buttonWidth, GuiTapTargetHeight), "Request Interstitial"))
			{
				requestInterstitialAds();
			}
			
			x += buttonWidth + HorizontalPadding;

			GUI.Label(new Rect(x, y + (GuiLabelHeight/2.0f), buttonWidth, GuiLabelHeight),  interstitialAdStatus);

			x += buttonWidth + HorizontalPadding;

			if (GUI.Button(new Rect (x, y, buttonWidth, GuiTapTargetHeight), "Show Interstitial"))
			{
				showInterstitialAd();
			}

			if (showScrollView)
			{
				GUI.EndScrollView();
			}
		}
	}
	
	void drawDialogMessage()
	{		        
	        GUILayout.Box(dialogTitle);
	        GUILayout.Label(dialogMessage);
	        if (GUILayout.Button("\n\nOk\n\n")) {
	            showDialog = false;
				
				// Reset labels	
				coinsLabel = "";
	        }
	}
}
