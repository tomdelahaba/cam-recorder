import { createSelector } from "reselect";

const selectRecord = (state) => state.record;

export const getUserRecord = createSelector(
  [selectRecord],
  (record) => record.currentRecord
);
