#pragma strict

var upDown : boolean = true; //false == going down		&&		true == going up
static var upDownSpeed = 0.02;
static var origPos : float;

function Start()
{
	origPos = gameObject.transform.position.y;
}

function FixedUpdate()
{

	//Debug.Log(gameObject.transform.position.y);
	gameObject.transform.Rotate(0,Time.fixedDeltaTime*100,0);
	
	gameObject.transform.RotateAround(gameObject.transform.parent.position,Vector3.forward,1);
	
	
	/*if (upDown == true)
	{
		gameObject.transform.position.y += upDownSpeed;
		
		if (gameObject.transform.position.y - origPos >= 2)
			upDown = false;
	}
	
	else if (upDown == false)
	{
		gameObject.transform.position.y -= upDownSpeed;
		
		if (gameObject.transform.position.y - origPos <= 0)
			upDown = true;
	}
	*/
	
	
}