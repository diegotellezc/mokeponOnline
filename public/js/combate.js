const sectionSeleccionarAtaque = document.getElementById("elegirAtaque")
const sectionReiniciar = document.getElementById("reiniciar") 
const botonMascotaJugador = document.getElementById("boton-mascota")
const reiniciarJuego = document.getElementById("boton-reiniciar")

const spanMascotaJugador = document.getElementById("mascotaJugador")
const spanMokeponElegido = document.getElementById("foto-mokepon-elegido")
const spanMascotaPc = document.getElementById("mascotaPc")
const spanMokeponElegidoPc = document.getElementById("foto-mokepon-elegido-pc")

const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasPc = document.getElementById("vidasPc")

const sectionMensajes = document.getElementById("resultado")
const ataquesJugador = document.getElementById("ataques-del-jugador")
const ataquesEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataquePc = []
let resultadoCombate
let opcionDeMokepones
let inputHipodoge
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let botonFuego
let botonAgua
let botonTierra
let botones = []
let ataquesMokeponEnemigo = []
let indexAtaqueJugador
let indexAtaquePc
let victoriasJugador = 0
let victoriasPc = 0
let lienzo = mapa.getContext("2d")
let intervalo
let numAleatorioPc
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


let vidasJugador = 3
let vidasPc = 3

class Mokepon {
    constructor(nombre, foto, vida, tipo, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.tipo = tipo
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto)

    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "Tipo agua", "./assets/mokepons_mokepon_hipodoge_attack.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "Tipo tierra", "./assets/mokepons_mokepon_capipepo_attack.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "Tipo fuego", "./assets/mokepons_mokepon_ratigueya_attack.png")
let tucapalma = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", 5, "Tipo agua", "./assets/mokepons_mokepon_tucapalma_attack.png")
let pydos = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", 5, "Tipo tierra", "./assets/mokepons_mokepon_pydos_attack.png")
let langostelvis = new Mokepon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.png", 5, "Tipo fuego", "./assets/mokepons_mokepon_langostelvis_attack.png")


const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "boton-agua"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🌱", id: "boton-tierra"}
]

const CAPIPEPO_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "🌱", id: "boton-tierra"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "🔥", id: "boton-fuego"}
]

const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "🔥", id: "boton-fuego"},
    { nombre: "💧", id: "boton-agua"},
    { nombre: "🌱", id: "boton-tierra"}
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

tucapalma.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

pydos.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

langostelvis.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(hipodoge, capipepo, ratigueya, tucapalma, pydos, langostelvis)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `<input type = "radio" name = "mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}<br>${mokepon.tipo}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`

        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputTucapalma = document.getElementById("Tucapalma")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputPydos = document.getElementById("Pydos")
    })


    sectionReiniciar.style.display = "none"    
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)   
    reiniciarJuego.addEventListener("click", reiniciarElJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://192.168.0.14:8080/unirse")
        .then(function (res) {
            if(res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                        
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
        spanMokeponElegido.innerHTML = `<label class="icono-de-mokepon">
               <img src=${hipodoge.foto} alt=${hipodoge.nombre}>
        </label>`
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        spanMokeponElegido.innerHTML = `<label class="icono-de-mokepon">
               <img src=${capipepo.foto} alt=${capipepo.nombre}>
        </label>`
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
        spanMokeponElegido.innerHTML = `<label class="icono-de-mokepon">
               <img src=${ratigueya.foto} alt=${ratigueya.nombre}>
        </label>`
    } else if(inputTucapalma.checked){
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
        spanMokeponElegido.innerHTML = `<label class="icono-de-mokepon">
               <img src=${tucapalma.foto} alt=${tucapalma.nombre}>
        </label>`
    } else if(inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
        spanMokeponElegido.innerHTML = `<label class="icono-de-mokepon">
               <img src=${langostelvis.foto} alt=${langostelvis.nombre}>
        </label>`
    } else if(inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
        spanMokeponElegido.innerHTML = `<label class="icono-de-mokepon">
               <img src=${pydos.foto} alt=${pydos.nombre}>
        </label>`
    } else {
        alert("Debes seleccionar a un Mokepon")
        return
    }
        
    
    let sectionSeleccionarMascota = document.getElementById("seleccionMascota")
    sectionSeleccionarMascota.style.display = "none"
        
    let sectionSeleccionarAtaque = document.getElementById("elegirAtaque")

    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    
    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
        
    
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.0.14:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="botones-ataques BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    });

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")
}

function seleccionarMascotaPc(enemigo){
    spanMascotaPc.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    spanMokeponElegidoPc.innerHTML = `<label class="icono-de-mokepon">
    <img src=${enemigo.foto} alt=${enemigo.nombre}>
    </label>`
    secuenciaAtaque()
    }

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent === "🔥"){
                ataqueJugador.push("🔥")
                                boton.style.background = "#505050"
                boton.disabled = true
            } else if (e.target.textContent === "💧"){
                ataqueJugador.push("💧")
                                boton.style.background = "#505050"
                boton.disabled = true
            } else {
                ataqueJugador.push("🌱")
                boton.style.background = "#505050"
                boton.disabled = true
            }
            
            if (ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.0.14:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.0.14:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        console.log(ataques)
                        if(ataques.length === 5) {
                            ataquePc = ataques
                            combate()
                        }
                    })
        }

    })
}

function ataqueEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length - 1)
    
    ataquePc.push(ataquesMokeponEnemigo[ataqueAleatorio].nombre)
    ataquesMokeponEnemigo.splice(ataqueAleatorio,1)

    
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaquePc = ataquePc[enemigo]
}

function combate(){
    clearInterval(intervalo)
    
    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataquePc[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === "🔥" && ataquePc[index] === "🌱"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] == "💧" && ataquePc[index] == "🔥"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] == "🌱" && ataquePc[index] == "💧"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasPc++
            spanVidasPc.innerHTML = victoriasPc
        }
    }

        revisarVidas()
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultadoCombate
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaquePc

    ataquesJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function revisarVidas(){
    if(victoriasJugador === victoriasPc){
        crearMensajeFinal("Esto fue un empate")
    } else if(victoriasJugador > victoriasPc){
        crearMensajeFinal("!GANASTE! 😁")
    } else {
        crearMensajeFinal("!PERDISTE! 😔")
    }
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = "flex"
}

function reiniciarElJuego(){
    location.reload()
} 

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground, 
        0, 
        0, 
        mapa.width, 
        mapa.height
        )
    
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.0.14:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    if(enemigos.length === 0) {
                        console.log("todavia no hay enemigos")
                    }
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Hipodoge"){
                            mokeponEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "Tipo agua", "./assets/mokepons_mokepon_hipodoge_attack.png", enemigo.id)
                        } else if(mokeponNombre === "Capipepo"){
                            mokeponEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "Tipo tierra", "./assets/mokepons_mokepon_capipepo_attack.png", enemigo.id)
                        } else if(mokeponNombre === "Ratigueya"){
                            mokeponEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "Tipo fuego", "./assets/mokepons_mokepon_ratigueya_attack.png", enemigo.id)
                        } else if(mokeponNombre === "Tucapalma"){
                            mokeponEnemigo = new Mokepon("Tucapalma", "./assets/mokepons_mokepon_tucapalma_attack.png", 5, "Tipo agua", "./assets/mokepons_mokepon_tucapalma_attack.png", enemigo.id)
                        } else if(mokeponNombre === "Pydos"){
                            mokeponEnemigo = new Mokepon("Pydos", "./assets/mokepons_mokepon_pydos_attack.png", 5, "Tipo tierra", "./assets/mokepons_mokepon_pydos_attack.png", enemigo.id)
                        } else if(mokeponNombre === "Langostelvis"){
                            mokeponEnemigo = new Mokepon("Langostelvis", "./assets/mokepons_mokepon_langostelvis_attack.png", 5, "Tipo fuego", "./assets/mokepons_mokepon_langostelvis_attack.png", enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x || 0
                        mokeponEnemigo.y = enemigo.y || 0
                        return mokeponEnemigo
                    })
                })
        }
    })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    
    if(abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo){
            return; 
        }
    
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaPc(enemigo)
}

window.addEventListener("load", iniciarJuego)