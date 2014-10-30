using UnityEngine;
using System.Collections;


public class Billing : MonoBehaviour {

	// Public vars
	AndroidInAppPurchaseManager sunfolding = new AndroidInAppPurchaseManager();
	//BillingResult billing = new BillingResult();

	// Use this for initialization
	void Start () {

		//billing = new BillingResult ();

		//sunfolding.loadStore();
		if (gameObject.name == "Main Camera") {
			AndroidInAppPurchaseManager.instance.addEventListener (AndroidInAppPurchaseManager.ON_PRODUCT_PURCHASED, OnProductPurchased);
			AndroidInAppPurchaseManager.instance.addEventListener (AndroidInAppPurchaseManager.ON_PRODUCT_CONSUMED, OnProductConsumed);
			AndroidInAppPurchaseManager.instance.addEventListener (AndroidInAppPurchaseManager.ON_BILLING_SETUP_FINISHED, OnBillingConnected);

			AndroidInAppPurchaseManager.instance.loadStore ("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtZTmx4kyqCStw5hT03/QF7g4UeRlpUh8yqiY3sNs8k51ORYz6IjsNhUPhhxXXZBcOt1XS1BsW0Hhu7KdDgnPkIY0jQAaPXQ/T0fsbWaaX9Jk1bVSAtj3GTaGzHmcoz1vic5YYScNxqfDU4p1ZPE66Sxnu5iqlm6DIAyTZXWURZFeIpe4TnjcBB9koKr7CVeOv1D0Nrax3B/6jsFuRZ6ZprGpuQrCHfzPpEg3uNaKImHc3CPn2JrmiKxe9tcNHlscMWgwQR2YNDAMnaJWxO4tJaZ/3EfZJUWLMY75JvnvH81EDtdPNv/s1GARgoDcxFaDlFuI7Gubq+hUQk/SD1PKeQIDAQAB");
			Debug.Log ("TESTING LOADING CODE");
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void launch50Purchase () {

		if (AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased ("50_pack")) {
						AndroidInAppPurchaseManager.instance.consume ("50_pack");
		}
		else {
						//AndroidInAppPurchaseManager.instance.consume ("android.test.purchased subs");
						AndroidInAppPurchaseManager.instance.purchase ("50_pack");
		}

		//sunfolding.purchase ("50_pack");
	}

	public void launch100Purchase () {
		
		if (AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased ("100_pack")) {
			AndroidInAppPurchaseManager.instance.consume ("100_pack");
		}
		else {
			//AndroidInAppPurchaseManager.instance.consume ("android.test.purchased subs");
			AndroidInAppPurchaseManager.instance.purchase ("100_pack");
		}
		
		//sunfolding.purchase ("50_pack");
	}
	public void launch200Purchase () {
		
		if (AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased ("200_pack")) {
			AndroidInAppPurchaseManager.instance.consume ("200_pack");
		}
		else {
			//AndroidInAppPurchaseManager.instance.consume ("android.test.purchased subs");
			AndroidInAppPurchaseManager.instance.purchase ("200_pack");
		}
		
		//sunfolding.purchase ("50_pack");
	}
	public void launch500Purchase () {
		
		if (AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased ("500_pack")) {
			AndroidInAppPurchaseManager.instance.consume ("500_pack");
		}
		else {
			//AndroidInAppPurchaseManager.instance.consume ("android.test.purchased subs");
			AndroidInAppPurchaseManager.instance.purchase ("500_pack");
		}
		
		//sunfolding.purchase ("50_pack");
	}

	
	
	
	private static void OnRetriveProductsFinised(CEvent e) {
		BillingResult result = e.data as BillingResult;
		AndroidInAppPurchaseManager.instance.removeEventListener (AndroidInAppPurchaseManager.ON_RETRIEVE_PRODUC_FINISHED, OnRetriveProductsFinised);
		
		if(result.isSuccess) {
			
			if (AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased ("50_pack")) {
				AndroidInAppPurchaseManager.instance.consume ("50_pack");
			}
			if (AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased ("100_pack")) {
				AndroidInAppPurchaseManager.instance.consume ("100_pack");
			}
			if (AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased ("200_pack")) {
				AndroidInAppPurchaseManager.instance.consume ("200_pack");
			}
			if (AndroidInAppPurchaseManager.instance.inventory.IsProductPurchased ("500_pack")) {
				AndroidInAppPurchaseManager.instance.consume ("500_pack");
			}

			
			
		} else {
			//AndroidMessage.Create("Connection Responce", result.response.ToString() + " " + result.message);
		}
		
	}

	private static void OnBillingConnected(CEvent e) {
		BillingResult result = e.data as BillingResult;
		AndroidInAppPurchaseManager.instance.removeEventListener (AndroidInAppPurchaseManager.ON_BILLING_SETUP_FINISHED, OnBillingConnected);
		
		
		if(result.isSuccess) {
			//Store connection is Successful. Next we loading product and customer purchasing details
			AndroidInAppPurchaseManager.instance.addEventListener (AndroidInAppPurchaseManager.ON_RETRIEVE_PRODUC_FINISHED, OnRetriveProductsFinised);
			AndroidInAppPurchaseManager.instance.retrieveProducDetails();
			
		} 
		
		//AndroidMessage.Create("Connection Responce", result.response.ToString() + " " + result.message);
		//Debug.Log ("Connection Responce: " + result.response.ToString() + " " + result.message);
	}
	
	private static void OnProductPurchased(CEvent e) {
		BillingResult result = e.data as BillingResult;
		
		
		if(result.isSuccess) {
			//AndroidMessage.Create ("Product Purchased", result.purchase.SKU);

			checkUpdate(result.purchase.SKU);
			//OnProcessingPurchasedProduct (result.purchase);
		} else {
			//AndroidMessage.Create("Product Purchase Failed", result.response.ToString() + " " + result.message);
		}
		
		//Debug.Log ("Purchased Responce: " + result.response.ToString() + " " + result.message);
		//Debug.Log (result.purchase.originalJson);
	}

	private static void OnProductConsumed(CEvent e) {
		BillingResult result = e.data as BillingResult;
		
		if(result.isSuccess) {
			AndroidInAppPurchaseManager.instance.addEventListener (AndroidInAppPurchaseManager.ON_RETRIEVE_PRODUC_FINISHED, OnRetriveProductsFinised);
			AndroidInAppPurchaseManager.instance.retrieveProducDetails();

			//AndroidMessage.Create ("Product Consumed", result.purchase.SKU);
			//-----OnProcessingConsumeProduct (result.purchase);
		} else {
			//AndroidMessage.Create("Product Cousume Failed", result.response.ToString() + " " + result.message);
		}
		
		//Debug.Log ("Cousume Responce: " + result.response.ToString() + " " + result.message);
	}

	public static void checkUpdate (string farts)
	{
		if (farts  == "50_pack") {
			AndroidInAppPurchaseManager.instance.consume ("50_pack");
			Camera.main.networkView.RPC ("PurchaseRequest",RPCMode.Server, "50_pack");
		}
		if (farts == "100_pack") {
			AndroidInAppPurchaseManager.instance.consume ("100_pack");
			Camera.main.networkView.RPC ("PurchaseRequest",RPCMode.Server, "100_pack");
		}
		if (farts == "200_pack") {
			AndroidInAppPurchaseManager.instance.consume ("200_pack");
			Camera.main.networkView.RPC ("PurchaseRequest",RPCMode.Server, "200_pack");
		}
		if (farts == "500_pack") {
			AndroidInAppPurchaseManager.instance.consume ("500_pack");
			Camera.main.networkView.RPC ("PurchaseRequest",RPCMode.Server, "500_pack");
		}
	}
}
