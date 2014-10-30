static var target : Transform;
var distance = 10.0;

var xSpeed = 250.0;
var ySpeed = 120.0;

var yMinLimit = -20;
var yMaxLimit = 80;

var x = 0.0;
var y = 10.0;
var xcopy = Quaternion;

@script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    //y = angles.x;

	// Make the rigid body not change rotation
   	if (rigidbody)
		rigidbody.freezeRotation = true;
	
	//xcopy = GameObject.Find("PlayerShip").transform.rotation;
}

function LateUpdate () {

	if (target) {

		if (Input.GetAxis("Mouse ScrollWheel") < 0)
			if (distance <= 20)
				distance++;
		if (Input.GetAxis("Mouse ScrollWheel") > 0)
			if (distance > 0)
				distance--;

		if(Input.GetMouseButton(0))
		{
	        x += Input.GetAxis("Mouse X") * xSpeed * 0.02;
	        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;
	 	}
	 	else
	 	{
	 		transform.rotation = GameObject.Find("PlayerShip").transform.rotation;
	 		//x = GameObject.Find("PlayerShip").transform.rotation.x;
	 	}
	 	
 		y = ClampAngle(y, yMinLimit, yMaxLimit);
 		       
        var rotation = Quaternion.Euler(y, x, 0);
        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
        
		transform.rotation = rotation;
        transform.position = position;
        transform.rotation = GameObject.Find("PlayerShip").transform.rotation;
	}
}

static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}