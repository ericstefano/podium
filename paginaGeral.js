/* declaração de variáveis globais */

const carouselTrack = document.querySelector('.carousel__track'); //selecionando o <ul> que contém os slides
const slides = Array.from(carouselTrack.children); //gerando um array com os slides
const botaoProximo = document.querySelector('.carousel__button--right');
const botaoAnterior = document.querySelector('.carousel__button--left');
const pontosNav = document.querySelector('.carousel__nav');
const pontos = Array.from(pontosNav.children);

//Determinando a largura de um slide
const slideWidth=slides[0].getBoundingClientRect().width;

//colocando os slides um do lado do outro
slides.forEach(setSlidePosition);

//ao clicar na na flexa apontada para a esquerda, mover p/ o slide da esquerda
botaoAnterior.addEventListener('click', e=>{
    const slideAtual = carouselTrack.querySelector('.current-slide');
    const slideAnterior=slideAtual.previousElementSibling;
    const indexAnterior=slides.findIndex(slide=> slide === slideAnterior);    

    const pontoAtual=pontosNav.querySelector('.current-slide');
    const pontoAnterior=pontoAtual.previousElementSibling;    

    moveToSlide(carouselTrack,slideAtual,slideAnterior);
    atualizarPontos(pontoAtual, pontoAnterior);
    mostrarEsconderSetas(slides,botaoAnterior,botaoProximo,indexAnterior);
})

//ao clicar na na flexa apontada para a direita, mover p/ o slide da direita
botaoProximo.addEventListener('click', e=>{
    const slideAtual = carouselTrack.querySelector('.current-slide');
    const proximoSlide=slideAtual.nextElementSibling;
    const indexProximo=slides.findIndex(slide=> slide === proximoSlide);

    const pontoAtual=pontosNav.querySelector('.current-slide');
    const proximoPonto=pontoAtual.nextElementSibling;

    moveToSlide(carouselTrack,slideAtual,proximoSlide);
    atualizarPontos(pontoAtual, proximoPonto);
    mostrarEsconderSetas(slides,botaoAnterior,botaoProximo,indexProximo);
})

//ao clicar em um dos três pontos, exibir o slide selecionado
pontosNav.addEventListener('click',e=>{
    //determinar qual dos pontos foi clicado 
    const pontoAlvo=e.target.closest('button');
    
    //caso clique em algo que não seja ponto, pontoAlvo = null, e não faz sentido proseguir com a execução da função
    if (pontoAlvo === null) return;

    //caso pontoAlvo != null, as linhas abaixo serão executadas
    const slideAtual = carouselTrack.querySelector('.current-slide');
    const pontoAtual = pontosNav.querySelector('.current-slide');
    const indexSlideAlvo=pontos.findIndex(ponto=>ponto === pontoAlvo);
    const slideAlvo=slides[indexSlideAlvo];    

    moveToSlide(carouselTrack, slideAtual, slideAlvo);
    atualizarPontos(pontoAtual,pontoAlvo);
    mostrarEsconderSetas(slides,botaoAnterior,botaoProximo,indexSlideAlvo);

})



/* definição de funções */

//função para determinar o posicionamento de cada slide de acordo com a ordenação (o 1º fica mais a esquerda, o 2º no meio e o 3º mais a direita)
function setSlidePosition (slide, index) {
    slide.style.left=slideWidth*index + 'px';
}

function moveToSlide(carouselTrack,slideAtual,slideAlvo){
    carouselTrack.style.transform='translateX(-' + slideAlvo.style.left + ')'; //movimentar o carouselTrack de acordo com o slide que iremos mostrar
    slideAtual.classList.remove('current-slide');
    slideAlvo.classList.add('current-slide');
}

function atualizarPontos(pontoAtual,pontoAlvo){
    pontoAtual.classList.remove('current-slide');
    pontoAlvo.classList.add('current-slide');
}

function mostrarEsconderSetas(slides,botaoAnterior,botaoProximo,indexAlvo){
    if(indexAlvo === 0){
        botaoAnterior.classList.add('is-hidden');
        botaoProximo.classList.remove('is-hidden');
    } else if (indexAlvo === slides.length -1){
        botaoAnterior.classList.remove('is-hidden');
        botaoProximo.classList.add('is-hidden');
    } else {
        botaoProximo.classList.remove('is-hidden');
        botaoAnterior.classList.remove('is-hidden');
    }


}

