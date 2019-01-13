// Node Libs
import uuidv4 from 'uuid/v4';

// Actions Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';

// Helpers
import { syncAllDocs } from '../helpers/pouchDB';
import i18n from '../../i18n/i18n';

const RemoteSyncMW = ({ dispatch }) => next => action => {
  switch (action.type) {
    case ACTION_TYPES.SYNC_DB: {
      return syncAllDocs()
        .then(allDocs => {
          next(
            Object.assign({}, action, {
              payload: allDocs,
            })
          );
        })
        .catch(err => {
          next({
            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            payload: {
              type: 'warning',
              message: err.message,
            },
          });
        });
    }

    default: {
      return next(action);
    }
  }
};

export default RemoteSyncMW;
