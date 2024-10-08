const user = document.getElementById("username");

// let FirebaseConfigDefault = {apiKey: "AIzaSyAbJF8Z7BLPtZnEZfOoU0eUsjgfTkQMMr0",
//     authDomain: "felixchat-baef2.firebaseapp.com",
//     databaseURL: "https://felixchat-baef2-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "felixchat-baef2",
//     storageBucket: "felixchat-baef2.appspot.com",
//     messagingSenderId: "317997165341",
//     appId: "1:317997165341:web:822e3d24f4b4cff89a4ff4"};

// firebase.initializeApp(FirebaseConfigDefault);
const db = new FbDb();
const provider = new firebase.auth.GoogleAuthProvider();
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Zatrzymuje domyślne działanie formularza


    firebase.auth()
        .signInWithPopup(provider)
        .then(async (result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            console.log(user);
            localStorage.setItem("photo", user.photoURL)
            localStorage.setItem("username", user.displayName)

            await db.set('members/' + user.uid, {
                uid: user.uid,
                username: user.displayName,
                photo: user.photoURL,
                email: user.email,
                lastLog: Date.now()
            });

            document.location.href="index.html"
        }).catch((error) => {
            console.error(error);
            alert('Wystąpił nieoczekiwany błąd madafucka');
        });
});
