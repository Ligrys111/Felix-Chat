/**
 * Include lib insid <head> section:
 * 
 * <script src="https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js"></script>
 * <script src="https://www.gstatic.com/firebasejs/8.3.3/firebase-database.js"></script>
 */


/**
 * Default Firebase Configuration:
 */
const FirebaseConfigDefault = {


    apiKey: "AIzaSyAbJF8Z7BLPtZnEZfOoU0eUsjgfTkQMMr0",
    authDomain: "felixchat-baef2.firebaseapp.com",
    databaseURL: "https://felixchat-baef2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "felixchat-baef2",
    storageBucket: "felixchat-baef2.appspot.com",
    messagingSenderId: "317997165341",
    appId: "1:317997165341:web:822e3d24f4b4cff89a4ff4"
};


class FbDb {
    constructor() {
        firebase.initializeApp(FirebaseConfigDefault);
        this.db = firebase.database();
        this.default = {
            valueListener: snap => console.log('onValue snapshot', snap)
        }
        this.listeners = {};
    }

    addListener(ref, listener) {
        if (!(listener instanceof Function)) {
            throw new Error('valueListener must be a function');
        }

        this.listeners[ref] = listener;
        this.db.ref(`${ref}`).on('value', v => listener(v.val()));
    }

    list(ref, valueListener = this.default.valueListener) {
        const listener = valueListener instanceof Function ? valueListener : this.default.valueListener;
        this.db.ref(`${ref}`).on('value', val => listener(val.val()));
    }

    get(ref, valueListener = this.default.valueListener) {
        const listener = valueListener instanceof Function ? valueListener : this.default.valueListener;

        this.db.ref(`${ref}`).on('value', snap => listener(snap.val()));
    }

    async set(ref, data) {
        await this.db.ref(`${ref}`).set(data);
    }

    async push(ref, data) {
        const r = this.db.ref(`${ref}`);
        const item = await r.push();
        await item.set(data);
    }
}