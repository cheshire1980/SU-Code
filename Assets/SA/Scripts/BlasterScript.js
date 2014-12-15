#pragma strict

static var lifeTime = 0.5;//0.3;
var power : float = 1;
var pvp = 0;
static var lifeCounter : float;
static var slifeCounter : float;
var blaster : AudioClip;
var sentryBlaster : boolean = false;

var pView : PhotonView;
var lifeTimer : float;
var target : Transform;


function Awake()
{
	//renderer.material.color = Color.cyan;
	AudioSource.PlayClipAtPoint(blaster, transform.position);
	
	
	//PhotonNetwork.Destroy (gameObject, lifeTime);
	//gameObject.
	
	//Debug.Log(Time.time);
	//slifeCounter = Time.time;
}

function Update ()
{
	if (Time.fixedTime - lifeTimer >= lifeTime)
	{
		if (gameObject.GetComponent(PhotonView) != null)
			PhotonNetwork.Destroy (gameObject);
		else
			GameObject.Destroy(gameObject);
	}
}

function Start ()
{
	lifeTimer = Time.fixedTime;
	pView = gameObject.GetComponent(PhotonView);

	//if (pView.isMine)
	//	transform.LookAt(target);
	
	//transform.Rotate(Vector3(0,90,0));
	rigidbody.AddForce(transform.forward * 2000);
	//Destroy(gameObject.GetComponent(PhotonView));
}

function OnTriggerEnter(obj:Collider)
{
	if (pView != null)
	{
		if (pView.isMine)
		{
			if (obj.tag == "op")
			{
				if (HUD.usrPvp == 1)
				{
					if (obj.GetComponent(PlayerMovement).pvp == 1)
					{
						if (sentryBlaster == true)
						{
							Camera.main.GetComponent(HUD).requestPvpDamage(obj.name, power);
							PhotonNetwork.Destroy(gameObject);
						}
					}
				}
			}
		}
	}
}
/*function Update()
{
	lifeCounter = Time.time;
	
	Debug.Log(lifeCounter - slifeCounter);
	if (lifeCounter - slifeCounter >= lifeTime)
	{
		Debug.Log((lifeCounter - slifeCounter) + " / " + lifeTime);
		Destroy(gameObject);
	}
}*/