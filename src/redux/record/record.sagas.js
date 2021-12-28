import { takeLatest, call, put, all } from "redux-saga/effects";

import recordActionTypes from "./record.types";

import {
  clearRecord,
  downloadFailure,
  downloadStart,
  downloadSuccess,
  setRecord,
  uploadFailure,
  uploadStart,
  uploadSuccess,
} from "./record.actions";
import { downloadBlobFile, uploadBlobFile } from "../../firebase/firebase.util";
import userActionTypes from "../user/user.types";

export function* proceedUpload({ payload: recordBlob }) {
  try {
    yield call(uploadBlobFile, recordBlob);
    yield put(uploadSuccess());
  } catch (error) {
    yield put(uploadFailure(error));
  }
}

export function* onUploadStart() {
  yield takeLatest(recordActionTypes.UPLOAD_RECORD_START, proceedUpload);
}

export function* proceedDownload({ payload: user }) {
  try {
    const fileRef = yield call(downloadBlobFile, user);
    yield put(downloadSuccess(fileRef));
  } catch (error) {
    yield put(downloadFailure(error));
  }
}

export function* onDownloadStart() {
  yield takeLatest(recordActionTypes.DOWNLOAD_RECORD_START, proceedDownload);
}

export function* clearRecordOnSignOut() {
  yield put(clearRecord());
}

export function* clearOnSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearRecordOnSignOut);
}

export function* recordSagas() {
  yield all([
    call(onUploadStart),
    call(onDownloadStart),
    call(clearOnSignOutSuccess),
  ]);
}
