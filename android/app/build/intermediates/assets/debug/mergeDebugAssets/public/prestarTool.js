import { securePage } from "/scripAdmi.js";

window.hideHambur=hideHambur
window.devolverTool=devolverTool


window.addEventListener("DOMContentLoaded",()=>{
    securePage()
    renderTable()
})




function hideHambur(){
   const nav_admi = document.getElementById("nav_admi"); // forma para manejar el menu hambuerguesa
const _menu = document.getElementById("_menu");
const _seccion_ = document.getElementById("seccion_class");

_menu.addEventListener("click", () => {
    if (_menu) {
        nav_admi.style.display === "none"
        _seccion_.appendChild(_menu)
    }
})
}


let userDB=[]
async function renderTable() {
    try {
        const respuesta = await fetch("http://localhost:8080/listar/herramientas/prestadas", {
            method: "GET"
        });

        const datos = await respuesta.json();

        if (respuesta.ok && datos.datos) {
            const herramientasPrestadas = datos.datos.filter(item => item.userTool && item.userTool.estadoUser === 1);
            
            tablaEmpleados(herramientasPrestadas);
            userDB=herramientasPrestadas
        }



function tablaEmpleados(datosFiltrados) {
    const tabla = document.querySelector("#renderPrestar tbody");
    
    if (!tabla) {
        console.error("No se encontró la tabla #renderPrestar");
        return;
    }

    const estados = {
        "true": { texto: "Activo", clase: "Activo" },
        "false": { texto: "Prestado", clase: "Prestado" } // nota hacer las clases cuando deje la pereza
    };

    tabla.innerHTML = datosFiltrados.map(e => {
        //const user = e.userTool;
        const controlEstado = estados[e.disponibleTool]

        return `
            <tr>
                <td>${e.userTool.id}</td>
                <td>${e.userTool.nombre}</td>
                <td>${e.userTool.apellidos}</td>
                <td>${e.userTool.roll}</td>
                <td>${e.tituloTool}</td>
                <td><span class="estadoEmpleado ${controlEstado.clase}">${controlEstado.texto}</span></td>
                <td><span class="scala" onclick="devolverTool(${e.idHerramienta},${e.userTool.id})">🫴🏻</span></td>

            </tr> 
           
        `;
         //faltan las clases jose no seas peresozo
    }).join("");
}
    } catch (err) {
        console.error("error en el front:", err);
    }
}

async function devolverTool(id,idEmpleado){
    console.log("los datos a enviar para devolver son: ",id,idEmpleado)

    const url = 'http://localhost:8080/herramientas/prestadas/pdf'

    try{
        const respuesta= await fetch(url)
        if(!respuesta.ok){
            throw new Error('Error al generar PDF')

        }

        const blob = await respuesta.blob() //nos responde un tipo block

        const urlArchivo=window.URL.createObjectURL(blob)

        window.open(urlArchivo, '_blank') //abrame la respuesta en una ventanna aparte con blank
    }catch(err){
        console.log("huno un error en el front",err)
    }
}

