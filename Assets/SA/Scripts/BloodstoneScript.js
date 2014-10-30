#pragma strict

var Notification : AudioClip;
var bsNotification : Transform;

var amount : int;

var dragName : String;

var tagged : boolean;
var autotagged : boolean;

var newAmount : int;

var playNotification : boolean;

var i : int;

function Start () {

}

function Update () {

	if (dragName == null)
	{
		transform.Rotate(0,Time.fixedDeltaTime*40,0);
		Destroy(gameObject,60);
	}
	
	else if (dragName == "")
	{
		transform.Rotate(0,Time.fixedDeltaTime*40,0);
		Destroy(gameObject,60);
	}
	
	else
	{
		if (dragName == HUD.usrAccount)
		{
			i = i + 2;
			gameObject.transform.LookAt(GameObject.Find(HUD.usrAccount).transform.position);
			gameObject.transform.position += gameObject.transform.forward * Time.fixedDeltaTime * i;
			
			if (Vector3.Distance(gameObject.transform.position,GameObject.Find(HUD.usrAccount).transform.position) <= 1)
			{
				if (playNotification == false)
				{
					//AudioSource.PlayClipAtPoint(Notification, GameObject.Find(HUD.usrAccount).transform.position);
					playNotification = true;
				}

				Destroy(gameObject);
				HUD.usrBloodstone = newAmount;
				var bsNot = Instantiate(bsNotification, Vector3(0,0,0), Quaternion.identity);
				bsNot.transform.parent = GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/").transform;
				bsNot.transform.localScale = Vector3(1,1,1);
				bsNot.GetComponent(NotificationTextType).bloodstone = amount.ToString();
				bsNot.active = true;
			}
		}
		
		else
		{
			if (amount != 0)
			{
				/*
				i = i + 2;
				gameObject.transform.LookAt(GameObject.Find(dragName).transform.position);
				gameObject.transform.position += gameObject.transform.forward * Time.fixedDeltaTime * i;
				
				if (Vector3.Distance(gameObject.transform.position,GameObject.Find(dragName).transform.position) <= 1)
					Destroy(gameObject);
				*/
				Destroy(gameObject);
			}
		}
	}
}