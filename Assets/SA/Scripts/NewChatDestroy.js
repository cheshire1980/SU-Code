#pragma strict

function Start ()
{
	waitTime();
}

function waitTime ()
{
	yield WaitForSeconds (60.0);
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;

	GameObject.Destroy(gameObject);
	
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll").GetComponent(UIScrollView).ResetPosition();
	GameObject.Find("UI Root/UI_ChatAnchor/UI_Chat/Scroll/Grid").GetComponent(UITable).repositionNow = true;
}