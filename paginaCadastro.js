onload = () => {
    nome.onblur = () => {
        if (nome.value.length == 0) {
            instrucoes.innerHTML = '*';
            instrucoes.style.color = '#F00';
            instrucoes.style.fontSize = '2em';
        } else instrucoes.innerHTML = '';
    }
    nome.oninput = () => {
        let invalidos = '1234567890!@#$%&*(){}[]-+=_,.<>;?\:/*';
        let ultimoChar = nome.value.charAt(nome.value.length - 1);
        if (invalidos.indexOf(ultimoChar) >= 0) {
            nome.value = nome.value.substr(0, nome.value.length - 1);
        }
    }
    sobrenome.onblur = () => {
        if (sobrenome.value.length == 0) {
            instrucoes2.innerHTML = '*';
            instrucoes2.style.color = '#F00';
            instrucoes2.style.fontSize = '2em';
        } else instrucoes2.innerHTML = '';
    }
    sobrenome.oninput = () => {
        let invalidos = '1234567890!@#$%&*(){}[]-+=_,.<>;?\:/*';
        let ultimoChar = sobrenome.value.charAt(sobrenome.value.length - 1);
        if (invalidos.indexOf(ultimoChar) >= 0) {
            sobrenome.value = sobrenome.value.substr(0, sobrenome.value.length - 1);
        }
    }
    email.onblur = () => {
        let emailValidacao=true;
        if (email.value.length == 0) {
            instrucoes3.innerHTML = '*';
            instrucoes3.style.color = '#F00';
            instrucoes3.style.fontSize = '2em';
            emailValidacao=false;
        } else instrucoes3.innerHTML = ''; 


        if (email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1){
            alert("Por favor insira um e-mail válido.");
            emailValidacao=false;                     
        }
    }

    senha.onblur = () => {
        if (senha.value.length == 0) {
            instrucoes4.innerHTML = '*';
            instrucoes4.style.color = '#F00';
            instrucoes4.style.fontSize = '2em';
        } else instrucoes4.innerHTML = '';
    }
}

let botaoRegistrar=document.getElementById('btn_registrar');
let campoNome = document.getElementById('nome');
let campoSobrenome = document.getElementById('sobrenome');
let campoEmail = document.getElementById('email');
let campoPassword = document.getElementById('senha');
botaoRegistrar.addEventListener('click', ()=>{
    
    let dados = JSON.parse(localStorage.getItem('cadastroUsuarios'));

    if(!dados){
        localStorage.setItem('cadastroUsuarios','[]')
        dados=[];
    }

    let cadastro = {
        "nome": campoNome.value,
        "sobrenome": campoSobrenome.value,
        "emailUsuario": campoEmail.value,
        "senhaUsuario":campoPassword.value
    }

    dados.push(cadastro);

    localStorage.setItem('cadastroUsuarios',JSON.stringify(dados));
    alert('Usuário cadastrado!')

    
    
})