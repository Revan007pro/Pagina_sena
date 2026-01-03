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
    localStorage.clear()
    window.location.href = '/';
}

async function crearCita() {
    const payload={
        nombre: document.getElementById("nombre_cita"),
        apellido: document.getElementById("apellido_cita"),
        tipo_documento: document.getElementById("tipo_documento"),
        Documento: document.getElementById("numero_identidad"),
        fecha_deseada: document.getElementById("fecha_deseada"),
        Especialidad: document.getElementById("especialidad")
    }
    try {
        //const data = await ingresarUsuario();
        //console.log('estos son los datos', data)
        const nuevaCita=await fetch("",{
            method:"POST",
            headers:{"Content-Type": "Application/json"},
            body:JSON.stringify(nuevaCita) 
        })
        console.log("los datos cargados para una nueva cita son: ",nuevaCita)
    } catch(err) {
        console.log("error en el servidor", err)
    }
}

})

