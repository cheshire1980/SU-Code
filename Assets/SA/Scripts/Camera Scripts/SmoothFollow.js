/*
This camera smoothes out rotation around the y-axis and height.
Horizontal Distance to the target is always fixed.

There are many different ways to smooth the rotation but doing it this way gives you a lot of control over how the camera behaves.

For every of those smoothed values we calculate the wanted value and the current value.
Then we smooth it using the Lerp function.
Then we apply the smoothed values to the transform's position.
*/

// The target we are following
static var target : Transform;
// The distance in the x-z plane to the target
var distance = 10.0;
// the height we want the camera to be above the target
public var height = 5.0;
public var wide = 5.0;
// How much we 
var heightDamping = 2.0;
var rotationDamping = 3.0;
var rotateSpeed = 2.0;
var mouseclicktrigger = false;

// Place the script in the Camera-Control group in the component menu
@script AddComponentMenu("Camera-Control/Smooth Follow")

function Update() {


}

function LateUpdate () {

	if (Input.GetAxis("Mouse ScrollWheel") < 0)
		if (distance <= 20)
			distance++;
	if (Input.GetAxis("Mouse ScrollWheel") > 0)
		if (distance > 0)
			distance--;

	if(Input.GetMouseButton(0))
	{
		/*
		if (Input.GetAxis("Mouse Y") < 0)
		{
			if (height < 21)
			height = height + 0.2;
		}
		
		if (Input.GetAxis("Mouse Y") > 0)
		{
			if (height > 0.20)
			height = height - 0.2;
		}*/

/*		if (Input.GetAxis("Mouse X") < 0)
		{
			//if (height < 21)
			wide = wide + 0.2;
		}
		
		if (Input.GetAxis("Mouse X") > 0)
		{
			//if (height > 0.20)
			wide = wide - 0.2;
		}*/
		
		//if (Input.GetAxis("Mouse X") < 0)
		//{
			//wide = wide - 0.20;
			//transform.Rotate(0, Input.GetAxis ("Mouse X") * rotateSpeed, 0);
			//transform.LookAt (target);
			mouseclicktrigger = true;
		//}
		
		//if (Input.GetAxis("Mouse X") > 0)
		//{
			//wide = wide + 0.20;
			//transform.Rotate(0, Input.GetAxis ("Mouse X") * rotateSpeed, 0);
		//}
	}
	if (Input.GetMouseButtonUp(0))
		mouseclicktrigger = false;
	
	// Early out if we don't have a target
	if (!target)
		return;
	
	// Calculate the current rotation angles
	var wantedRotationAngle = target.eulerAngles.y;
	var wantedRotationAngleW = target.eulerAngles.x;
	
	var wantedHeight = target.position.y + height;
	var wantedWide = target.position.x + wide;
		
	var currentRotationAngle = transform.eulerAngles.y;
	var currentHeight = transform.position.y;
	var currentRotationAngleW = transform.eulerAngles.x;
	var currentWide = transform.position.x;
		
	// Damp the rotation around the y-axis
	currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);
	currentRotationAngleW = Mathf.LerpAngle (currentRotationAngleW, wantedRotationAngleW, rotationDamping * Time.deltaTime);

	// Damp the height
	currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);
	currentWide = Mathf.Lerp (currentWide, wantedWide, heightDamping * Time.deltaTime);

	// Convert the angle into a rotation
	var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
	
	// Set the position of the camera on the x-z plane to:
	// distance meters behind the target
	transform.position = target.position;
	transform.position -= currentRotation * Vector3.forward * distance;	
	transform.rotation= currentRotation ;

	// Set the height of the camera
	transform.position.y = currentHeight;
	// Always look at the target
	transform.LookAt (target);

}