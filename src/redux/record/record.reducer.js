import recordActionTypes from "./record.types";

const INIT_STATE = {
  currentRecord: null,
  error: null,
};

const recordReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case recordActionTypes.DOWNLOAD_RECORD_SUCCESS:
    case recordActionTypes.SET_RECORD:
      return {
        ...state,
        currentRecord: action.payload,
      };
    case recordActionTypes.UPLOAD_RECORD_FAILURE:
    case recordActionTypes.DOWNLOAD_RECORD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case recordActionTypes.CLEAR_RECORD:
      return { ...state, currentRecord: null };
    default:
      return state;
  }
};

export default recordReducer;
