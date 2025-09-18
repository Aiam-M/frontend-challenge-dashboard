const form = document.getElementById('carregamento');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Olá sua solicitação foi encaminhada para a equipe do Território Edenred, em breve você será informado do parecer da análise. Obrigado!');
    form.reset();
});