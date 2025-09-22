/* ===================================== */
/* ====== 1. MODULE IMPORTS      ====== */
/* ===================================== */

// Import the configured Firebase authentication service from our central config file.
import { auth } from './firebaseconfig.js';

// Import the specific function for signing in with email and password from the Firebase Auth SDK.
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";


/* ===================================== */
/* ====== 2. DOM ELEMENT SELECTION ====== */
/* ===================================== */

// Get a reference to the login form element from the HTML document using its ID.
const loginForm = document.getElementById("login-form");


/* ===================================== */
/* ====== 3. EVENT LISTENER SETUP  ====== */
/* ===================================== */

// Add an event listener that triggers when the form's 'submit' event occurs (e.g., when the submit button is clicked).
// The callback function is 'async' to allow the use of 'await' for the asynchronous login operation.
loginForm.addEventListener("submit", async (e) => {

    // Prevent the browser's default behavior of reloading the page on form submission.
    e.preventDefault();

    // Get the current values from the email and password input fields.
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Senha").value;

    // Use a try...catch block to handle the success and error cases of the asynchronous login process.
    try {
        /* --- 3.1. ATTEMPT TO SIGN IN --- */

        // Call the Firebase function to sign in.
        // 'await' pauses the function here until Firebase responds with success or failure.
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        /* --- 3.2. HANDLE SUCCESSFUL LOGIN --- */

        // Log the successful login and user data to the developer console.
        console.log("User logged in successfully:", userCredential.user);

        // Redirect the user to the main dashboard page after a successful login.
        window.location.href = "Território.html";

    } catch (error) {
        /* --- 3.3. HANDLE LOGIN ERRORS --- */

        // Log the detailed error to the developer console for debugging.
        console.error("Error during login:", error);

        // Check for specific error codes to provide user-friendly feedback.
        // 'auth/invalid-credential' is the modern, secure error for wrong email or password.
        if (error.code === 'auth/invalid-credential') {
            alert("Invalid email or password. Please try again.");
        } else {
            // For any other unexpected errors, show a generic message.
            alert("An error occurred during login. Please try again later.");
        }

        // Clear the form fields after a failed login attempt.
        loginForm.reset();
    }
});