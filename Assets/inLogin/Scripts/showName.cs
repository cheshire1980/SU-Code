using UnityEngine;
using System.Collections;

public class showName : MonoBehaviour {

	// Use this for initialization
	void Start () {
		GetComponent<TextMesh>().text = "Welcome, "+global.username;
	}
	

}
