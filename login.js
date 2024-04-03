function login() {
    //puxando os valores dos campos email e senha
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password) //let email e senha como parametros
    .then(response => {
        window.location.href = "cadastros.html";
    }).catch(error => {
        alert("Usuário não encontrado");
    });
}

function recuperarSenha() {
    firebase.auth().sendPasswordResetEmail(email.value).then(()=>{
        alert('Email enviado com sucesso!')
    }).catch(error => {
        alert('Este e-mail não existe!')
    })
}

