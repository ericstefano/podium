onload = () => {
    oninput = () => {
        let invalidos = '1234567890!@#$%&*(){}[]-+=_,.<>;?\:/*';
        let ultimoChar = nome.value.charAt(nome.value.length - 1);
        if (invalidos.indexOf(ultimoChar) >= 0){
            nome.value = nome.value.substr(0, nome.value.length - 1);
        }
    }
}
function digitando(){
    oninput = () => {let invalidos = '1234567890!@#$%&*(){}[]-+=_,.<>;?\:/*';
        let ultimoChar = nome.value.charAt(nome.value.length - 1);
        if (invalidos.indexOf(ultimoChar) >= 0){
            nome.value = nome.value.substr(0, nome.value.length - 1);
        }
    }
}