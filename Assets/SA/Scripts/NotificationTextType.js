#pragma strict
private var letterPause = 0.05;
var sound : AudioClip;

var bloodstone : String = "50";
var load : boolean = false;
var mission : String;

function Update ()
{
	GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/").GetComponent(UIGrid).Reposition();
	
	if (load == false)
	{	
		load = true;
		AudioSource.PlayClipAtPoint(sound, Camera.main.transform.position);
		
		if (gameObject.name == "Mission(Clone)")
			TypeText("Mission Complete!");
			
		else if (gameObject.name == "MissionFail(Clone)")
			TypeText("Mission Failed!");
			
		else if (gameObject.name == "Bloodstone(Clone)")
			TypeText("Received " + bloodstone + " Bloodstone!");
			
		else if (gameObject.name == "missionMessage")
		{
			TypeText(mission);
		}
		
		if (gameObject.name != "missionMessage")	
			gameObject.name = gameObject.name + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9) + Random.Range(0,9);
	}
}

function TypeText (word : String) {
	for (var letter in word.ToCharArray()) {
		if (gameObject.name != "missionMessage")
			GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/" + gameObject.name + "/Label").GetComponent(UILabel).text += letter;
		
		else if (gameObject.name == "missionMessage")
			GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/" + gameObject.name + "/" + gameObject.name).GetComponent(UILabel).text += letter;
		
		yield WaitForSeconds (letterPause);
	}
	
	waitTime();
}

function missionText()
{
	Debug.Log(GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage/missionMessage").GetComponent(UILabel).maxLineCount);
	if (GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage/missionMessage").GetComponent(UILabel).maxLineCount == 500)
		GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage/missionMessage").GetComponent(UILabel).maxLineCount = 5;
	else if (GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage/missionMessage").GetComponent(UILabel).maxLineCount == 5)
		GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/missionMessage/missionMessage").GetComponent(UILabel).maxLineCount = 500;
}

function waitTime()
{
	if (gameObject.name != "missionMessage")
	{
		yield WaitForSeconds (5.0);
		GameObject.Find("UI Root/UI_Notifications/Scroll/Grid/" + gameObject.name + "/Label").GetComponent(UILabel).text = "";
		GameObject.Destroy(gameObject);
	}
}