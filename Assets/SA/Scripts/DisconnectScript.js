#pragma strict

function cancelDisco ()
{
	GameObject.Find("UI Root/UI_Disco/Disco").SetActive(false);
}

function proceedDisco ()
{
	GameObject.Find("UI Root/UI_Disco/Disco").SetActive(false);
	PhotonNetwork.Disconnect();
	Network.Disconnect();
}