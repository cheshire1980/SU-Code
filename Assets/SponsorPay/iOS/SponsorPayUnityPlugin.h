#import "SponsorPaySDK.h"
#import "SPURLParametersProvider.h"
#import "SPSystemLogger.h"
#import "SPInterstitialClient.h"

@interface SPUnityPluginParametersProvider : NSObject <SPURLParametersProvider>

@property (readonly) NSDictionary *pluginParameters;
@property (retain) NSString *pluginVersion;

@end

@interface SPUnityOfferWallDelegate : NSObject <SPOfferWallViewControllerDelegate>
 @property (retain) SPOfferWallViewController *offerWallVC;
 @property (readonly) BOOL isWaiting;

 + (SPUnityOfferWallDelegate *)instance;
@end

@interface SPUnityVCSDelegate : NSObject <SPVirtualCurrencyConnectionDelegate>
 + (SPUnityVCSDelegate *)instance;
@end

@interface SPUnityMBEDelegate : NSObject <SPBrandEngageClientDelegate>

@property (assign) BOOL shouldQueryVCS;
@property (copy) NSString *mbeToken;
 + (SPUnityMBEDelegate *)instance;
@end

@interface SPUnityInterstitialDelegate : NSObject <SPInterstitialClientDelegate>
 + (SPUnityInterstitialDelegate *)instance;
@end

@interface SPPluginParametersProvider : NSObject <SPURLParametersProvider>

@property (retain) NSDictionary *pluginParameters;

-(void)addParameters:(NSString*)json;

@end

void _SPSetCallbackGameObjectName(const char* name);

void _SPSetPluginVersion(const char* pluginVersion);

const char* _SPStartSDK(const char* appId, const char* userId, const char*secretToken);

void _SPLaunchOfferWall(const char* credentialsToken, const char* currencyName);

void _SPSetShouldShowNotificationOnVCSCoins(int should);

void _SPSendDeltaOfCoinsRequest(const char* credentialsToken);

void _SPRequestBrandEngageOffers(const char* credentialsToken, const char* currencyName, int queryVCS);

void _SPStartBrandEngage();

void _SPSetShouldShowBrandEngageRewardNotification(int should);

void _SPReportActionCompletion(const char* credentialsToken, const char* name);

void _SPEnableLogging(int should);

void _SPRequestIntersitialAds(const char* credentialsToken);

void _SPShowInterstitialAd();

void _SPAddParamters(const char* json);

void _SPClearParameters();
