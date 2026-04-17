import { ingresarUsuario ,securePage} from "/scripAdmi.js";


document.addEventListener('DOMContentLoaded', function (){
    

window.listar_empleados=listar_empleados
window.cancelarCita=cancelarCita
window.crearCita=crearCita
window.seleccionarHorario=seleccionarHorario
window.seleccionarHorario=seleccionarHorario //notta no se porque no funciona si se coloca de ultimo
    const arrow_usuario = document.getElementById("flecha_usuario")
    const bage_usuario = document.getElementById("bage_usuario")
    let empleadoSeleccionadoNombre = ""
    let empleadoSeleccionadoId = null

    let params= new URLSearchParams(window.location.search)
    const idPersona=params.get("id_persona")
    const currentPath = window.location.pathname

    const guardarUser=document.getElementById("guardarUsuario")

    if (guardarUser) {
        guardarUser.addEventListener("click",()=>{
            crearUsuario()
        })
    }


   citasCliente()


   
     if (!currentPath.includes("Login") && 
        !currentPath.includes("Registrarse")) {
        securePage();
    } 
    



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
        sedeId: 1, // nota cambiar
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

    // convertir la respuesta a objeto JSON
    const datos = await respuesta.json(); 

    if (respuesta.ok) {
        alert("¡Éxito!: " + datos.mensaje);
        window.location.reload()
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
                alert("error desconocido")
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

        newUsuario: document.getElementById("new_nombre").value.trim(),
        newApellidos: document.getElementById("new_apellidos").value.trim(),
        newfecha_nacimiento: document.getElementById("new_fecha_nacimiento").value,
        newCorreo: document.getElementById("new_email").value.trim(),
        newContrasenia: document.getElementById("password_registro").value.trim(),
        newConfirmar: document.getElementById("confirm-password").value.trim(),
        newTelefono: document.getElementById("new_telefono").value.trim()
        //nota estos son los datos que espera el backend
    }
    
    try{
        const nuevoUsuario = await fetch("http://localhost:8080/guardar/usuario/version2",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newPayload)
        })

        const data = await nuevoUsuario.json()

      /*   if(nuevoUsuario.ok){
            alert(data.mensaje)
            console.log("datos enviados:", data)
        }else{
            console.log("Error en la petición:", data)
        } */
        switch(nuevoUsuario.status){
            case 201:
                alert("el usuario a sido creado exitosamente")
                break
            case 409:
                alert("error "+data.mensaje)
                break
            case 417:
                alert("error "+data.mensaje)
                break
            case 401:
                alert("error "+data.mensaje)
                break
            case 400:
                alert("error "+data.mensaje)
                break
            default:
                alert("error de origen desconocido"+data.error)
                break

        }

    }catch(err){
        console.error(err)
        alert("Error: servidor no encontrado")
    }
}
let citasBS=[]
async function citasCliente() {

    const divCita=document.getElementById("citaCliente")
    const profes=document.getElementById("profe_encargado")
    const buttonFactura=document.getElementById("buttonFactu")
    

    try{
        const respuesta= await fetch(`http://localhost:8080/citas/mostrar/cliente/${idPersona}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if(!respuesta.ok){
            console.log("error en algunas de las funciones")
            return
        }

        const dibujarCita=await respuesta.json()

        if(dibujarCita && dibujarCita.length > 0){
            divCita.innerHTML= ""
            const citasCache = Array.isArray(dibujarCita) ? dibujarCita : [];
            const citasBS = citasCache.filter(cita => cita.estadoCita === 1 || cita.estadoCita === 2 || cita.estadoCita === 3 );
            
            //dibujarCita.forEach(cita=>{
             citasBS.forEach(cita=>{
                const li=document.createElement("li")
                if(cita.estadoCita===2){divCita.textContent="cancelo la ultima cita"; return}
                if(cita.estadoCita===3){divCita.textContent=`su factura id (${cita.idCita}) ha sido cancelada`}
                if(cita.estadoCita===1){
                    
                    li.innerHTML=`
                <h1>Cita Nueva</h1>
                 <p class="bold">Cliente: ${cita.usuarioCita.nombre}</p> 
                        <p class="bold">Hora: ${cita.horaInicio}</p>
                        <p class="bold">Id Cita: ${cita.idCita}</p>
                        <p class="bold">Fecha de la cita: ${cita.fechaCita}</p>
                `;
                
                if(!profes.hasChildNodes()){
                    profes.innerHTML=`<h1 class="bold">Profesional Encargado</h1>
                <p class="bold">Nombre: ${cita.empleadosCita.usuario.nombre}</p>
                <p class="bold">Apellidos: ${cita.empleadosCita.usuario.apellidos}</p>
                <p class="bold">Profesion: ${cita.empleadosCita.usuario.roll}</p>
                <p class="bold">Telefono: ${cita.empleadosCita.usuario.telefono}</p>
                `
                }
                else{
                    //profes=new nota hacer funcion por separado 

                }
                
                divCita.appendChild(li)
                dibujarFactura(cita,buttonFactura)
                buttonFactura.classList.remove("hidden")
                
                }
                
            })
        }
        else{
            divCita.textContent="No hay Citas programadas"
        }
    }catch(err){
        console.log("error servidor caido",err)
    }
    
}




async function reprogramarCitas() {

    const reprogramarCitas=document.getElementById("reproCita")
    

    reprogramarCitas.addEventListener("click",async()=>{ // hay que colocarlo aca porque escapa del scope
    const idRepro=prompt("porfavor dijete el identificador de la cita a borrar")
    if (idRepro && idRepro !=null) {
        const confirmar=confirm(`Esta seguro que quiere repogramar su cita con numero: ${idRepro}`)
       
    if(confirmar){
        const idCita = idRepro
        let fecha = prompt("Ingrese la fecha (yyyy-mm-dd)")
        let hora = prompt("Ingrese la hora (hh:mm)")
        if (fecha && hora) {

            try{
  const payloadRe = {
    fecha: fecha,
    horainicio: hora
}
            const respuesta = await fetch(`http://localhost:8080/reprogramar/cita/cliente/${idCita}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                       
                        body: JSON.stringify(payloadRe)
                    })
                    const resultado = await respuesta.json();

                    if (respuesta.ok) {
                        alert(resultado.mensaje)
                    } else {
                        console.log("Error en la respuesta del servidor");
                    }
                    
        }catch(err){
            console.log("error servidor caido",err)
        }
    }}}
})

    
    
}


