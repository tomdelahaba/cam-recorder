import { takeLatest, call, all, put } from "redux-saga/effects";

import userActionTypes from "./user.types";

import {
  signInFailure,
  signUpFailure,
  signOutFailure,
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
} from "./user.actions";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase.util";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // console.error(userAuth);
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    // console.error(userSnapshot.id);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    try {
      const { user } = yield auth.createUserWithEmailAndPassword(
        email,
        password
      );
      yield getSnapshotFromUserAuth(user);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          const { user } = yield auth.signInWithEmailAndPassword(
            email,
            password
          );
          yield getSnapshotFromUserAuth(user);
          break;
        default:
          yield put(signInFailure(error));
          break;
      }
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onSignOutStart),
    call(onEmailSignInStart),
  ]);
}
