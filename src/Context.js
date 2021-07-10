import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

//calling Socket 
const socket = io('https://nandini-teams-clone.herokuapp.com/');


const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setname] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [isVideoMuted, setVideoMute] = useState(false);
  const [isAudioMuted, setAudioMute] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
        });
      socket.on('me', (id) => setMe(id));

      socket.on('callUser', ({ from, name: callername, signal }) => {
        setCall({ isReceivingCall: true, from, name: callername, signal });
      });
    
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });


    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();
    window.location.reload();

  };
  const setAudioLocal = () => {
    if (stream.getAudioTracks().length > 0) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setAudioMute(true)
  }
  const setVideoLocal = () => {
    if (stream.getVideoTracks().length > 0) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setVideoMute(true);
  }
  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setname,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      setVideoLocal,
      setAudioLocal,
      isAudioMuted,
      isVideoMuted
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };


