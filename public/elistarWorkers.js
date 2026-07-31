import { securePage } from "/scripAdmi.js";


let preciosarray=[]
async function enlistarByRoll(){
    let param=new URLSearchParams(window.location.search)
    const rollEmpl=param.get("roll")
    console.log("el roll a enviar es: ",rollEmpl)
    const envio=await fetch(`http://localhost:8080/empleados/${rollEmpl}`,{
        method: "GET"
    })
    const datos=await envio.json()
     const preciosFiltra=Array.isArray(datos) ? datos:(datos || [])
     preciosarray=preciosFiltra
    console.log("los datos del empleado son: ",datos)
    if (!datos) return;
    const tabla=document.querySelector("#listarRollEmp tbody")

    if(datos){
        tabla.innerHTML=datos.map(e=>{
            return`
            
            <tr>
            <td>${e.usuario.nombre}</td>
            <td>${e.usuario.apellidos}</td>
            <td>${e.idCargo}</td>
            <td >
            ${preciosarray.map(p=>{
                return `<input class="input" value=${p.idPrecioEmpleado.valorPrecio}>
                
                `
            }).join("")}
            </td>
            <td>${e.idSede}</td>
            <td><button class="button" onclick="cambiarPrice(this, ${e.idEmpleado})">Confirmar</button></td>

            </tr>

            `
        }).join('')
    }
}

async function cambiarPrice(btn, idEmpleado)  {

    try{
         const input = btn.closest("tr").querySelector("input").value
   /*  closest('tr'): Viaja hacia arriba en el
    HTML hasta encontrar la fila contenedora de ese empleado. */

    const payload={
        "valorPrecios":input,
        "idEmpleado":idEmpleado
    } 
    console.log("los datos de envio son: ",payload)

    const send=await fetch("http://localhost:8080/crear/precio/byEmpleado",{
        method:"PUT",
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    const datos=await send.json()
    if(send.ok){
        alert(datos.mensaje)
        window.location.reload()
    }
    else{
        console.error("no se enviaron los datos")
    } 



    }catch(err){
        console.error("error en el servidor ",err)
    }
   

}



document.addEventListener("DOMContentLoaded",()=>{
    window.cambiarPrice=cambiarPrice
     securePage()
      enlistarByRoll()
      enlistarByRoll()




})

