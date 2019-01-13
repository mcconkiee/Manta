import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/remoteSync';

const RemoteSynceReducer = handleActions(
  {
    [combineActions(Actions.syncDb)]: (state, action) => action.payload,
  },
  []
);

export default RemoteSynceReducer;

// Selector
const syncDbState = state => state.remoteSync;
export const syncDb = createSelector(syncDbState, remoteSync => remoteSync);
