////////////////////////////////////////////////////////////////////////////////
//  
// @module Android Native Plugin for Unity3D 
// @author Osipov Stanislav (Stan's Assets) 
// @support stans.assets@gmail.com 
//
////////////////////////////////////////////////////////////////////////////////


 

using UnityEngine;
using System.Collections;

public class PlayServiceExample : AndroidNativeExampleBase {
	
	private int score = 100;


	//example
	//private const string LEADERBOARD_NAME = "leaderboard_easy";
	private const string LEADERBOARD_NAME = "REPLACE_WITH_YOUR_NAME";


	//example
	private const string LEADERBOARD_ID = "CgkIipfs2qcGEAIQAA";
	//private const string LEADERBOARD_ID = "REPLACE_WITH_YOUR_ID";

	public GameObject avatar;
	private Texture defaulttexture;

	public DefaultPreviewButton connectButton;
	public SA_Label playerLabel;

	public DefaultPreviewButton[] ConnectionDependedntButtons;





	void Start() {

		playerLabel.text = "Player Diconnected";
		defaulttexture = avatar.renderer.material.mainTexture;

		//listen for GooglePlayConnection events
		GooglePlayConnection.instance.addEventListener (GooglePlayConnection.PLAYER_CONNECTED, OnPlayerConnected);
		GooglePlayConnection.instance.addEventListener (GooglePlayConnection.PLAYER_DISCONNECTED, OnPlayerDisconnected);
		GooglePlayConnection.instance.addEventListener(GooglePlayConnection.CONNECTION_RESULT_RECEIVED, OnConnectionResult);


		//listen for GooglePlayManager events
		GooglePlayManager.instance.addEventListener (GooglePlayManager.ACHIEVEMENT_UPDATED, OnAchivmentUpdated);
		GooglePlayManager.instance.addEventListener (GooglePlayManager.SCORE_SUBMITED, OnScoreSubmited);


		if(GooglePlayConnection.state == GPConnectionState.STATE_CONNECTED) {
			//checking if player already connected
			OnPlayerConnected ();
		} 



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


	private void showLeaderBoardsUI() {
		GooglePlayManager.instance.showLeaderBoardsUI ();
		SA_StatusBar.text = "Showing Leader Boards UI";
	}

	private void loadLeaderBoards() {
		GooglePlayManager.instance.addEventListener (GooglePlayManager.LEADERBOARDS_LOEADED, OnLeaderBoardsLoaded);
		GooglePlayManager.instance.loadLeaderBoards ();
		SA_StatusBar.text = "Loading Leader Boards Data...";
	}

	private void showLeaderBoard() {
		GooglePlayManager.instance.showLeaderBoardById (LEADERBOARD_ID);
		SA_StatusBar.text = "Shwoing Leader Board UI for " + LEADERBOARD_ID;
	}

	private void submitScore() {
		score++;
		GooglePlayManager.instance.submitScore (LEADERBOARD_NAME, score);
		SA_StatusBar.text = "Score " + score.ToString() + " Submited for " + LEADERBOARD_NAME;
	}
	



	private void showAchivmentsUI() {
		GooglePlayManager.instance.showAchivmentsUI ();
		SA_StatusBar.text = "Showing Achivments UI";

	}

	private void loadAchievements() {
		GooglePlayManager.instance.addEventListener (GooglePlayManager.ACHIEVEMENTS_LOADED, OnAchivmentsLoaded);
		GooglePlayManager.instance.loadAchievements ();

		SA_StatusBar.text = "Loading Achivments Data...";
	}

	private void reportAchievement() {
		GooglePlayManager.instance.reportAchievement ("achievement_prime");
		SA_StatusBar.text = "Reporting achievement_prime...";
	}

	private void incrementAchievement() {
		GooglePlayManager.instance.incrementAchievement ("achievement_bored", 1);
		SA_StatusBar.text = "Incrementing achievement_bored...";
	}


	private void revealAchievement() {
		GooglePlayManager.instance.revealAchievement ("achievement_humble");
		SA_StatusBar.text = "Revealing achievement_humble...";
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

	private void OnAchivmentsLoaded(CEvent e) {
		GooglePlayManager.instance.removeEventListener (GooglePlayManager.ACHIEVEMENTS_LOADED, OnAchivmentsLoaded);
		GooglePlayResult result = e.data as GooglePlayResult;
		if(result.isSuccess) {

			foreach(string achievementId in GooglePlayManager.instance.achievements.Keys) {
				GPAchievement achievement = GooglePlayManager.instance.GetAchievementd(achievementId);
				Debug.Log(achievement.id);
				Debug.Log(achievement.name);
				Debug.Log(achievement.description);
				Debug.Log(achievement.type);
				Debug.Log(achievement.state);
				Debug.Log(achievement.currentSteps);
				Debug.Log(achievement.totalSteps);
			}

			SA_StatusBar.text = "Total Achivments: " + GooglePlayManager.instance.achievements.Count.ToString();
			AndroidNative.showMessage ("Achievments Loaded", "Total Achivments: " + GooglePlayManager.instance.achievements.Count.ToString());
		} else {
			SA_StatusBar.text = result.message;
			AndroidNative.showMessage ("Achievments Loaded error: ", result.message);
		}

	}

	private void OnAchivmentUpdated(CEvent e) {
		GooglePlayResult result = e.data as GooglePlayResult;
		SA_StatusBar.text = "Achievment Updated: Id: " + result.achievementId + "\n status: " + result.message;
		AndroidNative.showMessage ("Achievment Updated ", "Id: " + result.achievementId + "\n status: " + result.message);
	}


	private void OnLeaderBoardsLoaded(CEvent e) {
		GooglePlayManager.instance.removeEventListener (GooglePlayManager.LEADERBOARDS_LOEADED, OnLeaderBoardsLoaded);

		GooglePlayResult result = e.data as GooglePlayResult;
		if(result.isSuccess) {
			if( GooglePlayManager.instance.GetLeaderBoard(LEADERBOARD_ID) == null) {
				AndroidNative.showMessage("Leader boards loaded", LEADERBOARD_ID + " not found in leader boards list");
				return;
			}


			SA_StatusBar.text = LEADERBOARD_NAME + "  score  " + GooglePlayManager.instance.GetLeaderBoard(LEADERBOARD_ID).GetCurrentPlayerScore(GPBoardTimeSpan.ALL_TIME, GPCollectionType.GLOBAL).score.ToString();
			AndroidNative.showMessage (LEADERBOARD_NAME + "  score",  GooglePlayManager.instance.GetLeaderBoard(LEADERBOARD_ID).GetCurrentPlayerScore(GPBoardTimeSpan.ALL_TIME, GPCollectionType.GLOBAL).score.ToString());
		} else {
			SA_StatusBar.text = result.message;
			AndroidNative.showMessage ("Leader-Boards Loaded error: ", result.message);
		}
	}

	private void OnScoreSubmited(CEvent e) {
		GooglePlayResult result = e.data as GooglePlayResult;
		AndroidNative.showMessage ("Score Submited", result.message);
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


	void OnDestroy() {
		if(!GooglePlayConnection.IsDestroyed) {
			GooglePlayConnection.instance.removeEventListener (GooglePlayConnection.PLAYER_CONNECTED, OnPlayerConnected);
			GooglePlayConnection.instance.removeEventListener (GooglePlayConnection.PLAYER_DISCONNECTED, OnPlayerDisconnected);

		}

		if(!GooglePlayManager.IsDestroyed) {
			GooglePlayManager.instance.removeEventListener (GooglePlayManager.ACHIEVEMENT_UPDATED, OnAchivmentUpdated);
			GooglePlayManager.instance.removeEventListener (GooglePlayManager.SCORE_SUBMITED, OnScoreSubmited);
		}

	}


}
