import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Sync DB with a service
export const syncDbFirestore = createAction(ACTION_TYPES.SYNC_DB_FIRESTORE);
export const syncDbRemote = createAction(ACTION_TYPES.SYNC_DB_REMOTE);
export const syncDbSuccess = createAction(ACTION_TYPES.SYNC_DB_SUCCESS);
