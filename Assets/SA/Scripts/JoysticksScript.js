#pragma strict

function Start () {

}

function Update () {

}

function Awake ()
{
	if (1 == 1)
		if (GameObject.Find("Dual Joysticks/LeftJoystick") != null)
			gameObject.GetComponent(MoveAround).ljoy = GameObject.Find("Dual Joysticks/LeftJoystick").GetComponent(Joystick);
	//gameObject.GetComponent(MoveAround).rjoy = GameObject.Find("Dual Joysticks/RightJoystick").GetComponent(Joystick);
	//gameObject.GetComponent(MoveAround).fjoy = GameObject.Find("Dual Joysticks/ForwardJoystick").GetComponent(Joystick);
	//gameObject.GetComponent(MoveAround).sjoy = GameObject.Find("Dual Joysticks/SlowJoystick").GetComponent(Joystick);
}