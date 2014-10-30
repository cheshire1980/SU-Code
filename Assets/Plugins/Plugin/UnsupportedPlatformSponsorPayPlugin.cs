using System;
using System.Diagnostics;

namespace SponsorPay
{
	public class UnsupportedPlatformSponsorPayPlugin : ISponsorPayPlugin
	{

		public UnsupportedPlatformSponsorPayPlugin()
		{
			UnityEngine.Debug.Log( "WARNING: SponsorPay plugin is not available on this platform." );
		}

		public string Start(string appId, string userId, string securityToken)
		{
			printWarningMessage();
			return "NOT A VALID TOKEN";
		}
		
		public void ReportActionCompletion(string credentialsToken, string actionId) 
		{
			printWarningMessage();
		}
		
		public void LaunchOfferWall(string credentialsToken, string currencyName)
		{
			printWarningMessage();
		}

		public void RequestNewCoins(string credentialsToken, string currencyName)
		{
			printWarningMessage();
		}
    
		public void ShowVCSNotifications(bool showNotification)
		{
			printWarningMessage();
		}

		// BrandEngage
		public void RequestBrandEngageOffers(string credentialsToken, string currencyName, bool queryVCS)
		{
			printWarningMessage();
		}
		
		public void StartBrandEngage()
		{
			printWarningMessage();
		}
		
		public void ShowBrandEngageRewardNotification(bool showNotification)
		{
			printWarningMessage();
		}

		//Interstitial
		public void RequestInterstitialAds(string credentialsToken) 
		{
			printWarningMessage();
		}

		public void ShowInterstitialAd() 
		{
			printWarningMessage();
		}
		
		//Logging
		public void EnableLogging(bool shouldEnableLogging)
		{
			printWarningMessage();
		}

		//Global parameter provider
		public void AddParameters(string json)
		{
			printWarningMessage();
		}
		
		public void RemoveAllParameters()
		{
			printWarningMessage();
		}

		//Helper methods
		private void printWarningMessage()
		{
			UnityEngine.Debug.Log( "WARNING: SponsorPay plugin is not available on this platform." );
			UnityEngine.Debug.Log( "WARNING: the \"" + GetMethodName() + "\" method does not do anything" );
		}

		private string GetMethodName()
		{
		    StackTrace st = new StackTrace ();
		    StackFrame sf = st.GetFrame (2);
		
		    return sf.GetMethod().Name;
		}
		
	}

}


