import { ingresarUsuario ,securePage} from "/scripAdmi.js";
document.addEventListener('DOMContentLoaded', function (){

    securePage()
    

    const arrow_usuario = document.getElementById("flecha_usuario")
    const bage_usuario = document.getElementById("bage_usuario")
    let empleadoSeleccionadoNombre = ""
    let empleadoSeleccionadoId = null

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

async function crearCita(select_empleado, emp) {
    const payload = {
        idEmpleado: empleadoSeleccionadoId,
        idCliente: parseInt(localStorage.getItem("identificacion")),
        sedeId: 1,
        especialidad: document.getElementById("especialidad").value.trim(),
        fecha: document.getElementById("fecha_deseada").value,
        horaInicio: document.getElementById("horario_seleccionado").value,
        nombreEspecialista: empleadoSeleccionadoNombre
    };

   try {
    const respuesta = await fetch("http://localhost:8080/guardar/cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    // Convertir la respuesta a objeto JSON
    const datos = await respuesta.json(); 

    if (respuesta.ok) {
        alert("¡Éxito!: " + datos.mensaje);
    } else {

        alert("Error del servidor: " + (datos.mensaje || "Error interno"));
    }

} catch (err) {
    console.error("Error de red:", err);
    alert("No se pudo conectar con el backend.");
}
}



async function listar_empleados(Especialidad,horarioCitas) {
    const select_empleado = document.getElementById("select_empleado")
    await limpiarSuave(select_empleado)

   // select_empleado.innerHTML = "" // limpia el contenedor



    try{
        const li_empleados = await fetch("http://localhost:8080/usuario/empleados",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            
        })
        const listaEmpleados = await li_empleados.json()
        console.log(listaEmpleados)

        if (!li_empleados.ok) {
            alert("error en la funcion")
        }
        switch (Especialidad) {
            case "Detective":
            case "Abogado":
            case "Poligrafista":
                let empleado = listaEmpleados.filter(emp => emp.usuario.roll === Especialidad)
                const divEmp = document.createElement("div")

               empleado.forEach(emp => {

                     
                    divEmp.className = "flex flex-col border border-gray-300 hover:shadow-lg p-4 mb-4 rounded \n\
                                    cursor-pointer fade-in"
                    divEmp.innerHTML = `
                        <h3 class="font-bold">Especialista Asignado</h3>
                        <p><strong>Nombre:</strong> ${emp.usuario.nombre} ${emp.usuario.apellidos}</p>
                        <p><strong>Especialidad:</strong> ${emp.usuario.roll}</p>
                        <p><strong>Identificación:</strong> ${emp.idEmpleado}</p>
                        
                    `
                   divEmp.addEventListener("click", () => {
                        horarioCitas.classList.remove("hidden")
                        const todos = select_empleado.querySelectorAll('div')
                        todos.forEach(d => d.classList.remove("ring-2", "ring-sky-500", "border-sky-500"))
                        

                        divEmp.classList.add("ring-2", "ring-sky-500", "border-sky-500")
                    
            empleadoSeleccionadoNombre = emp.usuario.nombre;
        
                    
                        empleadoSeleccionadoNombre = emp.usuario.nombre
                        empleadoSeleccionadoId = emp.idEmpleado;
                        console.log("Empleado seleccionado:", empleadoSeleccionadoNombre)
                        console.log("Empleado id:", emp.idEmpleado)
                    })
                   
                    select_empleado.appendChild(divEmp)
   
                })
                
               
                break;

            default:
                select_empleado.innerHTML = ""
                break
        }

       /* if (Especialidad === "Detective") {
            const empleadoEncontrado = listaEmpleados.find(emp => emp.usuario.roll === "Detective");
            if (empleadoEncontrado) {
                select_empleado.innerHTML = `
                    <h1>Empleado: ${empleadoEncontrado.usuario.nombre}</h1>
                    <p>Rol: ${empleadoEncontrado.usuario.roll}</p>
                `
            } else {
                select_empleado.innerHTML = "<h1>No hay detectives disponibles</h1>";
            }
        } else {
            select_empleado.innerHTML = ""
        } */
}catch(err){
    console.log("error en el servidor", err)
}


}function limpiarSuave(element) {
    return new Promise((ya) => {
        element.classList.add("fade-out")

        setTimeout(() => {
            element.innerHTML = ""
            element.classList.remove("fade-out")
            element.classList.add("fade-in")
            ya()
        }, 400)
    })

}
function seleccionarHorario(elemento, horaLimpia) {
    const todos = document.querySelectorAll('.label-horario');
    
    // Si horaLimpia existe, usamos esa. Si no, usamos el texto (como respaldo)
    const valorParaGuardar = horaLimpia || elemento.innerText;
    document.getElementById("horario_seleccionado").value = valorParaGuardar;

    // Estética de selección
    todos.forEach(l => l.classList.remove('bg-sky-500', 'text-white', 'border-sky-500'));
    elemento.classList.add('bg-sky-500', 'text-white', 'border-sky-500');

    console.log("Hora lista para enviar a Java:", valorParaGuardar);
}


async function crearUsuario(){
const newPayload = {
        new_nombres: document.getElementById("new_nombre").value.trim(),
        new_apellidos: document.getElementById("new_apellidos").value.trim(),
        new_apellido2: document.getElementById("new_apellidos2").value.trim(),
        fecha_nacimiento: document.getElementById("new_fecha_nacimiento").value.trim(),
        new_correo: document.getElementById("new_email").value.trim(),
        new_contrasenia: document.getElementById("password_registro").value.trim(),
        confirmar_new_contrasenia: document.getElementById("confirm-password").value.trim(),
        new_telefono: document.getElementById("new_telefono").value.trim()
    }
    
    try{
        const nuevoUsuario=await fetch("http://localhost:8080/guardar/usuario",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPayload)
        })

        console.log("los datos enviados son: ",nuevoUsuario)
        const data=await nuevoUsuario.json()
        alert(data.mensaje)
        if (nuevoUsuario.ok) {
            window.location.reload(); 
        }
        if(!data.ok){
            console.log("error: de origen desconocido")
        }
    }
    catch(err){
        alert("error servidor no encontrado",err)
    }
    
}

window.crearCita = crearCita;
window.listar_empleados=listar_empleados
window.seleccionarHorario=seleccionarHorario
window.crearUsuario=crearUsuario
windo.seleccionarHorario=seleccionarHorario



})




    


