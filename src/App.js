import React, { Component, useState } from "react";
import classes from "./App.module.css";
import MultiPlayer from "./components/MultiPlayer";
import PlayButton from "./components/PlayButton";
import StopButton from "./components/StopButton";
import RecordButton from "./components/RecordButton";
import SessionButton from "./components/SessionButton";
import Background from "./assets/background.png";

function App() {
  const [playIsOn, setPlayIsOn] = useState(false);
  const [recordIsOn, setRecordIsOn] = useState(false);
  const [sessionIsOn, setSessionIsOn] = useState(false);
  const [showSession, setShowSession] = useState(false);
  const [recordExist, setRecordExist] = useState(false);

  const playMusicHandler = () => {
    setPlayIsOn(true);
  };

  const stopMusicHandler = () => {
    setPlayIsOn(false);
  };

  const showPlaySessionHandler = () => {
    setRecordIsOn(true);
  };

  const hidePlaySessionHandler = () => {
    {
      !showSession && showSessionButton();
    }
    setRecordExist(true);
    setRecordIsOn(false);
  };

  const playSessionHandler = () => {
    setSessionIsOn(true);
  };

  const stopSessionHandler = () => {
    setSessionIsOn(false);
  };

  const showSessionButton = () => {
    setShowSession(true);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className={classes.title}>Music Player</h1>
      <div>
        <div className={classes.header}>
          <PlayButton
            name="play"
            state={playIsOn}
            sessionState={sessionIsOn}
            onClick={playMusicHandler}
          />
          <StopButton
            name="stop"
            state={playIsOn}
            sessionState={sessionIsOn}
            onClick={stopMusicHandler}
          />
        </div>
        <div className={classes.header}>
          <RecordButton
            name="record"
            state={recordIsOn}
            playState={playIsOn}
            sessionState={sessionIsOn}
            onShowSession={showPlaySessionHandler}
            onHideSession={hidePlaySessionHandler}
          />
          {showSession && (
            <SessionButton
              name="session"
              state={sessionIsOn}
              playState={playIsOn}
              recordState={recordIsOn}
              recordExist={recordExist}
              onPlaySession={playSessionHandler}
              onStopSession={stopSessionHandler}
            />
          )}
        </div>
      </div>
      <MultiPlayer
        playIsOn={playIsOn}
        recordIsOn={recordIsOn}
        sessionIsOn={sessionIsOn}
        recordExist={recordExist}
        urls={[
          //"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          //"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          //"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/SilentStar_120_Em_OrganSynth.mp3?alt=media&token=33ab3637-ac35-4926-9470-8fd47b6ced7d",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/electric%20guitar%20coutry%20slide%20120bpm%20-%20B.mp3?alt=media&token=9d453b70-c000-46d6-a69f-f2865db4c7bb",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/PAS3GROOVE1.03B.mp3?alt=media&token=cbbb15fd-d0ee-4a68-bf11-448fc9b4f3e9",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/MazePolitics_120_Perc.mp3?alt=media&token=66f05452-0ce9-4ec4-a439-d150fc4f7685",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/GrooveB_120bpm_Tanggu.mp3?alt=media&token=29127b07-390d-49ba-817e-dc99e03fdd5e",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/FUD_120_StompySlosh.mp3?alt=media&token=412b750c-82f2-4611-abed-01fade007f9b",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/Bass%20Warwick%20heavy%20funk%20groove%20on%20E%20120%20BPM.mp3?alt=media&token=33e94afc-b3a7-428a-acc2-f302f3662dfb",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/120_stutter_breakbeats_16.mp3?alt=media&token=a73633d5-a5ff-4197-a3d7-1f355e1a5369",
          "https://firebasestorage.googleapis.com/v0/b/moveo-home-test.appspot.com/o/120_future_funk_beats_25.mp3?alt=media&token=394a9abe-49b1-4516-9daa-14d8fdb43e7e",
        ]}
      />
    </div>
  );
}

export default App;
