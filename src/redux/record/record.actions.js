import recordActionTypes from "./record.types";

export const setRecord = (blob) => {
  return {
    type: recordActionTypes.SET_RECORD,
    payload: blob,
  };
};

export const uploadStart = () => {
  return {
    action: recordActionTypes.UPLOAD_RECORD_START,
  };
};

export const uploadSuccess = () => {
  return {
    type: recordActionTypes.UPLOAD_RECORD_SUCCESS,
  };
};

export const uploadFailure = (error) => {
  return {
    type: recordActionTypes.UPLOAD_RECORD_FAILURE,
    payload: error,
  };
};

export const downloadStart = (user) => {
  return {
    type: recordActionTypes.DOWNLOAD_RECORD_START,
    payload: user,
  };
};

export const downloadSuccess = (blob) => {
  return {
    type: recordActionTypes.DOWNLOAD_RECORD_SUCCESS,
    payload: blob,
  };
};

export const downloadFailure = (error) => {
  return {
    type: recordActionTypes.DOWNLOAD_RECORD_FAILURE,
    payload: error,
  };
};

export const clearRecord = () => {
  return {
    type: recordActionTypes.CLEAR_RECORD,
  };
};
