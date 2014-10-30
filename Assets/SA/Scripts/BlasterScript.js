#pragma strict

static var lifeTime = 0.5;//0.3;
var power : float = 1;
var pvp = 0;
static var lifeCounter : float;
static var slifeCounter : float;
var blaster : AudioClip;
var sentryBlaster : boolean = false;

function Awake()
{
	//renderer.material.color = Color.cyan;
	AudioSource.PlayClipAtPoint(blaster, transform.position);
	
	Destroy (gameObject, lifeTime);
	//gameObject.
	
	//Debug.Log(Time.time);
	//slifeCounter = Time.time;
}

function OnTriggerEnter(obj:Collider)
{
	if (networkView != null)
	{
		if (networkView.isMine)
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
							GameObject.Destroy(gameObject);
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