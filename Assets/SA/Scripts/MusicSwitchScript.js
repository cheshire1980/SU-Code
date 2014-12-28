#pragma strict

function Start () {

}

function Update ()
{
	if (GameObject.Find(HUD.usrAccount) != null)
	{
		var playerPOS = GameObject.Find(HUD.usrAccount).transform.position;
		var triniPOS = GameObject.Find("krulspace").transform.position;
		var krulPOS = GameObject.Find("trinispace").transform.position;
		var luntaPOS = GameObject.Find("luntaspace").transform.position;
		
		var triniMusic = GameObject.Find("trinimusic");
		var krulMusic = GameObject.Find("krulmusic");
		var luntaMusic = GameObject.Find("luntamusic");
		
		
		// Raise volume if in the area
		if (Vector3.Distance(playerPOS, triniPOS) < 900)
		{
			triniMusic.GetComponent(AudioSource).audio.volume = 0.015f;
		}
		
		if (Vector3.Distance(playerPOS, krulPOS) < 900)
		{
			krulMusic.GetComponent(AudioSource).audio.volume = 0.020f;
		}
		
		if (Vector3.Distance(playerPOS, luntaPOS) < 900)
		{
			luntaMusic.GetComponent(AudioSource).audio.volume = 0.020f;
		}
		
		
		// Lower volume if not in area
		if (Vector3.Distance(playerPOS, triniPOS) > 900)
		{
			triniMusic.GetComponent(AudioSource).audio.volume = 0.0f;
		}
		
		if (Vector3.Distance(playerPOS, krulPOS) > 900)
		{
			krulMusic.GetComponent(AudioSource).audio.volume = 0.0f;
		}
		
		if (Vector3.Distance(playerPOS, luntaPOS) > 900)
		{
			luntaMusic.GetComponent(AudioSource).audio.volume = 0.0f;
		}
	}
}