/*
DeepSpace GUI Demo Script
Author: Ewa Aguero Padilla, based on Necromancer script by Jason Wentzel
avee@muhagames.com
*/

var doWindow0 = true;
var doWindow1 = true;
var doWindow2 = true;


var mySkin : GUISkin;

private var TestBackground = Rect (0, 0, 1300, 700);
private var windowRect0 = Rect (440, 40, 350, 580);		//Standard Components
private var windowRect1 = Rect (840, 40, 360, 480);		//Sliders and Scrollbars
private var windowRect2 = Rect (40, 40, 350, 380);		//Main Window

private var scrollPosition : Vector2;
private var HorizSliderValue = 0.5;
private var VertSliderValue = 0.5;
private var ToggleBTN = false;
private var selGridInt : int = 0;
private var selStrings : String[] = ["Radio Button 1", "Radio Button 2"];

private var TestText ="Lorem Ipsum is simply dummy text of the \nprinting and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, \nwhen an unknown printer took a galley of type \nand scrambled it to make a type specimen book. \nIt has survived not only five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. \nIt was popularised in the 1960s with the release of \nLetraset sheets containing Lorem Ipsum passages, \nand more recently with desktop publishing software like Aldus PageMaker \nincluding versions of Lorem Ipsum.";


function DoMyWindow0 (windowID : int) 
{

		GUILayout.BeginVertical();
		GUILayout.Space(8);
        GUILayout.Label("Standard Label");
		GUILayout.Label("", "Divider");//-------------------------------- custom
		GUILayout.Button("BUTTON");
		GUILayout.Label("", "Divider");//-------------------------------- custom
		ToggleBTN = GUILayout.Toggle(ToggleBTN, "This is a Toggle Button");
		GUILayout.Label("", "Divider");//-------------------------------- custom
		GUILayout.Box("This is a textbox\n this can be expanded\nby using \\n");
		GUILayout.TextField("This is a textfield\n You cant see this text!!");
        GUILayout.TextArea("This is a textArea and can\nhold many lines of text");
        GUILayout.Label ("", "Divider");//-------------------------------- custom
        selGridInt = GUI.SelectionGrid (Rect (45, 460, 280, 70), selGridInt, selStrings, 1, "RadioButton");//-------------------------------- custom
		GUILayout.EndVertical();
		
		// Make the windows be draggable.
		GUI.DragWindow (Rect (0,0,10000,10000));
}


function DoMyWindow1 (windowID : int) 
{

		GUILayout.Space(8);
		GUILayout.BeginVertical();
		GUILayout.BeginHorizontal();
		scrollPosition = GUILayout.BeginScrollView(scrollPosition, true, true);
		GUILayout.Label (TestText, "ScrollText");//-------------------------------- custom
        GUILayout.EndScrollView();
		GUILayout.EndHorizontal();
		GUILayout.Space(8);
		HorizSliderValue = GUILayout.HorizontalSlider(HorizSliderValue, 0.0, 1.1);
		GUILayout.BeginHorizontal();
        VertSliderValue = GUILayout.VerticalSlider(VertSliderValue, 0.0, 1.1, GUILayout.Height(120));
        GUI.Label(new Rect(110, 250, 128, 128), "", "Waiting");//-------------------------------- custom
        GUILayout.EndHorizontal();
        GUILayout.Label ("", "Divider");//-------------------------------- custom
        GUILayout.Space(70);
		GUI.Label(new Rect(50, 400, 256, 32), "", "ProgressBar");//-------------------------------- custom	
		GUI.Label(new Rect(50, 400, 256, 32), "", "ProgressBarBg");//-------------------------------- custom	
		
        GUILayout.EndVertical();
		GUI.DragWindow (Rect (0,0,10000,10000));

}

//bringing it all together
function DoMyWindow2 (windowID : int) 
{
		
		GUILayout.Space(8);
		GUILayout.BeginVertical();
		GUILayout.Label("DeepSpace","BigText");
		GUILayout.Label ("", "Divider");//-------------------------------- custom
		GUILayout.Label ("DeepSpace is a GUI skin for Unity. Cold, elegant design makes it a perfect fit for space-themed games.", "PlainText");//-------------------------------- custom
		GUILayout.Label ("", "Divider");//-------------------------------- custom
		GUILayout.Space(8);
		doWindow0 = GUILayout.Toggle(doWindow0, "Standard Components");
		doWindow1 = GUILayout.Toggle(doWindow1, "Sliders & Scrollbars");
		GUILayout.Space(8);
		GUILayout.Label ("", "Divider");//-------------------------------- custom
        GUILayout.Label ("Please read through the source of this script to see how to use special fonts", "PlainText");//-------------------------------- custom
		GUILayout.BeginHorizontal();
		GUILayout.Label ("like this one.", "BigText");//-------------------------------- custom
		GUILayout.EndHorizontal();		
        GUILayout.EndVertical();
			
		GUI.DragWindow (Rect (0,0,10000,10000));
}

function OnGUI ()
{
GUI.skin = mySkin;

GUI.Label(TestBackground, "", "Background");//-------------------------------- custom

if (doWindow0)
	windowRect0 = GUI.Window (0, windowRect0, DoMyWindow0, "");
	//now adjust to the group. (0,0) is the topleft corner of the group.
	GUI.BeginGroup (Rect (0,0,100,100));
	// End the group we started above. This is very important to remember!
	GUI.EndGroup ();
	

if (doWindow1)
	windowRect1 = GUI.Window (1, windowRect1, DoMyWindow1, "");
	//now adjust to the group. (0,0) is the topleft corner of the group.
	GUI.BeginGroup (Rect (0,0,100,100));
	// End the group we started above. This is very important to remember!
	GUI.EndGroup ();
	
if (doWindow2)
	windowRect2 = GUI.Window (2, windowRect2, DoMyWindow2, "");
	//now adjust to the group. (0,0) is the topleft corner of the group.
	GUI.BeginGroup (Rect (0,0,100,100));
	// End the group we started above. This is very important to remember!
	GUI.EndGroup ();
}