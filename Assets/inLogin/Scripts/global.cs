using UnityEngine;
using System.Collections;

public class global : MonoBehaviour {



	//HASH CODE (just chosse random character)
	public static string gameHashCode = "?Nh365gw6546bh7U?Nugegfy?f4u6erREV4f3#Q#?FG435"; //**********************CHANGE HASHCODE HERE (IMPORTANT: same as your php page)
	
	//GAME VERSION
	public static string gameVersion = "1.0"; //**********************CHANGE GAME VERSION HERE


	//ENTER YOUR PHP FILE URL "LoginRegister.php" (ONLINE)
	public static string URL_loginRegister = "http://yourwebsite.com/LoginRegister.php"; //**********************CHANGE URL HERE

	//ENTER YOUR PHP FILE URL "SetGetVariable.php" (ONLINE)
	public static string URL_GetSetVariable = "http://yourwebsite.com/SetGetVariable.php"; //**********************CHANGE URL HERE




	//STORE PLAYER INFORMATION FOR THIS SESSION
	//you can access with, global.username
	public static string username = "";
	public static string userpassword = "";
	public static float usermoney = 0;
	

	//if you want to set/get the player state
	public static string playerState = "disconnected";  //connected  disconnected  inLobby  etc..



	//FOR PLAYMAKER - DON'T TOUCH
	public static int PM_ConnectionState = 0; //0=nothing  1=success  2=fail
	public static int PM_VariableState = 0; //0=nothing  1=success  2=fail


}
