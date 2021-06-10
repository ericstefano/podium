<<*TEMPLATE DE CÓDIGOS PADRÃO PARA HEADER E FOOTER*>>

HTML:
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Podium</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Cantora+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="estilosInterna.css">
</head>

<body class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-dark fixed-top py-0 gradient1 shadow">
        <div class="container-fluid max-size">
            <a class="navbar-brand py-1 ms-0" href="#home">
                <img src="img/logo2.png" class="element-shadow" alt="logo" width="52px" height="52px">
                <span class="navbar-logo-text font-cantora-one bold text-shadow">Podium</span>
            </a>
            <button class="navbar-toggler element-shadow border-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse font-noto-sans bold text-shadow" id="navbarSupportedContent">
                <ul class="navbar-nav ps-3">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="pagina1" href="#">pagina 1</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="pagina2" href="#">pagina 2</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="pagina3" href="#">pagina 3</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <footer class="gradient1 mt-auto"></footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous">
        </script>
</body>

</html>

CSS:
body {
    background-color: #00ffdf;
}

/* NAVBAR */

.navbar-logo-text {
    display: inline-block;
    vertical-align: middle;
    font-size: 25px;
}

.navbar-toggler-icon {
    background-image: url(./img/burger-icon.png) !important;
}

.navbar-toggler:focus, .navbar-toggler:active, .navbar-toggler-icon:focus {
    box-shadow: none;
}

/* FIM: NAVBAR */

/* GRADIENTE HEADER E FOOTER */

.gradient1 {
    background: linear-gradient( 270deg, #00D1D5 19.27%, rgba(0, 228, 215, 0.84) 42.19%, #00F4DB 58.33%, #00F9DD 72.92%, #00FFDF 78.64%, #00FCDE 87.88%, rgba(0, 236, 217, 0.917419) 94.16%, rgba(0, 217, 214, 0.934545) 100%);
}

.gradient2 {
    background: radial-gradient( 14722% 4653.11% at 54.13% 52.82%, #00D1D5 19.27%, rgba(0, 228, 215, 0.84) 42.19%, #00F4DB 58.33%, #00F9DD 76.56%, #00FFDF 100%);
}

/* FIM: GRADIENTE HEADER E FOOTER */

.max-size {
    max-width: 600px;
}

.font-cantora-one {
    font-family: 'Cantora One', sans-serif;
}

.font-noto-sans {
    font-family: 'Noto Sans', sans-serif;
}

.text-shadow {
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
}

.text-shadow2 {
    text-shadow: 0 0.025rem 0.05rem rgba(0, 0, 0, .15) !important;
}

.element-shadow {
    filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.4));
}

.box-shadow {
    box-shadow: 0 .2rem .4rem rgba(0, 0, 0, .15) !important;
}

.bold {
    font-weight: bold;
}

footer {
    height: 3.5em;
}