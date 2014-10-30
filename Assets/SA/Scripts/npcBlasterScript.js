#pragma strict

var lifeTime = 1.0;
var power : float = 1;
var pvp = 0;
var blaster : AudioClip;

function Awake()
{
	//renderer.material.color = Color.magenta;
	AudioSource.PlayClipAtPoint(blaster, transform.position);
	
	Destroy (gameObject, lifeTime);
}