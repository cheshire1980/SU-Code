<?






//CUSTOM STUFF HERE =============================================================

//MYSQL DATABSE PASSWORD IN THIS FILE
include 'SecurityDBsettings.php';   // <-------  PASSWORD / HOST NAME / USER / DATABASE NAME / UNITY HASH CODE / GAME BUILD VERSION  <--------- IN THIS FILE

//END OF YOUR CUSTOM STUFF =======================================================================










// CONNECTIONS =========================================================

//*** note: These variables are declared in the 'SecurityDBsettings.php' file

mysql_connect($host, $user, $password) or die("Cant connect into database");

mysql_select_db($dbname)or die("Cant connect into database");


// =============================================================================

// PROTECT AGAINST SQL INJECTION and CONVERT PASSWORD INTO MD5 formats

function anti_injection_login_senha($sql, $formUse = true)

{

$sql = preg_replace("/(from|select|insert|delete|where|drop table|show tables|,|'|#|\*|--|\\\\)/i","",$sql);

$sql = trim($sql);

$sql = strip_tags($sql);

if(!$formUse || !get_magic_quotes_gpc())

  $sql = addslashes($sql);

  $sql = md5(trim($sql));

return $sql;

}

// THIS ONE IS JUST FOR THE NICKNAME PROTECTION AGAINST SQL INJECTION

function anti_injection_login($sql, $formUse = true)

{

$sql = preg_replace("/(from|select|insert|delete|where|drop table|show tables|,|'|#|\*|--|\\\\)/i","",$sql);

$sql = trim($sql);

$sql = strip_tags($sql);

if(!$formUse || !get_magic_quotes_gpc())

  $sql = addslashes($sql);

return $sql;

}

// =============================================================================








//ALL THE STUFF FROM THE GAME ==============================================

//HASHCODE RECEIVED FROM THE GAME
$unityHash = $_POST["PHP_hash"];

//PLAYER USERNAME
$username = anti_injection_login($_POST["PHP_username"]);  //We use that function to protect against SQL injection

//PLAYER PASSWORD
$password = anti_injection_login_senha($_POST["PHP_password"]); 

//WHAT IS THE VARIABLE (ex: money)
$formVariable = $_POST["PHP_variable"];

//WHAT IS THE VARIABLE (ex: money)
$formVariableValue = $_POST["PHP_varValue"];

//WHAT IS THE VARIABLE (ex: money)
$formAction = $_POST["PHP_action"];




/*
You can also use this, but this is not safe
$nick = $_POST["PHP_username"];
$pass = $_POST["PHP_password"];
*/




//IF WE DON'T HAVE A PASSWORD OR A USERNAME
if(!$username || !$password) {

	//TELL THAT WE NEED A USERNAME AND A PASSWORD TO CONNECT
    echo "Login or password cant be empty.";
	
} else {

	//VERIFY THE HASHCODE FROM THE GAME AND THE WEB HASHCODE
    if ($unityHash != $phpHash){

		//TELL THAT THE HASHCODE FROM UNITY IS NOT AS THIS PAGE
        echo "HASH code is diferent from the Game.";

    } else {
	
	
	
	
	
		//VERIFY IF WE WANT/SET A VARIABLE
		if(!$formVariable) {
			//STOP THE PHP SCRIPT
			return; 
		}


		
	
		
		
		//SET VARIABLE ---------------------------------------------------------------------------------------------------------
		if($formAction == "SetVariable") {
		
			//VERIFY IF WE HAVE A VALUE
			if(!$formVariableValue) {
				//STOP THE PHP SCRIPT
				return; 
			}

			//VERIFY IF THE USERNAME ALREADY EXIST
			$SQL = "SELECT * FROM Accounts WHERE username = '" . $username . "'";
			
			//GIVE THE RESULT
			$result_id = @mysql_query($SQL) or die("DATABASE ERROR!");
			$total = mysql_num_rows($result_id);

			
			if($total) {

				$datas = @mysql_fetch_array($result_id);

				//COMPARE PASSWORD 
				if(!strcmp($password, $datas["password"])) {

					
					
					$SQLupdate = "UPDATE Accounts SET money='" . $formVariableValue . "' WHERE username = '" . $username . "'";
					$result_update = @mysql_query($SQLupdate) or die("DATABASE ERROR SET MONEY!");
					
					echo $formVariableValue;
					return;
					
					

				} else {
					
					//TELL TO THE GAME THAT THE USERNAME OR THE PASSWORD IS WRONG
					echo "Nick or password is wrong.";
				}

			} else {

				echo "ERROR!";
				//return;
				
			}
		
		} //END OF LOGIN ACTION
		
		
		
		
		
		
		
		//REGISTER ---------------------------------------------------------------------------------------------------------
		if($formAction == "GetVariable") {

			//VERIFY IF THE USERNAME ALREADY EXIST
			$SQL = "SELECT * FROM Accounts WHERE username = '" . $username . "' AND password = '" . $password . "'";
			
			//GIVE THE RESULT
			$result_id = @mysql_query($SQL) or die("DATABASE ERROR GET RESULT!");
			$total = mysql_num_rows($result_id);

			
			if($total) {
			
				$datas = @mysql_fetch_array($result_id);
			
				//RETURN OUR VARIABLE
				echo $datas[$formVariable];
				return;

			
			} else {
				
				echo "ERROR!";
				return;

			}
		
		} //END OF REGISTER ACTION
		
		
		
		
    }
} 

//CLOSE mySQL CONNECTION
mysql_close();

//END OF PAGE
?>