var listaImagenes = ["aubergine", "banana", "carrots", "cherries",
    "dollar", "lemon", "orange", "peach", "potato", "tomato"
];
//Separamos las frutas de las verduras
var hortalizas = ["aubergine", "carrots", "potato", "tomato"];
var frutas = ["banana", "cherries", "lemon", "orange", "peach"];


// Enlazamos los id de las monedas con el documento de javaScript y le asignamos unas variables
var texto = document.getElementById("intromonedas")
var monedas = document.getElementById("monedas");
var cantidadMonedas = 0;



//En el id introducir agregamos el evento click para elegir las monedas
document.getElementById("introducir").addEventListener('click', elegirMonedas);
//Enlazo los botones con JavaSccript de introducir, tirar y salir
const botonTirar = document.getElementById("tirar");
const botonSalir = document.getElementById("salir");
var selected = false;
//Enlazo el elemento que voy a usar para mostrar las monedas
var displayMonedas = document.getElementById("insertarMonedas");


//Enlazando las imágenes con JS
const imagenUno = document.getElementById("imagen1");
const imagenDos = document.getElementById("imagen2");
const imagenTres = document.getElementById("imagen3");

//Creo variables para utilizarlas en la función  y puntaje
var image1;
var image2;
var image3;

//Enlazo la lista del historial con el id de HTML
const historialTiradas = document.getElementById('historialTiradas');
var tiradas = 0;


//Para que la palanca suba y  baje haciendo click con el ratón
botonTirar.addEventListener('mousedown', eventoPalanca);
botonTirar.addEventListener('mouseup', eventoPalanca);

//Creo una función para insertar las monedas con las que vamos a jugar
function elegirMonedas() {
    monedas = document.getElementById("monedas");
    cantidadMonedas = parseInt(monedas.value);
    console.log("Empiezo con:" + cantidadMonedas);
    monedas.value = "0";
    displayMonedas.setAttribute("value", cantidadMonedas);
    desactivarMonedas();
    //Llamo a la función del historial para que agregue en su contenido las monedas introducidas
    pintarHistorial("Has introducido " + cantidadMonedas + " monedas");
}

//Creo una función para las tiradas
function tirarPalanca() {
    //Si la cantidad de monedas es cero que salte una alerta de que tiene que introducir monedas
    if (cantidadMonedas == 0 ) {
        alert("Inserta monedas para jugar");
        location.reload();

    } else {
        //Resto lo que cuesta una tirada, que es una moneda
        tiradas += 1;
        cantidadMonedas -= 1;
        console.log("antes: " + cantidadMonedas);
        actualizarDatos();
        pintarHistorial("Gastas una moneda."); //Envío los datos del gasto de una moneda al historial
        generarImagenes();

    }



}


//Creo una función para desactivar las monedas para que no se puedan introducir más
function desactivarMonedas() {
    document.querySelector(".contadores1").disabled = true;
    document.querySelector(".boton").disabled = true;
}
//Creo una función para volver  a activar las monedas una vez que pulsemos el botón salir
function activarMonedas() {

    document.querySelector(".contadores1").disabled = false;
    document.querySelector(".boton").disabled = false;

}


//Creamos la función para que la palanca suba y baje
function eventoPalanca(evento) {

    if (evento.type == "mousedown") {
        botonTirar.setAttribute("src", "img/palancaDOWN.png");
        tirarPalanca();
    } else
        botonTirar.setAttribute("src", "img/palancaUP.png");


}

//Actualizamos los datos de la cantidad de monedas que hemos introducido
function actualizarDatos() {
    displayMonedas.setAttribute("value", cantidadMonedas);

}
//Creamos la función para generar las diferentes imágenes

function generarImagenes() {
    var n1 = Math.round(Math.random() * 9);
    var n2 = Math.round(Math.random() * 9);
    var n3 = Math.round(Math.random() * 9);
    image1 = listaImagenes[n1];
    image2 = listaImagenes[n2];
    image3 = listaImagenes[n3];
    pintarImagenes();
}

