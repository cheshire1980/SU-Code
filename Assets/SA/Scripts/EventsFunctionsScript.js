#pragma strict

function requestStartSE ()
{
	Camera.main.GetComponent(EventsScript).requestStartSE();
}

function closeWindow ()
{
	Camera.main.GetComponent(EventsScript).seventWindow.SetActive(false);
}