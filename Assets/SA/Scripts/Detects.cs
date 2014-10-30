using UnityEngine;
using System.Collections;





public class Detects : MonoBehaviour {

	public bool paused;

	void OnApplicationPause(bool pauseStatus) {
		paused = pauseStatus;

		//networkView.RPC("QuitRequest",RPCMode.Server,HUD.usrAccount);

		if (paused)
		{
			if (trig.Pause == false)
			{
					Network.Disconnect ();
					Application.Quit ();
			}
		}
		else if (paused == false)
		{
			if (trig.Pause == true)
			{
				trig.Pause = false;
			}
		}

	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
