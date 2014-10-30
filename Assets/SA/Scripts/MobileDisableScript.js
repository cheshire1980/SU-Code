#pragma strict

function Start ()
{
	if (Application.platform == RuntimePlatform.Android)
		Destroy(gameObject);
}
