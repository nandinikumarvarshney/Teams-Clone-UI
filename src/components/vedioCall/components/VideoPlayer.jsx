import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles,Box } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';

import { SocketContext } from '../../../Context';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, setVideoLocal, setAudioLocal, isAudioMuted, isVideoMuted } = useContext(SocketContext);

  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'name'}</Typography>
            <video id="vedio" playsInline muted ref={myVideo} autoPlay className={classes.video} />
            <Box>
              <button
                className='control-btn'
                onClick={() => {
                  setVideoLocal();
                }}
              >
                {
                  isVideoMuted ? (
                    <VideocamIcon />
                  ) : (
                    <VideocamOffIcon />
                  )
                }
              </button>
              <button
                className='control-btn'
                onClick={() => {
                  setAudioLocal();
                }}
              >
                {
                  isAudioMuted ? (
                    <MicIcon />
                  ) : (
                    <MicOffIcon />
                  )
                }
              </button>
            </Box>
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'name'}</Typography>
            <video id="userVedio" playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
