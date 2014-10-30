#pragma strict

var buyWindow : GameObject;

function Start () {

}

function Update () {

}

function launchVideos ()
{
	Camera.main.GetComponent(Sponsor).launchVideos();
}

function launchOfferWall ()
{
	Camera.main.GetComponent(Sponsor).launchOfferWall();
}

function launchPurchase ()
{
	Camera.main.GetComponent(trig).Pause = true;
}

function purchaseWindow ()
{
	if (buyWindow.active == true)
		buyWindow.SetActive(false);
		
	else if (buyWindow.active == false)
		buyWindow.SetActive(true);
}