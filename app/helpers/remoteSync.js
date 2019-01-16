const PouchDB = require('pouchdb-browser');
const appConfig = require('electron').remote.require('electron-settings');
import config from '../../config';
const endpoint = config.aws.url;

export const sync = (fromDB, toDB) => {
  const config = appConfig.get('sync');
  if (config && config.couchDBUrl) {
    const endpoint = config.couchDBUrl;
    const sendTo = new PouchDB(`${endpoint}/${toDB}`);
    return new Promise((resolve, reject) => {
      fromDB
        .sync(sendTo)
        .on('change', change => {
          // resolve({ time: new Date().getTime(), db: toDB, change });
        })
        .on('paused', info => {
          // replication was paused, usually because of a lost connection
        })
        .on('active', info => {
          // replication was resumed
        })
        .on('complete', () => {
          // yay, we're in sync!
          resolve({ time: new Date().getTime(), db: toDB });
        })
        .on('error', err => {
          // boo, we hit an error!
          reject(err);
        });
    });
  }
  return Promise.resolve({
    time: new Date().getTime(),
    db: 'Remote Sync Unsupported',
  });
};
