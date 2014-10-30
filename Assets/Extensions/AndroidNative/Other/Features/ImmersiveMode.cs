using UnityEngine;
using System.Collections;

public class ImmersiveMode : Singleton<ImmersiveMode> {


	void Awake() {
		DontDestroyOnLoad(gameObject);
	}


	public void EnableImmersiveMode()  {
		AndroidNative.enableImmersiveMode();
	}

}
