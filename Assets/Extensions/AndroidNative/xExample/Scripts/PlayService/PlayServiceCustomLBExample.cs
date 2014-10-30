using UnityEngine;
using System.Collections;

public class PlayServiceCustomLBExample : MonoBehaviour {

	//example
	private const string LEADERBOARD_ID = "CgkIipfs2qcGEAIQAA";
	//private const string LEADERBOARD_ID = "REPLACE_WITH_YOUR_ID";


	public GameObject avatar;
	private Texture defaulttexture;
	
	public DefaultPreviewButton connectButton;
	public SA_Label playerLabel;

	public DefaultPreviewButton GlobalLoadButton;
	public DefaultPreviewButton LocalLoadButton;



	public DefaultPreviewButton ShowGlobalButton;
	public DefaultPreviewButton ShowLocalButton;


	public DefaultPreviewButton[] ConnectionDependedntButtons;
	public CustomLeaderboardFiledsHolder[] lines;


	private GPLeaderBoard loadedLeaderBoard = null;
	private GPCollectionType diplayCollection = GPCollectionType.FRIENDS;


	//--------------------------------------
	// INITIALIZATION
	//--------------------------------------

	void Start() {
		
		playerLabel.text = "Player Diconnected";
		defaulttexture = avatar.renderer.material.mainTexture;

		foreach(CustomLeaderboardFiledsHolder line in lines) {
			line.Disable();
		}

		
		//listen for GooglePlayConnection events
		GooglePlayConnection.instance.addEventListener (GooglePlayConnection.PLAYER_CONNECTED, OnPlayerConnected);
		GooglePlayConnection.instance.addEventListener (GooglePlayConnection.PLAYER_DISCONNECTED, OnPlayerDisconnected);
		GooglePlayConnection.instance.addEventListener(GooglePlayConnection.CONNECTION_RESULT_RECEIVED, OnConnectionResult);

		SA_StatusBar.text = "Custom Leader-board example scene loaded";

		GooglePlayManager.instance.addEventListener (GooglePlayManager.SCORE_REQUEST_RECEIVED, OnScoreListLoaded);

		if(GooglePlayConnection.state == GPConnectionState.STATE_CONNECTED) {
			//checking if player already connected
			OnPlayerConnected ();
		} 
		
	}


	
	//--------------------------------------
	// METHODS
	//--------------------------------------


	public void LoadGlobal() {
		GlobalLoadButton.DisabledButton();
		GooglePlayManager.instance.loadTopScores(LEADERBOARD_ID, GPBoardTimeSpan.ALL_TIME, GPCollectionType.GLOBAL, 10);
	
	}

	public void LoadLocal() {
		LocalLoadButton.DisabledButton();
		GooglePlayManager.instance.loadTopScores(LEADERBOARD_ID, GPBoardTimeSpan.ALL_TIME, GPCollectionType.FRIENDS, 10);
	}


	public void SwitchDisplayCollectionToGlobal() {
		diplayCollection = GPCollectionType.GLOBAL;
	}

	public void SwitchDisplayCollectionToLocal() {
		diplayCollection = GPCollectionType.FRIENDS;
	}


	private void ConncetButtonPress() {
		Debug.Log("GooglePlayManager State  -> " + GooglePlayConnection.state.ToString());
		if(GooglePlayConnection.state == GPConnectionState.STATE_CONNECTED) {
			SA_StatusBar.text = "Disconnecting from Play Service...";
			GooglePlayConnection.instance.disconnect ();
		} else {
			SA_StatusBar.text = "Connecting to Play Service...";
			GooglePlayConnection.instance.connect ();
		}
	}


	//--------------------------------------
	// UNITY
	//--------------------------------------

	void Update() {
		

		
		if(loadedLeaderBoard != null) {
			int i = 1;
			foreach(CustomLeaderboardFiledsHolder line in lines) {
				line.Disable();
				GPScore score = loadedLeaderBoard.GetScore(i, GPBoardTimeSpan.ALL_TIME, diplayCollection);
				if(score != null) {
					line.rank.text 			= i.ToString();
					line.score.text 		=  score.score.ToString();
					line.playerId.text 		= score.playerId;

					GooglePlayerTemplate player = GooglePlayManager.instance.GetPlayerById(score.playerId);
					if(player != null) {
						line.playerName.text =  player.name;
						line.avatar.renderer.material.mainTexture = player.icon;
					} else {
						line.playerName.text = "--";
						line.avatar.renderer.material.mainTexture = defaulttexture;
					}
					line.avatar.renderer.enabled = true;

				} else {
					line.Disable();
				}

				i++;
			}
		} else {
			foreach(CustomLeaderboardFiledsHolder line in lines) {
				line.Disable();
			}
		}
		
		
		
	}



	void FixedUpdate() {
		if(GooglePlayConnection.state == GPConnectionState.STATE_CONNECTED) {
			if(GooglePlayManager.instance.player.icon != null) {
				avatar.renderer.material.mainTexture = GooglePlayManager.instance.player.icon;
			}
		}  else {
			avatar.renderer.material.mainTexture = defaulttexture;
		}
		
		
		string title = "Connect";
		if(GooglePlayConnection.state == GPConnectionState.STATE_CONNECTED) {
			title = "Disconnect";
			
			foreach(DefaultPreviewButton btn in ConnectionDependedntButtons) {
				btn.EnabledButton();
			}

			if(diplayCollection == GPCollectionType.FRIENDS) {
				ShowGlobalButton.EnabledButton();
				ShowLocalButton.DisabledButton();
			} else {
				ShowGlobalButton.DisabledButton();
				ShowLocalButton.EnabledButton();
			}
			
		} else {
			foreach(DefaultPreviewButton btn in ConnectionDependedntButtons) {
				btn.DisabledButton();
				
			}
			if(GooglePlayConnection.state == GPConnectionState.STATE_DISCONNECTED || GooglePlayConnection.state == GPConnectionState.STATE_UNCONFIGURED) {
				
				title = "Connect";
			} else {
				title = "Connecting..";
			}
		}
		
		connectButton.text = title;
	}


	//--------------------------------------
	// EVENTS
	//--------------------------------------


	private void OnScoreListLoaded() {
		
		SA_StatusBar.text = "Scores Load Finished";
		
	
		loadedLeaderBoard = GooglePlayManager.instance.GetLeaderBoard(LEADERBOARD_ID);

		
	}


	private void OnPlayerDisconnected() {
		SA_StatusBar.text = "Player Diconnected";
		playerLabel.text = "Player Diconnected";
	}
	
	private void OnPlayerConnected() {
		SA_StatusBar.text = "Player Connected";
		playerLabel.text = GooglePlayManager.instance.player.name;
	}
	
	private void OnConnectionResult(CEvent e) {
		
		GooglePlayConnectionResult result = e.data as GooglePlayConnectionResult;
		SA_StatusBar.text = "ConnectionResul:  " + result.code.ToString();
		Debug.Log(result.code.ToString());
	}
}
