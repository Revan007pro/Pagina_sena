import { securePage } from "./scripAdmi.js";

//nota asegurar que en el script tenga el tipo module en las paginas que heredan


window.prestarElementos=prestarElementos
window.cargarDatos=cargarDatos

function prestarElementos(id, nombre, apellido) {
    try {
        const select = document.getElementById(`aPrestar-${id}`) //se tiene que enviar con el id del empleado
         const herramientaId = select.value //se guarda esa variable en una constante
         const toolNombre = select.options[select.selectedIndex].text //forma estándar de "leer" el texto visible de una lista desplegable (<select>) en JavaScript puro.
      const url = `prestarElemento?id=${id}&herramienta=${herramientaId}&nombre=${encodeURIComponent(nombre)}&apellido=${encodeURIComponent(apellido)}&tool=${encodeURIComponent(herramientaId)}&toolName=${encodeURIComponent(toolNombre)}`
      window.location.href=url
        console.log("Se detectó el préstamo para:", id, nombre, apellido);
        console.log("la herramienta seleccionada es: ",herramientaId)
    } catch (error) {
        console.error("Error en la validación del front");
    }
}


function cargarDatos() {
    const params = new URLSearchParams(window.location.search);
    
    const idParam = params.get("id")
    const herramientaParam = params.get("herramienta")
    const nombreTool = params.get("nombre")
    const apellidoParam = params.get("apellido")
    const toolPrestar = params.get("toolName");

    if (idParam) {

        const inputEmpleado = document.getElementById("prestar_nombre")
        const apellidoPrestar = document.getElementById("prestar_apellidos")
        const toolParam = document.getElementById("drawPrestamo")

        if (inputEmpleado) inputEmpleado.value = decodeURIComponent(nombreTool)
        if (apellidoPrestar) apellidoPrestar.value = decodeURIComponent(apellidoParam)
        if (toolParam) toolParam.value = decodeURIComponent(toolPrestar)

        window.idHerramientaPrestar = herramientaParam
    }
}
async function procesarPrestamo(event){
    event.preventDefault()

   const idPersonaPrestamo = new URLSearchParams(window.location.search).get("id")
  
    const idTool=window.idHerramientaPrestar
    const datosprestamos={
        id: idTool, // se hizo el window.param para que el navegador pueda ver la variable
       idUsuario: idPersonaPrestamo,
        estado:"prestado", // envia por el json no se necesita seatear en el back
        disponible:false
    }
    try{
        const respuesta=await fetch("http://localhost:8080/prestar/herramienta",{
            method: "PUT",
             headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosprestamos)
        })
        console.log("los datos enviados son: ",datosprestamos)
        if(respuesta.ok){ //nota mapear la tabla compleata
            alert("herramienta prestada exitosamente")
            window.location.href="/admi_empleados"
        }
    }catch(error){
        console.error("ocurrio un error el el metodo del front")
    }
}
window.procesarPrestamo=procesarPrestamo

document.addEventListener("DOMContentLoaded",()=>{

   
  securePage()
    let empleadosBD=[]
async function renderEmpleados(){
    try{
        const respuesta=await fetch("http://localhost:8080/usuario/empleados",{
            method: "GET"
        })
        const datos=await respuesta.json()
        
        if(respuesta.ok){
            const listaBD = Array.isArray(datos) ? datos : [];
            empleadosBD = listaBD.filter(e => e.usuario.estadoUser === 1)
            tablaEmpleados(empleadosBD)
            console.log("la tabla es: ", empleadosBD)
            console.log("los datos de los empleados son: ",datos)
        }
    }catch(err){
    console.error("error en el metodo del front")
}
}

let herramientas=[]
async function tablaEmpleados(empleadosBD){
    const tabla=document.querySelector("#renderEmpleados tbody")
    const estados={
        1 : {texto:"Activo", clase:"Activo"},
        0 :{texto:"Inactivo",clase:"Inactivo"}
    }
    try{

        const respuesta=await fetch("http://localhost:8080/encontrar/herramientas/todas",{
            method: "GET"
        })

        const datos=await respuesta.json()
       

        if(respuesta.ok){

        const toolDB = Array.isArray(datos) ? datos : (datos.data || []);
    herramientas = toolDB;
        }

         if(tabla){
        tabla.innerHTML=empleadosBD.map(u=>{
            const controlEstado=estados[u.usuario.estadoUser]

           return` 
           <tr>
                <td>${u.idEmpleado}</td>
                <td>${u.usuario.nombre}</td>
                <td>${u.usuario.apellidos}</td>
                <td>${u.usuario.roll}</td>
            
               
                <td ><span class="estadoEmpleado ${controlEstado.clase}">${controlEstado.texto}</span></td>
                <td>
    <select class="input" id="aPrestar-${u.idEmpleado}">
        <option value="">Seleccionar una Opcion</option>
        
     ${herramientas
  .filter(h => h.disponibleTool === true)
  .map(h => `<option value="${h.idHerameinta}">${h.tituloTool} - ${h.autorTool}</option>`)
  .join("")}
    </select>
</td>
                <td><button class="cursor-pointer px-5" onclick="prestarElementos(${u.idEmpleado}, '${u.usuario.nombre}', '${u.usuario.apellidos}')">
         <a class="cursor-pointer px-2" title="Prestar")">📑</a><a>✅</a> <a>❌</a>
        </button></td>
         
               
            </tr>
            ` 
        }).join("")
    }
    else{
        console.error("error desconocido en el front")
    }
    }catch(err){
        console.error("error en la funcion del front")
    }
   

}

renderEmpleados()
cargarDatos()


})

