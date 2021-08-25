import classes from "./PlayButton.module.css";

const PlayButton = (props) => {
  return (
    <div className={classes.line}>
      {!props.sessionState && (
        <button className={classes.pad} onClick={props.onClick}>
          <span>{props.name}</span>
        </button>
      )}
      {props.sessionState && (
        <button className={classes.disable}>
          <span>{props.name}</span>
        </button>
      )}
    </div>
  );
};

export default PlayButton;
