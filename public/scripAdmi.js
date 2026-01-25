
window.cerrarSeccion = cerrarSeccion;
window.ingresarUsuario=ingresarUsuario
window.securePage=securePage
document.addEventListener('DOMContentLoaded',function(){




const nav_admi = document.getElementById("nav_admi");
const _menu = document.getElementById("_menu");
const _seccion = document.getElementById("seccion_class");
const _flecha_ = document.getElementById("arrow");
const _block_admi= document.getElementById("subgrupo")
const _arrow_admi=document.getElementById("arrow_admi")
const _menu_especial=document.getElementById("bage_admi")



_arrow_admi.addEventListener("click",(e)=>{
    e.preventDefault()
    _arrow_admi.classList.toggle("none")
    if (_arrow_admi) {
        console.log("flecha admi detectada")
        _menu_especial.style.display="block"
    }
})
document.addEventListener("keydown",(e)=>{
    if (e.key=='Escape') {
        _menu_especial.style.display='none'
    }
})

_flecha_.addEventListener("click", (e) => {
    e.preventDefault(); 
    _flecha_.classList.toggle("rotar-flecha"); 
    if (_flecha_.classList.contains("rotar-flecha")) {
        console.log("Flecha rotada a 180°")
         _block_admi.style.display='block'

    } else {
        console.log("Flecha regresada a 0°")
        _block_admi.style.display='none'

    }
});

/* no podia hacer que el icono hamburguesa no se desaparesca juego con el nav
asi que lo que se me ocurrio, insertarlo en el section siguiente una vez se le de click
lo que hace es esconder todo e insertarlo en el section con pading fijos */
_menu.addEventListener("click", () => {
  if (nav_admi.style.display === "none") {
    nav_admi.style.display = "block"; //vuelve a colocar el display del nav
  } else {//el else activa mi boton
    nav_admi.style.display = "none";
    _seccion.appendChild(_menu); //en mi css con #_menu inserto el menu el en section
  }
   /* nav_admi.insertBefore(_menu, nav_admi.firstChild); forma para que el menu
   sea el primero antes de que sea hijo del nav solo para saber funciona igual sin 
   esto */


})


})
function loginUsuario() {
    const usuario_ingresado = document.getElementById("usuario").value.trim();
    const contrasenia_ingresada = document.getElementById("password").value.trim();
    const usuarios_y_contrasenias = {
        "admi": "123",       
        "empleado": "321",
        "usuario": "231"
    };

 
    const _usuario_ingresado = document.getElementById("usuario")
        const contrasenia_correcta = usuarios_y_contrasenias[usuario_ingresado];
    const _id_contrasenia=document.getElementById("password")
    
        if (usuario_ingresado === "admi"&&contrasenia_ingresada===contrasenia_correcta ) {
            localStorage.setItem("usuario", "admi");
            window.location.href = "/Administrador";
        }
        if (usuario_ingresado === "admi"&&contrasenia_ingresada!==contrasenia_correcta ) {
                    _id_contrasenia.classList.add('warning')
   
        alert("Error: la contraseña ingresada es incorrecta");
        return
        }
        
         if (usuario_ingresado === "empleado"&&contrasenia_ingresada===contrasenia_correcta) {
            localStorage.setItem("usuario", "empleado");
            window.location.href = "/empleado";
        }
        if (usuario_ingresado === "empleado"&&contrasenia_ingresada!==contrasenia_correcta) {
                    _id_contrasenia.classList.add('warning')
   
        alert("Error: la contraseña ingresada es incorrecta");
        }
        if (usuario_ingresado === "usuario"&&contrasenia_ingresada===contrasenia_correcta) {
            localStorage.setItem("usuario", "user");
            window.location.href = "/usuario";
        }
        if (usuario_ingresado === "usuario"&&contrasenia_ingresada!==contrasenia_correcta) {
                    _id_contrasenia.classList.add('warning')
   
        alert("Error: la contraseña ingresada es incorrecta");
        return
        }
     /* contrasenia_correcta === undefined) */ 

     if (usuario_ingresado === "" || contrasenia_ingresada === "") {
        alert("Por favor, llene todos los datos"); 
         _usuario_ingresado.classList.add('warning')
         _id_contrasenia.classList.add('warning')
        return;
    }
    else {
        _usuario_ingresado.classList.add('warning'); 
        alert("El usuario ingresado no existe");
        return; 
    }
}


