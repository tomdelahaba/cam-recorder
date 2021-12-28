import React, { useState, useRef, useCallback, useEffect } from "react";
import CustomButton from "../custom-button/custom-button.component";
import Webcam from "react-webcam";

import { createStructuredSelector } from "reselect";

import "./webcam-capture-styles.scss";
import { uploadBlobFile } from "../../firebase/firebase.util";
import { connect } from "react-redux";
import { downloadStart, setRecord } from "../../redux/record/record.actions";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { getUserRecord } from "../../redux/record/record.selector";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

// TODO stahnout blob ze storage

const WebcamCapture = ({ user, record, setRecord, downloadRecord }) => {
  const [capturing, setCapturing] = useState(false);

  const [recordedChunks, setRecordedChunks] = useState([]);
  const [blobUrl, setBlobUrl] = useState("");

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedRef = useRef(null);

  // this effect should be used for initialize after login
  useEffect(() => {
    downloadRecord(user);
  }, [downloadRecord, user]);

  useEffect(() => {
    // try catch as I was not able to get the blob properly out of the record state
    try {
      const url = URL.createObjectURL(record);
      setBlobUrl(url);
    } catch (error) {}
  }, [record]);

  useEffect(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      uploadBlobFile(blob, user);
      setRecord(blob);
    } else {
    }
  }, [recordedChunks, setRecord, user]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      // console.log("data available");
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = useCallback(() => {
    try {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    } catch (error) {
      setCapturing(false);
      alert(error.message);
    }
  }, [handleDataAvailable]);

  const handleStopAndUploadCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [setCapturing, mediaRecorderRef]);

  const handleOnVideoClick = () => {
    recordedRef.current.currentTime = 0;
    recordedRef.current.play();
  };

  return (
    <div>
      <div className='webcam-capture-wrapper'>
        {blobUrl ? (
          <video
            autoPlay
            src={blobUrl}
            className='recorded-video'
            ref={recordedRef}
            onClick={() => handleOnVideoClick()}
          />
        ) : (
          <Webcam
            className='webcam-view'
            audio={false}
            height={720}
            width={1280}
            videoConstraints={videoConstraints}
            ref={webcamRef}
          />
        )}

        {blobUrl ? (
          <></>
        ) : capturing ? (
          <CustomButton onClick={handleStopAndUploadCaptureClick}>
            Stop
          </CustomButton>
        ) : (
          <CustomButton onClick={handleStartCaptureClick}>Record</CustomButton>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setRecord: (blob) => dispatch(setRecord(blob)),
  downloadRecord: (user) => dispatch(downloadStart(user)),
});

const mapStateToProps = (state) =>
  createStructuredSelector({
    user: selectCurrentUser,
    record: getUserRecord,
  });

export default connect(mapStateToProps, mapDispatchToProps)(WebcamCapture);
