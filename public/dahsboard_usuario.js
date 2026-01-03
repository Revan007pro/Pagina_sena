import { ingresarUsuario } from "/scripAdmi.js";

document.addEventListener('DOMContentLoaded', () => {
    const arrow_usuario = document.getElementById("flecha_usuario");
    const bage_usuario = document.getElementById("bage_usuario");

    if (arrow_usuario && bage_usuario) { 
        arrow_usuario.addEventListener("click", () => {
            bage_usuario.style.display = (bage_usuario.style.display === 'none') ? 'block' : 'none';
        });
    } else {
        console.log("error en el escuchador");
    }
    
    const cerrarBtn = document.getElementById("cerrar_seccion");
    if (cerrarBtn) {
        cerrarBtn.addEventListener("click", cerrarSeccion);
    }

function cerrarSeccion() {
    window.location.href = '/';
}

async function cita() {
    try {
        const data = await ingresarUsuario();
        console.log('estos son los datos', data)
    } catch(err) {
        console.log("error en el servidor", err)
    }
}

})

