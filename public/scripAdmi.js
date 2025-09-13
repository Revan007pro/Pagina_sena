
function loginUsuario() {
    const usuario_ingresado = document.getElementById("usuario").value.trim();
    const contrasenia_ingresada = document.getElementById("password").value.trim();

    // 2. Definir el objeto de usuarios y contraseñas.
    const usuarios_y_contrasenias = {
        "admi": "123",       
        "empleado": "321",
        "usuario": "231"
    };
    
    // 3. Validar que los campos no estén vacíos.
    if (usuario_ingresado === "" || contrasenia_ingresada === "") {
        alert("Por favor, llene todos los datos"); 
        return;
    }

    // 4. Validar el usuario y la contraseña.
    const contrasenia_correcta = usuarios_y_contrasenias[usuario_ingresado];
    
    if (contrasenia_correcta === undefined) {
        alert("El usuario ingresado no existe");
    } 
    else if (contrasenia_ingresada === contrasenia_correcta) {
        if (usuario_ingresado === "admi") {
            localStorage.setItem("usuario", "admi");
            window.location.href = "/Administrador";
        } else if (usuario_ingresado === "empleado") {
            localStorage.setItem("usuario", "empleado");
            window.location.href = "/empleado";
        } else if (usuario_ingresado === "usuario") {
            localStorage.setItem("usuario", "user");
            window.location.href = "/usuario";
        }
    } 
    else {
        alert("Error: la contraseña ingresada es incorrecta");
    }
}
function securePage() {
   const user = localStorage.getItem("usuario");
    if (user !== "admin") {
        alert("Usted no tiene los permisos necesarios.");
        window.location.href = "/";
    }
    else{
        alert("no funciona seguridad")
    }
    
}

document.addEventListener("DOMContentLoaded", function() {
    const currentPath = window.location.pathname;
    
    //Forma para excluir al login del security page
    if (!currentPath.includes("Login") && 
        !currentPath.includes("Registrarse")) {
        securePage();
    }
});
function validarFormulario() {
    const _nombre = document.getElementById('nuevo-usuario').value.trim();
    const _apellido = document.getElementById('apellido').value.trim();
    const _documento = document.getElementById('documento').value.trim();
    const _especialidad = document.getElementById('especialidad').value.trim();
    const _estado = document.getElementById('estadoEmpleado').value.trim();

    const fotoInput = document.getElementById('foto_empleado');
    const _foto = fotoInput.files.length > 0 ? fotoInput.files[0] : null;

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


function crearUsuario(){
    /*
    Aqui va el escrip para crear un nuevo usuario y añadirlo a la base de datos
    cuando se vea back-end
    */
}

function editarUsuario(){
    //aqui va el back-end
}
function eliminarUsuario(){
    //aqui va el back-end
}
function inhabilitarUsuario(){
    //aqui va el back-end
}



