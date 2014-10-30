using System;

namespace SponsorPay
{

	public interface ISponsorPayPlugin
	{
		
		// Start method
		string Start(string appId, string userId, string securityToken);
		
		//Rewarded actions
		//void ReportActionCompletion(string actionId);
		void ReportActionCompletion(string credentialsToken, string actionId);
		
		//OFW
//		void LaunchOfferWall(string currencyName);
		void LaunchOfferWall(string credentialsToken, string currencyName);
		
		//VCS
//		void RequestNewCoins();
    
//   		void RequestNewCoins(string currencyName);
		void RequestNewCoins(string credentialsToken, string currencyName);
		
		void ShowVCSNotifications (bool showNotification);
		
		//MBE
//		void RequestBrandEngageOffers(string currencyName, bool queryVCS);
		void RequestBrandEngageOffers(string credentialsToken, string currencyName, bool queryVCS);
		
		void StartBrandEngage();
		
		void ShowBrandEngageRewardNotification(bool showNotification);

		//Interstitial
//		void RequestInterstitialAds();
		void RequestInterstitialAds(string credentialsToken);

		void ShowInterstitialAd();

		//Logging
		void EnableLogging(bool shouldEnableLogging);

		//Global parameter provider
		void AddParameters(string json);
		void RemoveAllParameters();

	}
	
}

