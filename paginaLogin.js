const botaoEntrar=document.getElementById('btn_entrar');
botaoEntrar.addEventListener('click',()=>{
    let usuario = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let usuariosCadastrados = JSON.parse(localStorage.getItem('cadastroUsuarios'));
    
    for (let i=0;i<usuariosCadastrados.length;i++){
        if (usuario == usuariosCadastrados[i].emailUsuario && senha == usuariosCadastrados[i].senhaUsuario ){
            sessionStorage.setItem("autenticacaoStatus", "Autentificado")
            return window.location.replace('paginaInterna.html')
        }        
    }   

    alert('Dados Incorretos!');


})