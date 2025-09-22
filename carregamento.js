/* ===================================== */
/* ====== 1. MODULE IMPORTS      ====== */
/* ===================================== */

// Import the configured Firebase services (Database and Authentication) from our local config file.
import { db, auth } from "./firebaseconfig.js";

// Import specific functions from the Firebase SDKs using their CDN URLs.
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js"; // Firestore functions to work with collections and documents.
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";     // Authentication function to check user login state.


/* ===================================== */
/* ====== 2. PAGE SECURITY GUARD ====== */
/* ===================================== */

// Set up a listener that checks the user's authentication state as soon as the page loads.
// This is a crucial security measure to protect the page content.
onAuthStateChanged(auth, (user) => {
    // The 'user' object will be null if the user is not logged in.
    if (!user) {
        // If the user is not authenticated, immediately redirect them to the login page.
        window.location.href = "LoginEden.html";
    }
});


/* ===================================== */
/* ====== 3. FORM SUBMISSION LOGIC ====== */
/* ===================================== */

// Get a reference to the form element from the HTML document using its unique ID.
const carregamentoForm = document.getElementById("carregamento");

// Add an event listener that triggers a function when the form's 'submit' event occurs.
// The callback function is marked as 'async' to allow the use of 'await' for asynchronous database operations.
carregamentoForm.addEventListener("submit", async (e) => {
    
    // Prevent the browser's default form submission behavior, which is to reload the page.
    e.preventDefault();
    
    // Use a try...catch block to gracefully handle any potential errors during the submission process.
    try {
        // Get the currently logged-in user object. This is a final check for an active session.
        const user = auth.currentUser;
        if (!user) {
            // If for any reason the user is no longer authenticated, alert them and redirect.
            alert("Session expired. Please log in again.");
            window.location.href = "LoginEden.html";
            return; // Stop the function execution immediately.
        }

        /* --- 3.1. GATHER ALL FORM DATA --- */

        // Handle the radio button group to get the value of the selected option.
        // QuerySelector finds the input with name='subsidiaCombustivel' that is currently ':checked'.
        const subsidiaCombustivelInput = document.querySelector('input[name="subsidiaCombustivel"]:checked');
        // Use a ternary operator: if an option is selected, get its value; otherwise, default to null.
        const subsidiaCombustivelValue = subsidiaCombustivelInput ? subsidiaCombustivelInput.value : null;

        // Create a single JavaScript object to hold all the data gathered from the form fields.
        const carregamentoData = {
            // Fieldset 1: CNPJ (the key to associate this data with an 'indication' document)
            cnpjEmpresa: document.getElementById('cnpjEmpresa').value,

            // Fieldset 2: Ticket Log Indication Data
            qtdCaminhoes: document.getElementById('qtdCaminhoes').value,
            qtdFuncionarios: document.getElementById('qtdFuncionarios').value,
            qtdVeiculosPesados: document.getElementById('qtdVeiculosPesados').value,
            subsidiaCombustivel: subsidiaCombustivelValue, // The value from the radio button logic above
            qtdVeiculosLeves: document.getElementById('qtdVeiculosLeves').value,
            
            // Fieldset 3: General Vehicle Data
            qtdVeiculosTotal: document.getElementById('qtdVeiculosTotal').value,
            previsaoVolume: document.getElementById('previsaoVolume').value,
            qtdCartoes: document.getElementById('qtdCartoes').value,
            
            // Fieldset 4: Observations
            observacoes: document.getElementById('observacoes').value,

            // Important metadata (data that doesn't come from the user but is crucial for tracking)
            dataCriacao: new Date(),          // The exact timestamp of the submission
            criadoPorUid: user.uid,           // The unique ID of the user who submitted the form
            criadoPorEmail: user.email        // The email of the user who submitted the form
        };

        /* --- 3.2. SAVE THE DATA OBJECT TO FIRESTORE --- */

        // Use the addDoc function to save the data object to the database.
        // 'await' pauses the function here until Firestore confirms that the data has been saved successfully.
        // It creates a new document with a unique auto-generated ID inside the "carregamentos" collection.
        const docRef = await addDoc(collection(db, "carregamentos"), carregamentoData);

        /* --- 3.3. PROVIDE FEEDBACK TO THE USER --- */
        
        // Log the new document's unique ID to the developer console for debugging purposes.
        console.log("Loading data document saved with ID: ", docRef.id);
        // Alert the user that their submission was successful.
        alert("Loading data submitted successfully!");
        
        // Redirect the user back to the main dashboard page after a successful submission.
        window.location.href = "Território.html";

    } catch (error) {
        // If any part of the code inside the 'try' block fails, the execution jumps here.
        
        // Log the detailed error to the developer console for easier debugging.
        console.error("Error saving loading data: ", error);
        // Show a generic and user-friendly error message in an alert.
        alert("An error occurred while submitting the data. Please try again.");
    }
});