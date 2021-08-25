import React, { useState, useEffect } from "react";
import classes from "./MultiPlayer.module.css";
import Player from "./Player";
import silentStar from "../assets/silentStar.png";
import bass from "../assets/bass.png";
import darboka from "../assets/darboka.png";
import drums from "../assets/drums.png";
import electricGuitar from "../assets/electricGuitar.png";
import electronics from "../assets/electronics.png";
import groove1 from "../assets/groove1.png";
import keyboards from "../assets/keyboards.png";
import lowVoice from "../assets/lowVoice.png";

const useMultiAudio = (
  urls,
  playIsOn,
  recordIsOn,
  sessionIsOn,
  recordExist
) => {
  const [isPlayButtonOn, setIsPlayButtonOn] = useState(false);
  const [numberOfLoopsLeft, setNumberOfLoopsLeft] = useState(0);
  const [recordStarted, setRecordStarted] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(0);

  const [records, setRecords] = useState([]);
  let amountInRecords = 0;

  const [sources] = useState(
    urls.map((url) => {
      return {
        url,
        audio: new Audio(url),
      };
    })
  );

  const [players, setPlayers] = useState([
    {
      instroment: "SilentStar",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
    {
      instroment: "Electric Guitar",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
    {
      instroment: "PAS3GROOVE1",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
    {
      instroment: "MazePolitics",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
    {
      instroment: "GrooveB",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
    {
      instroment: "FUD_120",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
    {
      instroment: "Bass",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
    {
      instroment: "stutter",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
    {
      instroment: "future_funk",
      check: false,
      playing: false,
      startTime: 0,
      duration: 0,
    },
  ]);

  // Change the state of instroment that was clicked
  const toggle = (targetIndex) => () => {
    const newPlayers = [...players];
    if (newPlayers[targetIndex].playing === false) {
      newPlayers[targetIndex].playing = true;
    } else {
      newPlayers[targetIndex].playing = false;
    }

    setPlayers(newPlayers);
  };

  // Plays the on instroments in every repeted loop
  useEffect(() => {
    const newRecords = [...records];
    if (playIsOn) {
      const interval = setInterval(() => {
        sources.forEach((source, i) => {
          if (players[i].playing) {
            source.audio.load();
            source.audio.play();
            if (recordIsOn) {
              records.forEach((record, j) => {
                if (record.originKey === i) {
                  newRecords.push({
                    originKey: record.originKey,
                    recordKey: record.recordKey,
                    audio: record.audio,
                    startTime: record.startTime,
                    lastUpdate: Date.now(),
                    duration:
                      record.duration + (Date.now() - record.lastUpdate),
                  });
                }
              });
              setRecordStarted(true);
            }
          } else {
            source.audio.pause();
            if (recordIsOn) {
              records.forEach((record, j) => {
                if (record.originKey === i) {
                  newRecords.push({
                    originKey: record.originKey,
                    recordKey: record.recordKey,
                    audio: record.audio,
                    startTime: record.startTime,
                    lastUpdate: Date.now(),
                    duration:
                      record.duration + (Date.now() - record.lastUpdate),
                  });
                }
              });
              setRecordStarted(true);
            }
          }
        });
      }, 8000);
      return () => clearInterval(interval);
    } else {
      sources.forEach((source, i) => {
        source.audio.pause();
        if (recordIsOn) {
          records.forEach((record, j) => {
            if (record.originKey === i) {
              newRecords.push({
                originKey: record.originKey,
                recordKey: record.recordKey,
                audio: record.audio,
                startTime: record.startTime,
                lastUpdate: Date.now(),
                duration: record.duration + (Date.now() - record.lastUpdate),
              });
            }
          });
          setRecordStarted(true);
        }
      });
      setIsPlayButtonOn(false);
    }
    setRecords(newRecords);
  }, [playIsOn]);

  // Plays the on instroment in the first 8 seconds
  useEffect(() => {
    if (!isPlayButtonOn) {
      if (playIsOn) {
        var newRecord = [];
        sources.forEach((source, i) => {
          if (players[i].playing) {
            source.audio.load();
            source.audio.play();
            if (recordIsOn) {
              amountInRecords = amountInRecords + 1;
              newRecord.push({
                originKey: i,
                recordKey: amountInRecords,
                audio: source.audio,
                startTime: Date.now(),
                lastUpdate: Date.now(),
                duration: 8000,
              });
            }
          } else {
            source.audio.pause();
          }
        });
        setRecordStarted(true);
        setIsPlayButtonOn(true);
        setRecords(newRecord);
      }
    }
  });

  // Every off toggle the one instroment will stop play imidiatly
  useEffect(() => {
    const newRecords = [...records];
    sources.forEach((source, i) => {
      if (players[i].playing === false) {
        source.audio.pause();
        if (recordIsOn) {
          records.forEach((record, j) => {
            if (record.originKey === i) {
              newRecords.push({
                originKey: record.originKey,
                recordKey: record.recordKey,
                audio: record.audio,
                startTime: record.startTime,
                lastUpdate: Date.now(),
                duration: record.duration + (Date.now() - record.lastUpdate),
              });
            }
          });
          setRecordStarted(true);
        }
      }
      if (recordIsOn) {
        records.forEach((record, j) => {
          if (record.originKey === i) {
            newRecords.push({
              originKey: record.originKey,
              recordKey: record.recordKey,
              audio: record.audio,
              startTime: record.startTime,
              lastUpdate: Date.now(),
              duration: record.duration + (Date.now() - record.lastUpdate),
            });
          }
        });
        setRecordStarted(true);
      }
    });
    setRecords(newRecords);
  }, [players]);

  // Save the beginning start session time
  useEffect(() => {
    if (sessionIsOn && !sessionStarted) {
      setSessionStartTime(Date.now());
      setSessionStarted(true);
    }
    if (!sessionIsOn) {
      setSessionStarted(false);
    }
  }, [sessionIsOn]);

  // Play record session
  useEffect(() => {
    if (recordExist && sessionIsOn) {
      records.forEach((record, i) => {
        record.audio.load();
        record.audio.play();
      });
    } else {
      records.forEach((record, i) => {
        record.audio.pause();
      });
    }
  }, [sessionIsOn]);

  // Plays the on record instroments in every repeted loop
  useEffect(() => {
    if (recordExist) {
      const interval = setInterval(() => {
        if (sessionIsOn) {
          records.forEach((record, i) => {
            record.audio.load();
            record.audio.play();
          });
        } else {
          records.forEach((record, i) => {
            record.audio.pause();
          });
        }
      }, 8000);
      return () => clearInterval(interval);
    }
  });

  //   useEffect(() => {
  //     if (sessionIsOn) {
  //       const interval = setInterval(() => {
  //         records.forEach((record, i) => {
  //           if (Date.now() >= record.duration + sessionStartTime) {
  //             console.log(
  //               "now: " +
  //                 Date.now() +
  //                 " should stop: " +
  //                 (record.duration + sessionStartTime) +
  //                 " duration: " +
  //                 record.duration
  //             );
  //             record.audio.pause();
  //           }
  //         });
  //       }, 1000);
  //       return () => clearInterval(interval);
  //     }
  //   });

  return [players, toggle];
};

// Main function of the script
const MultiPlayer = (props) => {
  const [players, toggle] = useMultiAudio(
    props.urls,
    props.playIsOn,
    props.recordIsOn,
    props.sessionIsOn,
    props.recordExist
  );

  return (
    <div>
      <Player key={0} player={players[0]} toggle={toggle(0)} img={silentStar} />
      <Player
        key={1}
        player={players[1]}
        toggle={toggle(1)}
        img={electricGuitar}
      />
      <Player key={2} player={players[2]} toggle={toggle(2)} img={keyboards} />
      <Player
        key={3}
        player={players[3]}
        toggle={toggle(3)}
        img={electronics}
      />
      <Player key={4} player={players[4]} toggle={toggle(4)} img={darboka} />
      <Player key={5} player={players[5]} toggle={toggle(5)} img={drums} />
      <Player key={6} player={players[6]} toggle={toggle(6)} img={bass} />
      <Player key={7} player={players[7]} toggle={toggle(7)} img={lowVoice} />
      <Player key={8} player={players[8]} toggle={toggle(8)} img={groove1} />
    </div>
  );
};

export default MultiPlayer;
