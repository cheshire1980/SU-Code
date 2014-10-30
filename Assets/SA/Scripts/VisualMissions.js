#pragma strict

var vMissionsTemplate : Transform;
	
	
function Start ()
{
	
	var vMissions : Transform;
	
	//if (HUD.usrsmComplete >= 0)
	//{
	
	for (var i = 0; i <= StoryQuests.total; i++)
	{
		vMissions = Instantiate(vMissionsTemplate,Vector3(0,0,0),Quaternion.identity);
		vMissions.transform.parent = gameObject.transform;
		vMissions.transform.localScale = Vector3(1,1,1);
		vMissions.name = i.ToString();
	}
	//}
	
	transform.GetComponent(UIGrid).Reposition();
}

/*function OnGUI()
{

	if (gameObject.transform.childCount > 0)
	{
		Debug.Log(gameObject.transform.childCount);
		GUI.Label(Rect(Screen.width - 90,100,100,100),"New Missions!");
				//if (GUI.Button(Rect(Screen.width - 90, 10, 80, 80),mMissions,""))
	}

}*/