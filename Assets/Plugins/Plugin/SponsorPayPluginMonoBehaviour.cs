using System;
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using LitJson;

public class SponsorPayPluginMonoBehaviour : MonoBehaviour
{
	public static SponsorPay.SponsorPayPlugin PluginInstance;

	// Called when the script instance is being loaded
	void Awake ()
	{
		PluginInstance = new SponsorPay.SponsorPayPlugin (gameObject.name);
	}
	
	// Called asynchronously from the SponsorPay SDK when OfferWall is closed.
	void OnSPOfferWallResultFromSDK (string message)
	{
		PluginInstance.HandleOfferWallResultFromSDK (message);
	}
	
	// Called asynchronously from the SponsorPay SDK when an answer to the delta of coins request is received.
	void OnSPCurrencyDeltaOfCoinsMessageFromSDK (string message)
	{
		PluginInstance.HandleCurrencyDeltaOfCoinsMessageFromSDK (message);
	}

	// Called asynchronously from the SponsorPay SDK when a BrandEnagge status is received.
	void OnSPBrandEngageStatusMessageFromSDK (string message)
	{
		PluginInstance.HandleBrandEngageStatusMessageFromSDK (message);
	}
		
	// Called asynchronously from the SponsorPay SDK when a BrandEngage engagement is ended.
	void OnSPBrandEngageResultFromSDK (string message)
	{
		PluginInstance.HandleBrandEngageResultFromSDK (message);
	}
	
	void OnSPInterstitialMessageFromSDK (string message)
	{
		PluginInstance.HandleInterstitialStatusMessageFromSDK (message);
	}

	// Called asynchronously from the SponsorPay SDK when an Interstitial Ad is close.
	void OnSPInterstitialResultFromSDK (string message)
	{
		PluginInstance.HandleInterstitialResultFromSDK (message);
	}

	// Called asynchronously from the SponsorPay SDK when an exception occurs
	void OnExceptionFromSDK (string message)
	{
		PluginInstance.HandleException (message);
	}

}


namespace SponsorPay
{

	public delegate void DeltaOfCoinsResponseReceivedHandler (double deltaOfCoins, string transactionId);

	public delegate void OfferWallResultHandler (string message);

	public delegate void BrandEngageRequestResponseReceivedHandler (bool offersAvailable);
	
	public delegate void BrandEngageRequestErrorReceivedHandler (string message);
	
	public delegate void BrandEngageResultHandler (string message);

	public delegate void InterstitialRequestResponseReceivedHandler (bool offersAvailable);
	
	public delegate void InterstitialRequestErrorReceivedHandler (string message);

	public delegate void InterstitialStatusCloseHandler (string closeReason);
	
	public delegate void InterstitialStatusErrorHandler (string message);

	public delegate void ErrorHandler (RequestError error);
	
	public delegate void NativeExceptionHandler (string message);
	
	public class SponsorPayPlugin
	{
				
		public const string PluginVersion = "6.1.0";

		public event DeltaOfCoinsResponseReceivedHandler OnDeltaOfCoinsReceived;
		public event ErrorHandler OnDeltaOfCoinsRequestFailed;
		public event OfferWallResultHandler OnOfferWallResultReceived;
		public event BrandEngageRequestResponseReceivedHandler OnBrandEngageRequestResponseReceived;
		public event BrandEngageRequestErrorReceivedHandler OnBrandEngageRequestErrorReceived;
		public event BrandEngageResultHandler OnBrandEngageResultReceived;
		public event InterstitialRequestResponseReceivedHandler OnInterstitialRequestResponseReceived;
		public event InterstitialRequestErrorReceivedHandler OnInterstitialRequestErrorReceived;
		public event InterstitialStatusCloseHandler OnInterstitialStatusCloseReceived;
		public event InterstitialStatusErrorHandler OnInterstitialStatusErrorReceived;
		public event NativeExceptionHandler OnNativeExceptionReceived;
		
		private ISponsorPayPlugin plugin;
		
