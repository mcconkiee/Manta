import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

// Sync DB with a service
export const syncDb = createAction(ACTION_TYPES.SYNC_DB);
