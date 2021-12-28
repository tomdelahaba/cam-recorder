import React from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import { signOutStart } from "../../redux/user/user.actions";

import { connect } from "react-redux";
import WebcamCapture from "../../components/webcam-capture/webcam-capture.component";

const RecordPage = ({ signOutStart }) => (
  <div>
    <CustomButton onClick={signOutStart}>Logout</CustomButton>
    <WebcamCapture />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(RecordPage);
