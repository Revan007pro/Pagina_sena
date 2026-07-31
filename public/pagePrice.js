import { securePage, ingresarUsuario } from "/scripAdmi.js";

document.addEventListener("DOMContentLoaded",()=>{
    async function listarPrecios(){

    const selectPrices=document.getElementById("selectPrice")
    const cambiarPrecios=document.getElementById("cabiarPrice")

    const envio=await fetch("http://localhost:8080/retornar/tipo_servicios",{
        method: "GET"
    })
    const datos=await envio.json()

    
     if(envio.ok){
        console.log("los datos son: ",datos)
        selectPrices.innerHTML=
        `<option value="">Seleccione una Opcion</option>`  +
        datos.map(p=>{
            return `
            
            <option value="${p.idTipoServicio}">${p.rollTServicio.rollEmpleado}</option>
            `
       
        }).join("")
        selectPrices.addEventListener("change", (e) => {
    const servicio = datos.find(p => p.idTipoServicio == e.target.value)

            if(servicio){
                cambiarPrecios.value = servicio.idPrecioTipo.valorPrecio
            }else{
                cambiarPrecios.value = ""
            }
        
async function cambiarPrices(cambiarPrecios.value ,p.idTipoServicio){

    const payload={
        idTServicio:p.idTipoServicio,
        
    }

    const envio=await fetch("http://localhost:8080/retornar/tipo_servicios",{
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    })
    console.log("el servicio y el ")
}


    
});
      
     }
     else{
        console.error("no se recivbieron los putos datos")
     } 

}



     listarPrecios()
     securePage() 
     ingresarUsuario()
})


