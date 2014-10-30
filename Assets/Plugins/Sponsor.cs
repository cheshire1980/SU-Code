using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using SponsorPay;
//using Soomla;



public static class trig
{
	public static bool Pause {get;set;}
}


public class Sponsor : MonoBehaviour {

	// Use this for initialization
	void Start ()
	{
		// SponsorPay Initialization
		SponsorPayPlugin sponsorPayPlugin;
		sponsorPayPlugin = SponsorPayPluginMonoBehaviour.PluginInstance;

		string appId = "13142";
		string userId = PlayerPrefs.GetString ("PlayerName");
		string securityToken = "12345678";

		sponsorPayPlugin.Start(appId, userId, securityToken);
	}
	
	// Update is called once per frame
	void Update () {

	}

	//public void launchPurchase () 
	//{
		//trig.Pause = true;
		//StoreInventory.BuyItem (SUAssets.AMETH_50.ItemId);
	//}

	public void launchOfferWall ()
	{
		trig.Pause = true;
		SponsorPayPlugin sponsorPayPlugin;
		sponsorPayPlugin = SponsorPayPluginMonoBehaviour.PluginInstance;

		sponsorPayPlugin.LaunchOfferWall (null);
	}

	public void launchVideos ()
	{
		SponsorPayPlugin sponsorPayPlugin;
		sponsorPayPlugin = SponsorPayPluginMonoBehaviour.PluginInstance;

		sponsorPayPlugin.RequestBrandEngageOffers (null, false);
		sponsorPayPlugin.OnBrandEngageRequestResponseReceived +=
			new SponsorPay.BrandEngageRequestResponseReceivedHandler (OnSPBrandEngageResponseReceived);

	}

	public void OnSPBrandEngageResponseReceived(bool offersAvailable)
	{
		SponsorPayPlugin sponsorPayPlugin;
		sponsorPayPlugin = SponsorPayPluginMonoBehaviour.PluginInstance;

		if (offersAvailable) {
			// display offers
			Debug.Log ("playing video...");
			trig.Pause = true;
			sponsorPayPlugin.StartBrandEngage();
		} else  {
			Debug.Log ("no offers...");
			// no offers available
		}
		
	}

	public void OnSPBrandEngageErrorReceived(string message)
	{
		Debug.Log ("error: " + message);
		// process error
	}
}
