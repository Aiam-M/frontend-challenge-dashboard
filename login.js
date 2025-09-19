//importa as configurações do Firebase
import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const loginForm = document.getElementById("login-form"); //Pega os valores do formulário

loginForm.addEventListener("submit", (e) => { //cria um evento de submit, como se fosse um botão
    e.preventDefault();//previne o comportamento padrão do formulário de apagar
    const email = document.getElementById("Email").value; //Pega os valores do email
    const password = document.getElementById("Senha").value; //Pega os valores da senha

    //Faz o login com email e senha

    signInWithEmailAndPassword(auth, email, password)//Cria uma promessa de entregar a autenticação
        .then((userCrendential) => {//Se a promessa for cumprida (auth verdadeira)

            console.log("Usuário logado com sucesso:", userCrendential.user);
            window.location.href = "Território.html";
        })
        .catch((error) => { //Se a promessa não for cumprida (auth falsa)
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login: " + error.message);
            
        })
})