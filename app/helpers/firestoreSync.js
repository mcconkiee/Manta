/**
 * Firestore layer to sync docs remotely
 */
import * as firebase from 'firebase';
// FIXME - extract to private config
import config from '../../config';
let db;
if (config && config.firebase) {
  firebase.initializeApp(config.firebase);
  db = firebase.firestore();
  const settings = { /* your settings... */ timestampsInSnapshots: true };
  db.settings(settings);
}

export const syncCollection = (collection, dataCollection) => {
  if (db) {
    const batch = db.batch();
    dataCollection.forEach((dataObject, idx) => {
      const uid = `doc_${idx}`;
      const doc = db.collection(collection).doc(uid);
      if (dataObject) {
        batch.set(doc, dataObject);
      } else {
        // remove this idx
        batch.delete(doc);
      }
    });
    // Commit the batch
    return batch.commit();
  }
  // gracefull fail
  return Promise.resolve({
    message: 'Firestore not configured, gracefully degrate',
  });
};
