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
        nombre: document.getElementById("nombre_cita").value.trim(),
        apellido: document.getElementById("apellido_cita").value.trim(),
        tipo_documento: document.getElementById("tipo_documento").value.trim(),
        Documento: document.getElementById("numero_identidad").value.trim(),
        fecha_deseada: document.getElementById("fecha_deseada").value.trim(),
        Especialidad: document.getElementById("especialidad").value.trim()
    }
    try {
        //const data = await ingresarUsuario();
        //console.log('estos son los datos', data)
        const nuevaCita=await fetch("",{
            method:"POST",
            headers:{"Content-Type": "Application/json"},
            body:JSON.stringify(payload) 

        
        })
        console.log("los datos cargados para una nueva cita son: ",payload)
        if (nuevaCita.ok) {
            alert("la cita has sido creada con exito")
        }
    } catch(err) {
        console.log("error en el servidor", err)
    }
    
}
window.crearCita = crearCita;


async function listar_empleados() {
    const select_empleado = document.getElementById("select_empleado")
    const Especialidad= document.getElementById("especialidad").value.trim()
    const li = document.createElement("li")
    try{
        const li_empleados = await fetch("http://localhost:8080/usuario/empleados",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!li_empleados.ok) {
            alert("error en la funcion")
        }

        if (Especialidad=="Detective") {
            select_empleado.innerHTML=`
            <h1>Funciono</h1>
            `
        }
        else{
            alert("no funciono")
        }
    }catch(err){
    console.log("error en el servidor", err)
}


}
window.listar_empleados=listar_empleados
})

