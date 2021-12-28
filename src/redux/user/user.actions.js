import userActionTypes from "./user.types";

export const googleSignInStart = () => {
  return {
    type: userActionTypes.GOOGLE_SIGN_IN_START,
  };
};

export const emailSignInStart = (emailAndPassword) => ({
  type: userActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = ({ id, additionalData }) => {
  //console.log(id);
  return {
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: { id, additionalData },
  };
};

export const signInFailure = (error) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (error) => ({
  type: userActionTypes.SIGN_UP_START,
  payload: error,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
