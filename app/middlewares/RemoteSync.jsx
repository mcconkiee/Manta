// Node Libs
import uuidv4 from 'uuid/v4';

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Helpers
import { syncRemoteDocs } from '../helpers/pouchDB';
const RemoteSyncMW = ({ dispatch }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.SYNC_DB: {
      return syncRemoteDocs()
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
