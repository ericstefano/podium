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

        let necessario = '@';

        if (email.value.length == 0) {
            instrucoes3.innerHTML = '*';
            instrucoes3.style.color = '#F00';
            instrucoes3.style.fontSize = '2em';

            emailValidacao=false;
        } else instrucoes3.innerHTML = ''; 


        if (email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1){
            alert("Por favor insira um e-mail válido.");
            emailValidacao=false;                     
        } else {
            instrucoes3.innerHTML = '';
        }

    senha.onblur = () => {
        if (senha.value.length == 0) {
            instrucoes4.innerHTML = '*';
            instrucoes4.style.color = '#F00';
            instrucoes4.style.fontSize = '2em';
        } else {
            instrucoes4.innerHTML = '';
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
    window.location.replace('paginaLogin.html'); 
})

function verificar() {
    let especiais = '!@#$%&*(){}[]\/<>|?+-';
    let minusculo = 'qwertyuiopçlkjhgfdsazxcvbnm';
    let maiusculo = 'QWERTYUIOPASDFGHJKLÇZXCVBNM';
    let numeros = '1234567890';
    let qtde1 = 0;
    let qtde2 = 0;
    let qtde3 = 0;
    let qtde4 = 0;
    let requesitos = 0
    let checkBox = document.getElementById("termos");
    if(nome.value == 0){
        alert('Digite um nome');
        nome.focus();
        return false;
    }
    if(sobrenome.value == 0){
        alert('Digite um sobrenome');
        sobrenome.focus();
        return false;
    }
    if(email.value == 0){
        alert('Digite um email');
        email.focus();
        return false;
    }
    if(senha.value == 0){
        alert('Digite uma senha');
        return false;
    }
    if(senha.value.indexOf(' ') >= 0){
        alert('A senha não pode conter espaços')
        senha.value = '';
        senha.focus();
        return false;
    }else{
        requesitos++;
    }
    if(email.value.indexOf(' ') >= 0){
        alert('O email não pode conter espaços')
        email.value = '';
        email.focus();
        return false;
    }else{
        requesitos++;
    }
    for (let i = 0; i < especiais.length - 1; i++) {
        if (senha.value.indexOf(especiais[i]) >= 0) {
            qtde1++;
        }
    }
    if (qtde1 > 0) {
        requesitos++;
    } else {
        alert('A senha deve conter caracter especial');
        senha.value = '';
        senha.focus();
        return false;
    }
    for (let j = 0; j < minusculo.length - 1; j++) {
        if (senha.value.indexOf(minusculo[j]) >= 0) {
            qtde2++;
        }
    }
    if (qtde2 > 0) {
        requesitos++;
    } else {
        alert('A senha deve conter letra minúscula');
        senha.value = '';
        senha.focus();
        return false;
    }
    for (let k = 0; k < numeros.length - 1; k++) {
        if (senha.value.indexOf(numeros[k]) >= 0) {
            qtde3++;
        }
    }
    if (qtde3 > 0) {
        requesitos++;
    } else {
        alert('A senha deve conter número');
        senha.value = '';
        senha.focus();
        return false;
    }
    for (let l = 0; l < maiusculo.length - 1; l++) {
        if (senha.value.indexOf(maiusculo[l]) >= 0) {
            qtde4++;
        }
    }
    if (qtde4 > 0) {
        requesitos++;
    } else {
        alert('A senha deve conter letra maiúscula');
        senha.value = '';
        senha.focus();
        return false;
    }
    if(senha.value.length >= 8 && senha.value.length <= 12){
        requesitos++;
    }else{
        alert('A senha deve conter entre 8 e 12 caracteres');
        senha.value = '';
        senha.focus();
        return false;
    }
    if(email.value.indexOf('@') >= 0){
        requesitos++;
    }else{
        alert('O email deve ser um email válido');
        email.value ='';
        email.focus();
        return false;
    }
    if(checkBox.checked == false){
        alert('É preciso aceitar os termos do Podium');
        return false;
    }
    if(requesitos == 8){
        alert('Cadastro realizado com sucesso');
        window.location.replace("paginaGeral.html");
        return true;
    }
}
    }}
