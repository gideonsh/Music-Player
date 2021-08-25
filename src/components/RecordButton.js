import classes from "./RecordButton.module.css";

const RecordButton = (props) => {
  return (
    <div className={classes.line}>
      {!props.state && props.playState && !props.sessionState && (
        <button className={classes.disable}>
          <p>{props.name}</p>
          <span>Off</span>
        </button>
      )}
      {!props.state && !props.playState && props.sessionState && (
        <button className={classes.disable}>
          <p>{props.name}</p>
          <span>Off</span>
        </button>
      )}
      {props.state && props.playState && (
        <button className={classes.pad} onClick={props.onHideSession}>
          <p>{props.name}</p>
          <span>On</span>
        </button>
      )}
      {props.state && !props.playState && (
        <button className={classes.pad} onClick={props.onHideSession}>
          <p>{props.name}</p>
          <span>On</span>
        </button>
      )}
      {!props.state && !props.playState && !props.sessionState && (
        <button className={classes.pad} onClick={props.onShowSession}>
          <p>{props.name}</p>
          <span>Off</span>
        </button>
      )}
    </div>
  );
};

export default RecordButton;
