/*Primero declaramos la variable donde tendremos un
objeto con los datos correctos de inicio de sesión */
var datos = {
    email:'ejemplo@prueba.com',
    contra:'google123'
}

/*Declaramos nuestras varables necesarias para obtener 
el val de los inputs y añadir sus respectivos eventos 
y mensajes de error */
var btn = document.querySelector('.login');
var btnErr= document.querySelector('.general-error span');
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
function mostrarError(elem,msj,inp){
    elem.innerHTML=''
    elem.innerHTML=msj
    btn.disabled =true
    /*aqui le decimos que si se recibe un parametro inp(input)
    le añada una clase con estilo de error */
    if(inp){
        inp.classList.add('input-error')
    }
}
function ocultarError(elem,inp){
    elem.innerHTML='';
    btn.disabled =false;
    if(inp){
        inp.classList.remove('input-error')
    }
}

/*Declaramos nuestras funciones de validacion de email, es similar a la 
del registro */
function validarEmail(){
    if(email.value==''){
        mostrarError(errEmail,'Este campo debe ser llenado',email)
        return false
    }else{
        if(validEmail.test(email.value)){
            ocultarError(errEmail,email)
            return true
        }else{
            mostrarError(errEmail,'Ingrese un email válido',email)
            return false
        }
    }
}
/**Delcaramos nuestra funcion de validacion para la contraseña, es 
  similar a la del nombre en la practica de registro*/
function validarContra(){
    if(contra.value=='' || contra.value.length<6){
        mostrarError(errContra,'La contraseña debe tener al menos 6 caracteres',contra)
        return false
    }else{
        if(validContra.test(contra.value)){
            ocultarError(errContra,contra)
            return true
        }else{
             mostrarError(errContra,'Ingrese una contraseña válida',contra)
             return false
        }
    }
}

/**Tenemos también nuestra funcion de comprobacion de validaciones */
function comprobarValidaciones(){
    if(validarContra() && validarContra()){
        compararData()
        return true
    }else{
        validarEmail()
        validarContra()
        mostrarError(btnErr,'Debe completar los campos correspondientes correctamente');
        compararData()
        return false
    }
}

/**Estas funciones son nuevas, estas funcione nos sirven
   para mostrar u ocultar un mensaje de error en caso de que el email
   y la contraseña correspondan o no a los datos de inicio 
   de sesión registrados en nuestra variable de objeto datos
 */
function errorData(){
    statusEnvio.innerHTML='<span class="error">El usuario o la contraseña son incorrectos</span>'
    email.classList.add('input-error');
    contra.classList.add('input-error');

}
function ocultarErrData(){
    statusEnvio.innerHTML=''
    email.classList.remove('input-error');
    contra.classList.remove('input-error');
}

/**Esta funcion es meramente informativa, nos muestra cuando se 
 * esta comprobando el envio, ya sea que retorne error o no,
 * solamente muestra que se este enviando la info
 */
function comprobarEnvio(){
    setTimeout(() => {
        ocultarErrData()
    }, 100);
    setTimeout(() => {
        statusEnvio.innerHTML+='<span class="comprobando">Comprobando...</span>'
    }, 300);
}

/*Esta funcion nos compara los valores de los inputs
con nuestra variable de objeto datos, si ambos datos concuerdan
entonces retornara true o false (validos o invalidos) */

function compararData(){
    if(email.value==datos.email && contra.value == datos.contra ){
       return true
    }else{
       return false
    }
}

/*Esta última funcion realiza el login */
function login(){
    //primero muestra el mensaje al usuario de que a info se esta comprobando
   comprobarEnvio();
   /*realiza la comparación */
    if(compararData()){
        //si la comparación es válida, nos redirige a el archivo de index
        setTimeout(() => {
            window.location='http://127.0.0.1:5500/login_register/index.html';
        }, 3000);
    }else{
        //sino es valida, nos mostrara el mensaje de error de datos
        setTimeout(() => {
            errorData();
        }, 3000);
    }  
}
  
/*Adición de eventos */
email.addEventListener("keyup",validarEmail,false);
contra.addEventListener("keyup",validarContra,false);

btn.addEventListener("click",login,false);