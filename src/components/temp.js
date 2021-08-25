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

const useMultiAudio = (urls, playIsOn) => {
  const [isPlayButtonOn, setIsPlayButtonOn] = useState(false);

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

  const toggle = (targetIndex) => () => {
    const newPlayers = [...players];
    if (newPlayers[targetIndex].playing === false) {
      newPlayers[targetIndex].playing = true;
    } else {
      newPlayers[targetIndex].playing = false;
    }

    setPlayers(newPlayers);
  };

  useEffect(() => {
    if (playIsOn) {
      const interval = setInterval(() => {
        sources.forEach((source, i) => {
          if (players[i].playing) {
            source.audio.load();
            source.audio.play();
          } else {
            source.audio.pause();
          }
        });
      }, 8000);
      return () => clearInterval(interval);
    } else {
      sources.forEach((source, i) => {
        source.audio.pause();
      });
      setIsPlayButtonOn(false);
    }
  }, [playIsOn]);

  useEffect(() => {
    if (!isPlayButtonOn) {
      if (playIsOn) {
        sources.forEach((source, i) => {
          players[i].playing ? source.audio.play() : source.audio.pause();
        });
        setIsPlayButtonOn(true);
      }
    }
  });

  useEffect(() => {
    sources.forEach((source, i) => {
      if (players[i].playing === false) {
        source.audio.pause();
      }
    });
  }, [players]);

  return [players, toggle];
};

const MultiPlayer = (props) => {
  const [players, toggle] = useMultiAudio(
    props.urls,
    props.playIsOn,
    props.recordIsOn,
    props.sessionIsOn
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
