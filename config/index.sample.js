/**
 * Firebase is one way only - optional...can remove this key/value from this config
 * aws is preferred since you can add a proper CouchDB instance and let the magic happen
 */
const config = {
  firebase: {
    apiKey: 'xxx',
    authDomain: 'mantainvoice.firebaseapp.com',
    databaseURL: 'https://mantainvoice.firebaseio.com',
    projectId: 'mantainvoice',
    storageBucket: 'mantainvoice.appspot.com',
    messagingSenderId: 'xxx',
  },
  aws: {
    url:
      'http://username:password@ec2-xx-xx-xx-xx.compute-1.amazonaws.com:5984',
  },
};
export default config;
