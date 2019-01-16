import config from '../../config';
const PouchDB = require('pouchdb-browser');
const endpoint = config.aws.url;

export const sync = (fromDB, toDB) => {
  const sendTo = new PouchDB(`${endpoint}/${toDB}`);
  return new Promise((resolve, reject) => {
    fromDB
      .sync(sendTo)
      .on('change', change => {
        // yo, something changed!
      })
      .on('paused', info => {
        // replication was paused, usually because of a lost connection
      })
      .on('active', info => {
        // replication was resumed
      })
      .on('complete', () => {
        // yay, we're in sync!
        resolve();
      })
      .on('error', err => {
        // boo, we hit an error!
        reject(err);
      });
  });
};
