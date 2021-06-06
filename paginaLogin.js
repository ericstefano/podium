const botaoEntrar=document.getElementById('btn_entrar');
botaoEntrar.addEventListener('click',()=>{
    let usuario = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let usuariosCadastrados = JSON.parse(localStorage.getItem('cadastroUsuarios'));
    console.log(usuariosCadastrados);
    console.log(usuariosCadastrados[0].emailUsuario);
    
    for (let i=0;i<usuariosCadastrados.length;i++){
        if (usuario == usuariosCadastrados[i].emailUsuario && senha == usuariosCadastrados[i].senhaUsuario ){
            return alert('Sucesso! Página interna será carregada.')
        }        
    }   

    alert('Dados Incorretos!');


})