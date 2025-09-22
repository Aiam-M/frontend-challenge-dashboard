/* ===================================== */
/* ====== 1. MODULE IMPORTS      ====== */
/* ===================================== */

// Imports the configured Firebase services (db, auth) from a local configuration file.
import { db, auth } from "./firebaseConfig.js";

// Imports specific functions from the Firebase SDKs using their CDN URLs.
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js"; // Firestore functions to work with collections and documents.
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";     // Authentication function to check user login state.


/* ===================================== */
/* ====== 2. PAGE SECURITY GUARD ====== */
/* ===================================== */

// Sets up a listener that checks the user's authentication state when the page loads.
onAuthStateChanged(auth, (user) => {
    // If the 'user' object is null, it means the user is not logged in.
    if (!user) {
        // Throws an error indicating the user is not authenticated.
        throw new Error("Usuário não autenticado");
        // Redirects the user to the login page.
        window.location.href = "login.html";
    }
});


/* ===================================== */
/* ====== 3. FORM SUBMISSION LOGIC ====== */
/* ===================================== */

// Gets a reference to the form's parent section element from the HTML document using its ID.
const formSection = document.getElementById("formSec");

// Adds an event listener that triggers when a 'submit' event occurs within the form section.
// The callback function is 'async' to allow the use of 'await' for asynchronous database operations.
formSection.addEventListener("submit", async (e) => {
    
    // Prevents the browser's default form submission behavior (which is to reload the page).
    e.preventDefault();
    
    // Gets the currently logged-in user object as a final check.
    const user = auth.currentUser;
    if (!user) {
        // If the user is no longer authenticated, throw an error and redirect.
        throw new Error("Usuário não autenticado");
        window.location.href = "login.html";
    };

    /* --- 3.1. GATHER FORM DATA --- */

    // Selects all input elements with name="produto" that are currently checked.
    const produtosSelecionadosNodes = document.querySelectorAll('input[name="produto"]:checked');
    // Converts the resulting NodeList into a true Array and maps it to get only the 'value' of each checked box.
    const produtosSelecionados = Array.from(produtosSelecionadosNodes).map(checkbox => checkbox.value);

    // Creates a single JavaScript object to hold all the data gathered from the form fields.
    const indicacaoData = {
        // Fieldset: Availability Check
        cnpj: document.getElementById('CNPJ').value,

        // Fieldset: Basic Registration
        razaoSocial: document.getElementById('razaoSocial').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        municipio: document.getElementById('municipio').value,
        estado: document.getElementById('estado').value,

        // Fieldset: Contact Information
        nomeContato: document.getElementById('nome').value,
        emailContato: document.getElementById('email').value,
        telefoneContato: document.getElementById('telefone').value,
        cargoContato: document.getElementById('cargo').value,
        departamentoContato: document.getElementById('departamento').value,
        celularContato: document.getElementById('celular').value,

        // Fieldset: Indication Details
        buIndicada: document.getElementById('BU').value,
        acaoDesejada: document.getElementById('acao').value,
        produtos: produtosSelecionados, // The array of selected products

        // Important metadata (data not from the form but crucial for tracking)
        dataCriacao: new Date(),          // The exact timestamp of the submission
        indicadoPorUid: user.uid,           // The unique ID of the user who submitted the form
        indicadoPorEmail: user.email        // The email of the user who submitted the form
    };

    /* --- 3.2. SAVE DATA TO FIRESTORE --- */
    
    // Use a try...catch block to handle success and error cases of the asynchronous save operation.
    try {
        // Calls the addDoc function to save the data object to the "indicacoes" collection in Firestore.
        // 'await' pauses the function here until Firestore confirms the operation is complete.
        const doc = await addDoc(collection(db, "indicacoes"), indicacaoData);
        
        // Logs the new document's unique ID to the developer console for debugging.
        console.log("Document written with ID: ", doc.id);
        // Alerts the user that their submission was successful.
        alert("Indicação enviada com sucesso!");
        // Redirects the user to the loading page after a successful submission.
        window.location.href = "carregamento.html";

    } catch (error) {
        // If any part of the 'try' block fails, the code execution jumps here.
        
        // Logs the detailed error to the developer console for easier debugging.
        console.error("Error adding document: ", error);
        // Shows a generic and user-friendly error message in an alert.
        alert("Erro ao enviar indicação. Tente novamente.");
    }
});