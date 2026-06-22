

document.addEventListener("DOMContentLoaded",()=>{

//console.log("los horarios disponibles son: ", horariosDisponibles)
window.repogramar_cita=repogramar_cita
window.verHorarioEmpleado=verHorarioEmpleado




    const repoId=new URLSearchParams(window.location.search)
    const citaId=repoId.get("idRepro")
    const idHorarioPass=repoId.get("idHorPass")
   
    const labelIdCita=document.getElementById("idCitaRepo")
    labelIdCita.textContent=citaId
    console.log("la cita a reprogramar es: ",citaId)
    let payloadRe={}






function repogramar_cita(elemto,fechaObje){
    

           try{
  
    payloadRe = {
    fecha:fechaObje,
    horainicio: elemto,
    idHorarioPas:idHorarioPass,
    estadoHorario:0

 }
 console.log("los elementos antes de enviar son: ",payloadRe)
  window.reprogramarCita=reprogramarCita
 
async function reprogramarCita() {


const respuesta = await fetch(`http://localhost:8080/reprogramar/cita/cliente/v2/${citaId}`, {
                         method: "PUT",
                         headers: {
                             "Content-Type": "application/json"
                         },                     
                         body: JSON.stringify(payloadRe)
                     })
                     const resultado = await respuesta.json()
                      if (respuesta.ok) {
                          alert(resultado.mensaje)
                          console.log("los datos enviados son: ",payloadRe)
                      } 
                      if (!respuesta.ok ) {
                          alert(resultado.mensaje)
                          console.log("no se puedo enviar los datos",payloadRe)
                      } 
                 
                      window.location.reload()
                      
            
                     
    
 }              
         }catch(err){
             console.log("error servidor caido",err)
     
            
}}


const fechaInput = document.getElementById("fechaRepo")
async function verHorarioEmpleado() {
    const param = new URLSearchParams(window.location.search);
    const idWorker = param.get("idEpl");
    
    const reproHora=document.getElementById("horaRepo")

    try {
        const respuesta = await fetch(`http://localhost:8080/retornar/horario/${idWorker}`, {
            method: "GET"
        });
        const datos = await respuesta.json()
        const diasTexto = [ "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"] //no pude sacarlo de la base dedatos
        const fechaEnviar=fechaInput.value
        const fechaObj = new Date(fechaEnviar)
        const diaEscogido = diasTexto[fechaObj.getDay()]
        console.log("el dia comparado es: ",diaEscogido)
         
        
        
       
        const horasEmpleado=datos.filter(h=>h.diaSemana === diaEscogido && h.estadoHo === 1)
        
        const horaReprogra=horasEmpleado.map(h=>{
           return `
            <div class="flex justify-center gap-4">
            <input type="hidden" id="horario_id" value="" />
            <label class=" < mt-4 label-horario border p-2 w-full text-center rounded cursor-pointer hover:bg-sky-500 hover:text-white transition-colors"
         
           onclick="repogramar_cita('${h.idHorario}', '${fechaEnviar}')">  ${h.horaHorario.substring(0, 5)}
            </label>
            </div>
            
            
            `
        }).join("")
        reproHora.innerHTML=horaReprogra
        //si el input y el dia de la base
                                                                       // de datos son igiales

        console.log("las horas disponibles para ese dia son: ",horasEmpleado)
 
        
       
        
    } catch(err) {
        console.error("Error en el front del metodo:", err);
    }
}


fechaInput.addEventListener("change",()=>{ //forma para que cuando ingrese una fecha llame a la funcion
    console.log("llamando ami funcion")
    verHorarioEmpleado() 
})

});