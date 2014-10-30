using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;

namespace SponsorPay
{
	
#if UNITY_IPHONE
	public class IOSSponsorPayPlugin : ISponsorPayPlugin
	{
		[DllImport ("__Internal")]
		public static extern void _SPSetCallbackGameObjectName(string name);

		[DllImport ("__Internal")]
		private static extern void _SPSetPluginVersion(string pluginVersion);

		[DllImport ("__Internal")]
		public static extern string _SPStartSDK(string appId, string userId, string secretToken);

		[DllImport ("__Internal")]
		public static extern void _SPLaunchOfferWall(string credentialsToken, string currencyName);

		[DllImport ("__Internal")]
		public static extern void _SPSendDeltaOfCoinsRequest(string credentialsToken); 

		[DllImport ("__Internal")]
	 	public static extern void _SPSetShouldShowNotificationOnVCSCoins(int should);

		[DllImport ("__Internal")]
		public static extern void _SPRequestBrandEngageOffers(string credentialsToken, string currencyName, int queryVCS);

		[DllImport ("__Internal")]
		public static extern void _SPStartBrandEngage();

		[DllImport ("__Internal")]
		public static extern void _SPRequestIntersitialAds(string credentialsToken);

		[DllImport ("__Internal")]
		public static extern void _SPShowInterstitialAd();

		[DllImport ("__Internal")]
		public static extern void _SPSetShouldShowBrandEngageRewardNotification(int should);

		[DllImport ("__Internal")]
		public static extern void _SPReportActionCompletion(string credentialsToken, string actionId);

		[DllImport ("__Internal")]
		public static extern void _SPEnableLogging(int should);

		[DllImport ("__Internal")]
		public static extern void _SPAddParameters(string json);
		
		[DllImport ("__Internal")]
		public static extern void _SPClearParameters();

		public IOSSponsorPayPlugin(string objectGameName)
		{
			_SPSetCallbackGameObjectName(objectGameName);
			_SPSetPluginVersion(SponsorPayPlugin.PluginVersion);
		}

		//Start method
		public string Start(string appId, string userId, string securityToken)
		{
			return _SPStartSDK(appId, userId, securityToken);
		}

		// Rewarded Actions
		public void ReportActionCompletion(string credentialsToken, string actionId)
		{
			_SPReportActionCompletion(credentialsToken, actionId);
		}

		//OFW
		public void LaunchOfferWall(string credentialsToken, string currencyName)
		{
			_SPLaunchOfferWall(credentialsToken, currencyName);
		}

		//VCS
   
		public void RequestNewCoins(string credentialsToken, string currencyName)
		{
			if(string.IsNullOrEmpty(currencyName)) {
				_SPSendDeltaOfCoinsRequest(credentialsToken);
			} else {
				throw new System.InvalidOperationException("This method is not supported on this platform");
			}
		}
			
		public void ShowVCSNotifications(bool showNotification)
		{
			_SPSetShouldShowNotificationOnVCSCoins(showNotification ? 1 : 0);
		}

		//BrandEngage
		public void RequestBrandEngageOffers(string credentialsToken, string currencyName, bool queryVCS)
		{
			_SPRequestBrandEngageOffers(credentialsToken, currencyName, queryVCS ? 1 : 0);
		}
		
		public void StartBrandEngage()
		{
			_SPStartBrandEngage();
		}
		
		public void ShowBrandEngageRewardNotification(bool showNotification)
		{
			_SPSetShouldShowBrandEngageRewardNotification(showNotification ? 1: 0);
		}

		//Interstitial
		public void RequestInterstitialAds(string credentialsToken) 
		{
			_SPRequestIntersitialAds(credentialsToken);
		}

		public void ShowInterstitialAd() 
		{
			_SPShowInterstitialAd();
		}
		
		//Logging
		public void EnableLogging(bool shouldEnableLogging)
		{
			_SPEnableLogging(shouldEnableLogging ? 1 : 0);
		}

		//Global parameter provider
		public void AddParameters(string json)
		{
			_SPAddParameters(json);
		}
		
		public void RemoveAllParameters()
		{
			_SPClearParameters();
		}
		
	}
#endif

}