//Creamos la función para asociar las imágenes y calculamos el premio que da llamando a a función calcularPremio
function pintarImagenes() {
    imagenUno.src = "./img/" + image1 + ".png";
    imagenDos.src = "./img/" + image2 + ".png";
    imagenTres.src = "./img/" + image3 + ".png";
    calcularPremio();
}
//Creamos la función para calcular el premio que se recibe según las diferentes combinaciones
function calcularPremio() {
    //Si salen tres dollares se ganan 10 monedas
    if (image1 == "dollar" && image2 == "dollar" && image3 == "dollar") {
        sumar(10);
        pintarHistorial("¡¡Tres MONEDAS!! Ganas 10 monedas."); // El mensaje que aparece en el historial
        //Si salen dos dollares se ganan 4 monedas   
    } else if ((image1 == "dollar" && image2 == "dollar") || (image2 == "dollar" && image3 == "dollar") || (image1 == "dollar" && image3 == "dollar")) {
        sumar(4);
        pintarHistorial("¡¡Dos MONEDAS!! Ganas 4 monedas."); // El mensaje que aparece en el historial
        //Si salen tres furtas o hortalizas iguales se ganan 5 monedas
    } else if ((image1 == image2 && image2 == image3) && ((esHortaliza(image1) && esHortaliza(image2) &&
            esHortaliza(image3) || (esFruta(image1) && esFruta(image2) && esFruta(image3))))) {
        sumar(5);
        pintarHistorial("¡¡Tres IGUALES!! Ganas 5 monedas."); // El mensaje que aparece en el historial
        //Si sale una dollar o dos frutas o hortalizas iguales ganas 3 monedas
    } else if (((image1 == image2 && esHortaliza(image1) && esHortaliza(image2) && image3 == "dollar") ||
            (image2 == image3 && esHortaliza(image2) && esHortaliza(image3) && image1 == "dollar") ||
            (image1 == image3 && esHortaliza(image1) && esHortaliza(image3) && image2 == "dollar")) ||
        ((image1 == image2 && esFruta(image1) && esFruta(image2)) && image3 == "dollar" ||
            (image2 == image3 && esFruta(image2) && esFruta(image3)) && image1 == "dollar" ||
            (image1 == image3 && esFruta(image1) && esFruta(image3)) && image2 == "dollar")) {
        sumar(3);
        pintarHistorial("¡¡Dos IGUALES y una MONEDA!! Ganas 3 monedas."); // El mensaje que aparece en el historial

        //Si sale un dollar se gana una moneda
    } else if ((image1 == "dollar" && image2 != "dollar" && image3 != "dollar") ||
        (image2 == "dollar" && image1 != "dollar" && image3 != "dollar") ||
        (image3 == "dollar" && image1 != "dollar" && image2 != "dollar")) {
        sumar(1);
        pintarHistorial("¡¡Una MONEDA!! Ganas 1 moneda."); // El mensaje que aparece en el historial
        //Si salen dos hortalizas o frutas iguales se ganan 2 monedas  
    } else if ((((image1 == image2 && esHortaliza(image1) && esHortaliza(image2)) ||
                (image2 == image3 && esHortaliza(image2) && esHortaliza(image3)) ||
                (image1 == image3 && esHortaliza(image1) && esHortaliza(image3))) ||
            ((image1 == image2 && esFruta(image1) && esFruta(image2)) ||
                (image2 == image3 && esFruta(image2) && esFruta(image3)) ||
                (image1 == image3 && esFruta(image1) && esFruta(image3))))) {
        sumar(2);
        pintarHistorial("¡¡Dos IGUALES!! Ganas 2 monedas"); // El mensaje que aparece en el historial

    }

}

//Creo la función para sumar las monedas que se van ganando
function sumar(monedas) {
    cantidadMonedas += monedas; //cantidad monedas = cantidadMonedas + monedas.
    actualizarDatos();
}
//Creo la función para que me devuelva el valor de las hortalizas
function esHortaliza(valor) {
    return hortalizas.includes(valor);
}
//Creo la función para que me devuelva el valor de las frutas
function esFruta(valor) {
    return frutas.includes(valor);
}
//Creo la función para que se vaya creando el historial de las tiradas
function pintarHistorial(mensaje) {

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(mensaje));
    historialTiradas.appendChild(li);

}

//Creo la función salir para que cuando pulse el botón salir salgamos de la partida y nos guarde las monedas que llevamos
function salir() {
    alert("Has conseguido un total de: " + cantidadMonedas + " monedas");
    activarMonedas();
    monedas.value = cantidadMonedas;
    displayMonedas.value = 0;
    pintarHistorial("Has sacado todas las monedas.");



}
//Para que al hacer click en el botón salir, salgamos del juego
botonSalir.addEventListener('click', salir);