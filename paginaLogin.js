function LoginFake() {

    let login_padrao = "admin";
    let senha_padrao = "admin";

    let usuario = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    console.log(usuario);

    if (usuario == login_padrao && senha == senha_padrao) { 
        alert("Logado com sucesso!");
        location.replace("paginaGeral.html");
    } else {
        alert("Dados incorretos");
    }
}