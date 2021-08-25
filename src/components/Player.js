import React, { useState, useEffect } from "react";
import classes from "./Player.module.css";

const Player = ({ player, toggle, img }) => {
  return (
    <button className={classes.pad} onClick={toggle}>
      <img src={img} />
      {player.playing ? "On" : "Off"}
    </button>
  );
};

export default Player;
