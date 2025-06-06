 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
 
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyD10al9ZZJ9AryMUHGOSgyfNNkz3dufQ68",
   authDomain: "login-form-1ca44.firebaseapp.com",
   projectId: "login-form-1ca44",
   storageBucket: "login-form-1ca44.appspot.com",
   messagingSenderId: "270153017141",
   appId: "1:270153017141:web:94f55908c7ced74fa04e7c"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const signUp = document.getElementById('submitSignUp');

signUp.addEventListener('click', (event) => {
    event.preventDefault();
    
    const firstName = document.getElementById('fname').value;
    const middleName = document.getElementById('mname').value;
    const lastName = document.getElementById('lname').value;
    const mobile = document.getElementById('rmobile').value;
    const email = document.getElementById('remail').value;
    const password = document.getElementById('rpassword').value;
    const reconformpassword = document.getElementById('repassword').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                mobile: mobile
            };
            
            // Show success message
            showMessage('Account Created Successfully', 'signUpMessage');

            // Store user data in Firestore
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    // Redirect after successful signup
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);  // 2 seconds delay to allow the message to show
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create User', 'signUpMessage');
            }
        });
});

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);  // The message will fade out after 5 seconds
}


//signin


const signIn = document.getElementById('submitSignIn');

signIn.addEventListener('click', (event) => {
    event.preventDefault();  // Prevent the default form submission

    // Get the user's input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Get Firebase auth instance
    const auth = getAuth();

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })

// function showMessage(message, divId) {
//     const messageDiv = document.getElementById(divId);
//     messageDiv.style.display = "block";
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(() => {
//         messageDiv.style.opacity = 0;
//     }, 5000);  // The message will fade out after 5 seconds
// }