async function dibujarFactura(cita,buttonFactura) {
    const idFatu=document.getElementById("idFactura")
    const nombreClien=document.getElementById("nombreClie")
    const nameEmple=document.getElementById("nombreEmpl")
    const valorSin=document.getElementById("valorSin")
    const valorTo=document.getElementById("valorTo")
    const noti=document.getElementById("cirRed")
    const factuNoti=document.getElementById("notiFactu")
    

    try{
        

        const respuesta = await fetch(`http://localhost:8080/factura/cita/${cita.idCita}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" } //dibula la factura por el id de la cita

        })
 /*        if(!respuesta.ok){
            console.log("error no hay respuesta del servidor")
        } */
        const factu= await respuesta.json()


        if(factu&& factu.length>0){
            
            factu.forEach(factura=>{
                idFatu.textContent=factura.idFactura
                nombreClien.textContent=factura.nombreCliente
                nameEmple.textContent=factura.nombreEmpleado
                valorSin.textContent=factura.valorSinIva
                valorTo.textContent=factura.valorTotal
                noti.style.display="block"
                 noti.textContent=factu.length

                 if(buttonFactura){
                    buttonFactura.addEventListener("click",()=>{
                        console.log("imprimiendo factura")
                        impriFactu(factura.idFactura,factura.nombreCliente,factura.nombreEmpleado,factura.valorSinIva,factura.valorTotal)

                    })
                 }
                 else{
                    console.error("no se detecto el boton de factura")
                 }
                

            })}

        else{
            factuNoti.textContent="No Tiene Facturas Pendientes"
        }
        

    }catch(err){
        console.log("error servidor caido",err)
    }
}

function impriFactu(id,name,cliente,precio,total){

    
    console.log("la factura es: ", id,name,cliente,precio,total) //funciono
    //window.print() imprime la pagina
}

async function crearFactura(cita){
    const payload={ 
            IdCita:idCita,
            IdPrecio:id_precio,
            IdEmpresa: id_empresa,
            fullTotal:total
    }
    const infoSend=await fetch(`http://localhost:8080/crear/factura/${idCita}`)
}

async function cancelarCita(idCita){
    const citaCancerar=prompt("por favor ingrese el identidicador de la cita que quiere cancelar")

    
    if(cancelarCita){
        idCita=citaCancerar
    }
    console.log("la cita a cancelar es: ",idCita)
  /*   const payload={
        idCita:parseInt(idCita),
        
    } */
    try{
        const response=await fetch(`http://localhost:8080/cancelar/citas/${idCita}`,{
            method: "POST" /* ,
            headers: { "Content-Type": "application/json" },
             body:JSON.stringify(payload) */
        })
        const datos=await response.json()
        if(response.ok){
            alert("la cita a sido cancelada correctamente")
            console.log("la cita cancelada a sido: ",datos)
        }
    }catch(err){
        console.error("error servidor caido")
    }
}

ingresarUsuario()
reprogramarCitas()
   

})




    