export async function ingresarUsuario(){
    let password=document.getElementById("password").value.trim()
    let usuario=document.getElementById("usuario").value.trim()
    const payload={
        nombre:usuario,
        password:password
    }

   
    try{
        const respuesta= await fetch("http://localhost:8080/login",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload) //arma el json con un objeto
        })
        console.log("los datos cargados son:",respuesta)

        if(!respuesta.ok){
            alert("error en el servidor")
            return
        }
        const data=await respuesta.json()
        console.log("los datos del json son: ", data.datos)

        alert(data.mensaje)

        if(data.datos){
            console.log("roll", data.datos.roll)
            console.log("Correo", data.datos.correo)
            console.log("telefono", data.datos.telefono)
            console.log("nombre", data.datos.nombre)
            console.log("usuario", data.datos.usuario)
            console.log("identificacion",data.datos.identificador)
        }
        if(!data.datos){
            console.log("alerta no pasa a data.datos")
        }
        

        if(data.datos){
            localStorage.setItem("roll", data.datos.roll)
            localStorage.setItem("nombre", data.datos.nombre)
            localStorage.setItem("telefono", data.datos.telefono)
            localStorage.setItem("usuario", data.datos.usuario)
            localStorage.setItem("correo",data.datos.correo)
            localStorage.setItem("identificacion", data.datos.identificacion)
        }
        if(data.urlTarget){
            window.location.href=data.urlTarget
        } 
        if(!data.urlTarget){
            console.log("no hay redireccionamiento")
        }
        else{
            console.log("fallo el payload")
        }
        return data;
        
    }catch(err){
        console.log("error de conexion",err)
        alert("no hay conexion con el servidor")
    }
      
    
        
    }



export function securePage() {
    const user = localStorage.getItem("usuario") // se sobreescribe cuando se hace login, dejar asi
    const userR = localStorage.getItem("roll") // se sobreescribe cuando se hace login, dejar asi
    const usuarioPermitidos = ["Administrador", "Empleado", "Cliente"]
    if (!usuarioPermitidos.includes(user) && !usuarioPermitidos.includes(userR)) {
        alert("Usted no tiene los permisos necesarios.")
        window.location.href = "/"
    }
    insertarUsuario(user)
} 
function insertarUsuario(user){
    const nombre = localStorage.getItem("nombre")
    const roll=localStorage.getItem("roll")
    const correo=localStorage.getItem("correo")
    const phone=localStorage.getItem("telefono")
    const nombreUsuario=document.getElementById("nombreUsuario")
    
    const rolUsuario=document.getElementById("rol_usuario")
    const emailUsuario=document.getElementById("correo_bage")
    const teleUsuario=document.getElementById("telefono_bage")
    rolUsuario.textContent=nombre  // este sirve
    nombreUsuario.textContent=roll
    emailUsuario.textContent=correo
    teleUsuario.textContent=phone


}

function traerUsuarios(){
    fetch('http://localhost:3000/Usuario')
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById('Usuario')
      if (data !== null){
        data.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = usuario.nombre + " " + usuario.apellidos;
        ul.appendChild(li); 
      })}
    })}

function elistar_usuarios(){
    fetch('http://localhost:3000/Usuario/cantidad')
    .then(res => res.json())
    .then(data =>{
        const en = document.getElementById("cantidad_usuarios")
        const cantidad = data.total_usuarios;
        en.textContent = `Total de Usuarios: ${cantidad}`;

    })
}


