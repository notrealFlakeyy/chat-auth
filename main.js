// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMiygeyKcSjV1ZCtI4Q9BN4Yt-IBP8kRw",
    authDomain: "simple-chatt-76aab.firebaseapp.com",
    projectId: "simple-chatt-76aab",
    storageBucket: "simple-chatt-76aab.appspot.com",
    messagingSenderId: "174386187943",
    appId: "1:174386187943:web:7b5cb0bbe865d81e55d582",
    databaseURL: "https://simple-chatt-76aab-default-rtdb.europe-west1.firebasedatabase.app/"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Auth
//--------------------------------------------

// Set variable with Bootstrap modal
const loginModal = new bootstrap.Modal('#login-modal')

loginModal.show()

//Listen for login button click
document.querySelector('#login-button').addEventListener('click', function () {
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const auth = getAuth();

    // Sign in with firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //Hide modal
            loginModal.hide()

            // Initialize database
            initDatabase()
            // ...
        })
        .catch((error) => {
            console.log(error);
        });
});


// Database
//--------------------------------------------
const db = getDatabase(app);
// initializes Realtime Database and get a reference service
function initDatabase() {




    // create reference, where in the database we want to take info from
    const chatRef = ref(db, '/chat');


    // listens for database changes
    onChildAdded(chatRef, function (data) {

        // create element and append to list element
        const message = document.createElement("li")
        message.innerText = new Date(data.key).toLocaleDateString("fi-FI") + ": " + data.val();

        list.appendChild(message)
    })
}
// New message
const input = document.querySelector("input");
const list = document.querySelector("ul")

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // create 'unique' id for message
        const messageId = new Date().toUTCString();

        // send to database
        set(ref(db, "chat/" + messageId), input.value)


        // clear input
        input.value = "";
    }
});