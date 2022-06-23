/*Primero declaramos la variable donde tendremos un
objeto con los datos correctos de inicio de sesión */
var datos = {
    email: 'ejemplo@prueba.com',
    contra: 'google123'
}

/*Declaramos nuestras varables necesarias para obtener 
el val de los inputs y añadir sus respectivos eventos 
y mensajes de error */
var btn = document.querySelector('.login');
var btnErr = document.querySelector('.general-error span');
var statusEnvio = document.querySelector('.status')

var email = document.getElementById('email');
var errEmail = document.querySelector('.email span');

var contra = document.getElementById('contra')
var errContra = document.querySelector('.contra span')

/*Guardamos en dos variables nuestras expresiones regulares
para validar el email y la contraseña */
var validEmail = /^\w+@(\w+\.)+\w{2,4}$/;
var validContra = /^[^\s"'()*+,./:;<=>[^{|}~]+$/;

/*Al igual que con el registro tenemos nuestras funciones para
mostrar y ocultar los mensajes de error, en esta ocasión recibimos
3 parametros, uno extra inp para añadir un efecto al input */
function mostrarError(elem, msj, inp) {
    elem.innerHTML = ''
    elem.innerHTML = msj
    btn.disabled = true
    /*aqui le decimos que si se recibe un parametro inp(input)
    le añada una clase con estilo de error */
    if (inp) {
        inp.classList.add('input-error')
    }
}
function ocultarError(elem, inp) {
    elem.innerHTML = '';
    btn.disabled = false;
    if (inp) {
        inp.classList.remove('input-error')
    }
}

/*Declaramos nuestras funciones de validacion de email, es similar a la 
del registro */
function validarEmail() {
    if (email.value == '') {
        mostrarError(errEmail, 'Este campo debe ser llenado', email)
        return false
    } else {
        if (validEmail.test(email.value)) {
            ocultarError(errEmail, email)
            return true
        } else {
            mostrarError(errEmail, 'Ingrese un email válido', email)
            return false
        }
    }
}
/**Delcaramos nuestra funcion de validacion para la contraseña, es 
  similar a la del nombre en la practica de registro*/
function validarContra() {
    if (contra.value == '' || contra.value.length < 6) {
        mostrarError(errContra, 'La contraseña debe tener al menos 6 caracteres', contra)
        return false
    } else {
        if (validContra.test(contra.value)) {
            ocultarError(errContra, contra)
            return true
        } else {
            mostrarError(errContra, 'Ingrese una contraseña válida', contra)
            return false
        }
    }
}

/**Tenemos también nuestra funcion de comprobacion de validaciones */
function comprobarValidaciones() {
    if (validarEmail() && validarContra()) {
        compararDatos()
        return true
    } else {
        validarEmail()
        validarContra()
        mostrarError(btnErr, 'Debe completar los campos correspondientes correctamente');
        compararDatos();
        return false
    }
}

function errorDatos() {
    statusEnvio.innerHTML = ''
    statusEnvio.innerHTML += '<span class="error">El usuario o contraseña no son correctos</span>'
    email.classList.add('input-error');
    contra.classList.add('input-error');
}

function ocultarErrDato() {
    statusEnvio.innerHTML = ''
    email.classList.remove('input-error');
    contra.classList.remove('input-error');
}

function compararDatos() {

    if (email.value == datos.email && contra.value == datos.contra) {
        return true
    } else {
        return false
    }
}
function comprobarDatos() {
    setTimeout(() => {
        statusEnvio.innerHTML = ''
    }, 100);
    setTimeout(() => {
        statusEnvio.innerHTML += '<span class="comprobando">Comprobando...</span>'
    }, 300);
}

/*Esta última funcion realiza el login */
function login() {
    /*Primero comprobamos nuestras validaciones */
    if (comprobarValidaciones()) {
        /**Comprobamos nuestros datos */
        if (compararDatos) {
            /*lanzamos mensaje de comparacion */
            comprobarDatos()
            /**redirigimos a sitio */
            setTimeout(() => {
                ocultarErrDato()
                window.location='http://127.0.0.1:5500/login_register/index.html'
            }, 3000);
        } else {
            /**lanzamos mensaje de comparación */
            comprobarDatos()
            /*mostramos el error */
            setTimeout(() => {
                errorDatos()
            }, 3000);
        }
    } 
}


email.addEventListener("keyup", validarEmail, false);
contra.addEventListener("keyup", validarContra, false);

btn.addEventListener("click", login, false)