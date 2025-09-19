import { auth } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        signupForm.reset();
        return;
    }
    if (email === "" || password === "" || confirmPassword === "") {
        alert("Por favor, preencha todos os campos.");
        signupForm.reset();
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Usuário cadastrado com sucesso:", userCredential.user);
            alert("Cadastro realizado com sucesso! Você será redirecionado para a página de login.");
            window.location.href = "loginEden.html";
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                alert('Este email já está a ser utilizado por outra conta.');
                signupForm.reset();
            } else {
                console.error("Erro ao cadastrar usuário:", error);
                alert("Erro ao cadastrar usuário: " + error.message);
                signupForm.reset();
            }

        });
});