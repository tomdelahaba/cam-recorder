import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import recordReducer from "./record/record.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  //whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  record: recordReducer,
});

export default persistReducer(persistConfig, rootReducer);
