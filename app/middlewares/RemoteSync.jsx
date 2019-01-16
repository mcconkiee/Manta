import * as ACTION_TYPES from '../constants/actions.jsx';
import config from '../../config';

// Helpers
import {
  syncRemoteDocsWithFirestore,
  syncRemoteDocsWithCouch,
} from '../helpers/pouchDB';
const RemoteSyncMW = ({ dispatch }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.SYNC_DB_FIRESTORE: {
      return syncRemoteDocsWithFirestore()
        .then(syncResults => {
          dispatch({
            type: ACTION_TYPES.SYNC_DB_SUCCESS,
            payload: { syncResults },
          });
          next(
            Object.assign({}, action, {
              payload: syncResults,
            })
          );
        })
        .catch(err => {
          dispatch({
            type: ACTION_TYPES.SYNC_ERROR,
            payload: err,
          });
        });
    }

    case ACTION_TYPES.SYNC_DB_REMOTE: {
      return syncRemoteDocsWithCouch(config.aws.url)
        .then(syncResults => {
          dispatch({
            type: ACTION_TYPES.SYNC_DB_SUCCESS,
            payload: { syncResults },
          });
          next(
            Object.assign({}, action, {
              payload: syncResults,
            })
          );
        })
        .catch(err => {
          dispatch({
            type: ACTION_TYPES.SYNC_ERROR,
            payload: err,
          });
        });
    }

    default: {
      return next(action);
    }
  }
};

export default RemoteSyncMW;
