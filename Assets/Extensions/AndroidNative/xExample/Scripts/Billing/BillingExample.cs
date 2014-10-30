////////////////////////////////////////////////////////////////////////////////
//  
// @module Android Native Plugin for Unity3D 
// @author Osipov Stanislav (Stan's Assets) 
// @support stans.assets@gmail.com 
//
////////////////////////////////////////////////////////////////////////////////


 

using UnityEngine;
using System.Collections;

public class BillingExample : MonoBehaviour {


	public void init() {
		GPaymnetManagerExample.init ();
	}

	public void SuccsesPurchase() {
		if(GPaymnetManagerExample.isInited) {
			AndroidInAppPurchaseManager.instance.purchase (GPaymnetManagerExample.ANDROID_TEST_PURCHASED);
		} else {
			AndroidMessage.Create("Error", "PaymnetManagerExample not yet inited");
		}
	}


	public void FailPurchase() {
		if(GPaymnetManagerExample.isInited) {
			AndroidInAppPurchaseManager.instance.purchase (GPaymnetManagerExample.ANDROID_TEST_ITEM_UNAVALIABLE);
		} else {
			AndroidMessage.Create("Error", "PaymnetManagerExample not yet inited");
		}
	}


	public void ConsumeProduct() {
		if(GPaymnetManagerExample.isInited) {
			if(AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased(GPaymnetManagerExample.ANDROID_TEST_PURCHASED)) {
				GPaymnetManagerExample.consume (GPaymnetManagerExample.ANDROID_TEST_PURCHASED);
			} else {
				AndroidMessage.Create("Error", "You do not own product to consume it");
			}
			
		} else {
			AndroidMessage.Create("Error", "PaymnetManagerExample not yet inited");
		}
	}
	

}
