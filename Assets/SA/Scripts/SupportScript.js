#pragma strict

function supportTicket ()
{
	if (Application.isWebPlayer)
		Application.ExternalEval("window.open('http://iniquitygames.com/osticket/open.php')");
	else
		Application.OpenURL("http://iniquitygames.com/osticket/open.php");
}

function supportForums ()
{
	if (Application.isWebPlayer)
		Application.ExternalEval("window.open('http://forum.spaceunfolding.com')");
	else
		Application.OpenURL("http://forum.spaceunfolding.com");
}