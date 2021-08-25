import classes from "./SessionButton.module.css";

const SessionButton = (props) => {
  return (
    <div className={classes.line}>
      {/* {props.state && props.playState && props.recordState && (
        <button className={classes.pad} onClick={props.onStopSession}>
          <p>{props.name}</p>
          <span>On</span>
        </button>
      )} */}
      {props.recordExist &&
        props.state &&
        !props.playState &&
        !props.recordState && (
          <button className={classes.pad} onClick={props.onStopSession}>
            <p>{props.name}</p>
            <span>On</span>
          </button>
        )}

      {props.recordExist &&
        !props.state &&
        !props.playState &&
        props.recordState && (
          <button className={classes.disable}>
            <p>{props.name}</p>
            <span>Off</span>
          </button>
        )}
      {props.recordExist &&
        !props.state &&
        props.playState &&
        !props.recordState && (
          <button className={classes.disable}>
            <p>{props.name}</p>
            <span>Off</span>
          </button>
        )}
      {props.recordExist &&
        !props.state &&
        !props.playState &&
        !props.recordState && (
          <button className={classes.pad} onClick={props.onPlaySession}>
            <p>{props.name}</p>
            <span>Off</span>
          </button>
        )}
      {props.recordExist &&
        !props.state &&
        props.playState &&
        props.recordState && (
          <button className={classes.disable}>
            <p>{props.name}</p>
            <span>Off</span>
          </button>
        )}
    </div>
  );
};

export default SessionButton;
