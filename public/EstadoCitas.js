document.addEventListener("DOMContentLoaded",()=>{
    citasActivas()

    let listaCita=[]
async function citasActivas(){

    try{
        const respuesta=await fetch("http://localhost:8080/mostrar/citas/estado",{
            method:"GET"
        })
        const datos =await respuesta.json()
        console.log("la respuesta del servidor es: ", datos)
        if(datos && respuesta.status===200){
            const listaDB=Array.isArray(datos.data) ? datos.data:[]
            listaCita=listaDB.filter(e=>e.estadoCita=='1')
            renderTabla(listaCita)
        }
    }catch(error){
    console.error("error en la respuesta del servidor")
}
}

function renderTabla(listaCitas){
   const tbody = document.querySelector("#tableCitas tbody")


  if(!tbody)return;

    if(listaCitas.length===0){
        tbody.innerHTML=`
        <tr><td colspan=6 class="text-center"> no hay citas en la base de datos</td></tr>
        `
        console.error("no se encontro las citas",listaCitas)
        return
    }

    if(tbody){
        tbody.innerHTML=listaCitas.map(u =>{
        const estadoCita=u.estadoCita ===0 ? 'Cancelada': 'Activa'
        return `
        <tr>
        <td>${u.idCita}</td>
        <td>${u.empleadosCita.usuario.nombre} ${u.empleadosCita.usuario.apellidos}</td>
        <td>${u.usuarioCita.nombre}</td>
        <td>${u.horaInicio}</td>
        <td class="chip scala">${estadoCita}</td>
        <td>${u.fechaCita}</td>
        </tr>
        `
    }).join("")
    }else{
        console.error("error desconocido")
    }

    
}

})