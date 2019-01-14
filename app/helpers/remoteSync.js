/**
 * Firestore layer to sync docs remotely
 */
import * as firebase from 'firebase';
// FIXME - extract to private config
import config from '../../config';
firebase.initializeApp(config.firebase);

const db = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

export const syncCollection = (collection, dataCollection) => {
  const batch = db.batch();
  dataCollection.forEach((dataObject, idx) => {
    const uid = `doc_${idx}`;
    const doc = db.collection(collection).doc(uid); // FIXME - is that a guearantee that all objects have created_at?
    if (dataObject) {
      batch.set(doc, dataObject);
    } else {
      // remove this idx
      batch.delete(doc);
    }
  });
  // Commit the batch
  return batch.commit();
};

export const sync = (key, data) => {
  const keys = Object.keys(data);
  return Promise.all(keys.map(key => syncCollection(key, data[key])));
};
