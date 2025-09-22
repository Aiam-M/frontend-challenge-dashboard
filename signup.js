/* ===================================== */
/* ====== 1. MODULE IMPORTS      ====== */
/* ===================================== */

// Import the configured Firebase authentication service.
// Note: The path is case-sensitive and must match your filename exactly (e.g., 'firebaseconfig.js').
import { auth } from './firebaseconfig.js';

// Import the function for creating a new user from the Firebase Auth SDK.
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";


/* ===================================== */
/* ====== 2. DOM ELEMENT SELECTION ====== */
/* ===================================== */

// Get a reference to the sign-up form element from the HTML document.
const signupForm = document.getElementById("signup-form");


/* ===================================== */
/* ====== 3. EVENT LISTENER & SIGN UP LOGIC ====== */
/* ===================================== */

// Add an event listener that triggers when the form is submitted.
// The function is 'async' to allow the use of 'await' for the Firebase operation.
signupForm.addEventListener("submit", async (e) => {
    
    // Prevent the browser's default behavior of reloading the page on form submission.
    e.preventDefault();

    // Get the current values from the form's input fields.
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    /* --- 3.1. CLIENT-SIDE VALIDATION --- */
    // These checks run before contacting Firebase, saving unnecessary API calls.

    // Check if any of the fields are empty.
    if (email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all fields.");
        return; // Stop the function if validation fails.
    }
    
    // Check if the entered passwords match.
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        signupForm.reset(); // Clear the form for the user to re-enter.
        return; // Stop the function if validation fails.
    }

    /* --- 3.2. FIREBASE SIGN UP ATTEMPT --- */
    
    // Use a try...catch block to handle the success and error cases of the asynchronous operation.
    try {
        // Call the Firebase function to create a new user with the provided email and password.
        // 'await' pauses the function here until Firebase responds with success or failure.
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Log the successful creation to the developer console for debugging.
        console.log("User created successfully:", userCredential.user);

        // Inform the user of their success and redirect them to the login page.
        alert("Account created successfully! You will now be redirected to the login page.");
        window.location.href = "LoginEden.html";

    } catch (error) {
        /* --- 3.3. HANDLE SIGN UP ERRORS --- */

        // Log the detailed error to the developer console for easier debugging.
        console.error("Error creating user:", error);

        // Check for specific error codes from Firebase to provide user-friendly feedback.
        if (error.code === 'auth/email-already-in-use') {
            alert('This email address is already in use by another account.');
        } else if (error.code === 'auth/weak-password') {
            alert('The password is too weak. It should be at least 6 characters long.');
        } else if (error.code === 'auth/invalid-email') {
            alert('The email address is not valid.');
        } else {
            // For any other unexpected errors, show a generic message.
            alert("An error occurred while creating the account. Please try again.");
        }
        
        // Clear the form fields after any failed sign-up attempt.
        signupForm.reset();
    }
});