		public SponsorPayPlugin (string gameObjectName)
		{
		
#if UNITY_IPHONE && !UNITY_EDITOR
			// iOS initialization
			plugin = new IOSSponsorPayPlugin(gameObjectName);		
#elif UNITY_ANDROID && !UNITY_EDITOR
			// Android initialization
			plugin = new AndroidSponsorPayPlugin(gameObjectName);
#else
			//Unsupported platform
			plugin = new UnsupportedPlatformSponsorPayPlugin();
#endif
		}
		
		
		//Start method		
		public string Start (string appId, string userId, string securityToken)
		{
			try 
			{
				CheckRequiredParameters (new string [] {appId}, new string[] {"appId"});
				return plugin.Start (appId, userId, securityToken);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
			return null;
		}
		
		
		// Rewarded Actions
		public void ReportActionCompletion(string actionId) 
		{
			ReportActionCompletion(null, actionId);
		}

		public void ReportActionCompletion(string credentialsToken, string actionId) 
		{
			try 
			{
				CheckRequiredParameters (new string[] {actionId}, new string[] {"actionId"});
				plugin.ReportActionCompletion(credentialsToken, actionId);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}
		
		//OFW
		public void LaunchOfferWall(string currencyName)
		{
			LaunchOfferWall(null, currencyName);
		}

		public void LaunchOfferWall(string credentialsToken, string currencyName)
		{
			try
			{
				plugin.LaunchOfferWall(credentialsToken, currencyName);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}
		
		//VCS
		public void RequestNewCoins ()
		{
			RequestNewCoins(null, null);
		}
		
		public void RequestNewCoins(string currencyName)
		{
			RequestNewCoins(null, currencyName);
		}

		public void RequestNewCoins(string credentialsToken, string currencyName)
		{
			try
			{
				plugin.RequestNewCoins(credentialsToken, currencyName);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}

		public void ShowVCSNotifications(bool showNotification)
		{
			try
			{
				plugin.ShowVCSNotifications (showNotification);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}
		
		public void HandleException (string message)
		{
			OnNativeExceptionReceived (message);
		}

	
		//BrandEngage
		public void RequestBrandEngageOffers(string currencyName, bool queryVCS)
		{
			RequestBrandEngageOffers(null, currencyName, queryVCS);
		}

		public void RequestBrandEngageOffers(string credentialsToken, string currencyName, bool queryVCS)
		{
			try
			{
				plugin.RequestBrandEngageOffers(credentialsToken, currencyName, queryVCS);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}
		
		public void StartBrandEngage ()
		{
			try
			{
				plugin.StartBrandEngage ();
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}
		
		public void ShowBrandEngageRewardNotification (bool showNotification)
		{
			try
			{
				plugin.ShowBrandEngageRewardNotification (showNotification);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}

		//Interstitial
		public void RequestInterstitialAds() 
		{
			RequestInterstitialAds(null);
		}

		public void RequestInterstitialAds(string credentialsToken) 
		{
			try
			{
				plugin.RequestInterstitialAds(credentialsToken);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}
		public void ShowInterstitialAd() 
		{
			try
			{
				plugin.ShowInterstitialAd();
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}

		//Logging
		public void EnableLogging(bool shouldEnableLogging)
		{
			try
			{
				plugin.EnableLogging (shouldEnableLogging);
			}
			catch (Exception e)
			{
				HandleException (e.Message);
			}
		}

		// Global Parameters provider
		public void AddParameters (Dictionary<string, string> parameters)
		{
			string json = JsonMapper.ToJson(parameters);
			if(!string.IsNullOrEmpty(json))
			{
				plugin.AddParameters(json);
			}
		}

		public void RemoveAllParameters()
		{
			plugin.RemoveAllParameters();
		}

		// Helper methods
		
		public void HandleOfferWallResultFromSDK(string message)
		{
			OnOfferWallResultReceived (message);
		}
		
		public void HandleCurrencyDeltaOfCoinsMessageFromSDK(string message)
		{
			// Determine whether the request was successful
		
			VCSResponse response = JsonMapper.ToObject<VCSResponse>(message);
			if (response.success)
			{
				OnDeltaOfCoinsReceived (response.transaction.deltaOfCoins, response.transaction.ltid);
			}
			else
			{
				OnDeltaOfCoinsRequestFailed (response.error);
			}
		}

		// Called asynchronously from the SponsorPay SDK when an answer from BrandEngage is received.
		public void HandleBrandEngageStatusMessageFromSDK (string message)
		{
			BrandEngageResponse response = JsonMapper.ToObject<BrandEngageResponse>(message);
			if (response.success)
			{
				OnBrandEngageRequestResponseReceived (response.offersAvailable);
			}
			else
			{
				OnBrandEngageRequestErrorReceived (response.error);
			}
		}
		
		public void HandleBrandEngageResultFromSDK (string message)
		{
			OnBrandEngageResultReceived (message);
		}

		// Called asynchronously from the SponsorPay SDK when an answer from Interstitial is received.
		public void HandleInterstitialStatusMessageFromSDK (string message)
		{
			InterstitialResponse response = JsonMapper.ToObject<InterstitialResponse>(message);
			if (response.success)
			{
				OnInterstitialRequestResponseReceived (response.adsAvailable);
			}
			else
			{
				OnInterstitialRequestErrorReceived (response.error);
			}
		}
		
		public void HandleInterstitialResultFromSDK (string message)
		{
			InterstitialAdStatus response = JsonMapper.ToObject<InterstitialAdStatus>(message);
			if (response.success)
			{
				OnInterstitialStatusCloseReceived (response.closeReason);
			}
			else
			{
				OnInterstitialStatusErrorReceived (response.error);
			}
		}

		//Helpers
		private void CheckRequiredParameters (string[] values, string[] names)
		{
			ArrayList list = new ArrayList ();
			for (int i = 0; i < values.Length; i++) {
				string parameter = values [i];
				if (string.IsNullOrEmpty (parameter)) 
					list.Add (names [i]);
			}
			if (list.Count > 0) {
				string missing = string.Join (",", (string[])list.ToArray (Type.GetType ("System.String")));
				throw new System.ArgumentException("Parameter cannot be null:\n" + missing);
			}
		}
		
	}
	
	public class BrandEngageResponse : AbstractResponse
	{
		public string error {get; set;}
		public Boolean offersAvailable {get; set;}
	}
	
	public class InterstitialResponse : AbstractResponse
	{
		public string error {get; set;}
		public Boolean adsAvailable {get; set;}
	}

	public class InterstitialAdStatus : AbstractResponse
	{
		public string error {get; set;}
		public string closeReason {get; set;}
	}

	public class VCSResponse : AbstractResponse
	{
		public RequestError error {get; set;}
		public DeltaOfCoins transaction {get; set;}
	}
	
	public class DeltaOfCoins
	{
		public string ltid {get; set;}
		public double deltaOfCoins {get; set;}
	}
	
	public class RequestError
	{
		public string Type { get; set; }
		public string Code { get; set; }
		public string Message { get; set; }
	}
	
	public class AbstractResponse
	{
		public Boolean success {get; set;}
	}
}