/* document.addEventListener("DOMContentLoaded", function() {


// btn.addEventListener('click', crearUsuario) puede ser util despues

    //Forma para excluir al login del security page
    if (!currentPath.includes("Login") && 
        !currentPath.includes("Registrarse")) {
        securePage();
    }
}); */
function validarFormulario() {
    const _nombre = document.getElementById('nuevo-usuario').value.trim();
    const _apellido = document.getElementById('apellido').value.trim();
    const _documento = document.getElementById('documento').value.trim();
    const _especialidad = document.getElementById('especialidad').value.trim();
    const _estado = document.getElementById('estadoEmpleado').value.trim();

    const fotoInput = document.getElementById('foto_empleado');
    const _foto = fotoInput.files.length > 0 ? fotoInput.files[0] : null //formulario de la foto

    if (!_nombre) { 
        alert('El campo "Nombre" es obligatorio');
        return false;
    } else if (!_apellido) {
        alert('El campo "Apellido" es obligatorio');
        return false;
    } else if (!_documento) {
        alert('El campo "Documento" es obligatorio');
        return false;
    } else if (!_especialidad) {
        alert('El campo "Especialidad" es obligatorio');
        return false;
    } else if (!_estado) { 
        alert('El campo "Estado" es obligatorio');
        return false;
    } else if (!_foto) { 
        alert('El campo "Foto" es obligatorio');
        return false;
    } else {
        alert("Formulario válido, registrando datos...");
        return true;
    }
}
const notificaciones = [
  { titulo: "nueva actualización disponible", fecha: "12/08/2025" },
  { titulo: "tu reporte mensual está disponible", fecha: "12/08/2024" },
  { titulo: "Recordatorio de reuniones", fecha: "21/08/2025" },
  
];

document.addEventListener("DOMContentLoaded", function() {
    const btnNotificaciones = document.getElementById("btnNotificaciones");
    const _modal = document.getElementById("modal_notificaciones");
    const _cerrar = document.getElementById("cerrar_modal");
    const _lista = document.getElementById("lista_notificaciones");
    const _bage=document.getElementById("bage");
     
    bodyElement.addEventListener('click',(e)=>{//forma para detectar clicks nulos
        if (![_bage,_cerrar].includes(e.target)) {
        //alert("click en body vacío");
        _modal.style.display="none"
    }

    })
    _bage.textContent=notificaciones.length;
    notificaciones.forEach(n =>{
        const li = document.createElement("li"); 
        li.textContent = `${n.titulo} - ${n.fecha}` ;
        _lista.appendChild(li);

    })
    btnNotificaciones.addEventListener("click", ()=>{
    _modal.style.display = "block";
    
});
cerrar_modal.addEventListener("click",()=>(
    _modal.style.display="none"
))
})


function editarUsuario(){
    //aqui va el back-end
}
function eliminarUsuario(){
    //aqui va el back-end
}
function inhabilitarUsuario(){
    //aqui va el back-end
}

/* document.getElementById('usuario').addEventListener('blur',()=>{//blur cuando abandona el foco
    const usuario_=document.getElementById('usuario')
    const erro_usuario=document.getElementById("error_password")
    const vacio=usuario_.value.trim()===''
    erro_usuario.style.display=vacio ? 'inline':"none"
    usuario_.classList.toggle('error-input',vacio)

}) //aun no funciona implementat con css

document.getElementById("password").addEventListener('input',()=>{
    const password_=document.getElementById('password')
    const error_password=document.getElementById('error_password')
    const vacion=password_.value.trim()===''
    error_password.style.display=vacion ? "inline" : "none"
    password_.classList.toggle('error-input',vacion) //ambos metodos son para manejar los errores
}) */
document.addEventListener('DOMContentLoaded',function(){
    const _show=document.getElementById("show")
const _hide=document.getElementById("hide")
const contrasenia_ingresada = document.getElementById("password")

_hide.addEventListener('click',()=>{
    if (_hide) {
        _show.style.display="block"
        _hide.style.display="none"
        contrasenia_ingresada.type='text' 
    }

}
)
_show.addEventListener('click',()=>{
    if (_show) {
        _hide.style.display="block"
        _show.style.display="none"
        contrasenia_ingresada.type='password'
    }

})


})

function cerrarSeccion() {
    localStorage.clear();
    window.location.href = "/";
}


