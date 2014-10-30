#pragma strict

static var target : Transform;

static var distance : float = 15.0f;	
static var chaseHeight : float = 3f;
var followDamping : float = 0.3f;
var lookAtDamping : float = 4.0f;	
var freezeKey : KeyCode = KeyCode.None;
	
function Start ()
{
	
}

function FixedUpdate ()
{
	DoCamera();
}

function DoCamera ()
{

	var _lookAt : Quaternion;
	
	if (!Input.GetKey(freezeKey)) {
		if (GameObject.Find("PlayerShip") != null)
		{
			// Smooth lookat interpolation
			_lookAt = target.rotation;
			transform.rotation = Quaternion.Lerp(transform.rotation, _lookAt, Time.deltaTime * lookAtDamping);
			// Smooth follow interpolation
			//transform.position = Vector3.Lerp(transform.position, target.position - target.forward * distance + target.up * chaseHeight, Time.deltaTime * followDamping * 10) ;
			transform.position = Vector3.Lerp(transform.position, target.position - target.forward * distance + target.up * chaseHeight, 1 - Mathf.Exp( -10 * followDamping * Time.deltaTime ) ) ;
		}
	}
}
