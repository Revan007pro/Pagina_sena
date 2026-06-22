

document.addEventListener('DOMContentLoaded', function (){
    
window.cancelarCita=cancelarCita
    const _confirm = document.getElementById("confirmar_cita")
    const mensaje_cita = document.getElementById("mensaje_cita")
    const citas_registradas = document.getElementById("citas_registradas")
 /*    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const idEmpleadoLogueado = usuario ? usuario.idEmpleado : null 
    const rolUsuario = JSON.parse(localStorage.getItem('identificacion'))
    if (!rolUsuario) {
        console.log("error en el json", rolUsuario)
    } 
 */

const params = new URLSearchParams(window.location.search);
const idEmpleado = params.get("id_empleado");


if (!idEmpleado) {
    console.error("No se recibió id_empleado");
}


function securePage() {
    const user = localStorage.getItem("usuario")
    const token = localStorage.getItem("token")
    const usuarioPermitidos = "Empleado"

    if (!token || !usuarioPermitidos.includes(user)) {
        alert("Usted no tiene los permisos necesarios.")
        window.location.href = "/"
        localStorage.clear()
        return
  
    }
    insertarUsuario(user)
}


function insertarUsuario(user){
    const nombre = localStorage.getItem("nombre")
    const roll=localStorage.getItem("roll")
    const usuarioBage=localStorage.getItem("usuario")
    const correo=localStorage.getItem("correo")
    const phone=localStorage.getItem("telefono")
    const nombreUsuario=document.getElementById("nombreUsuario")
    
    const rolUsuario=document.getElementById("rol_usuario")
    const atriUsuer=document.getElementById("nombreUsuario")
    const emailUsuario=document.getElementById("correo_bage")
    const teleUsuario=document.getElementById("telefono_bage")
    rolUsuario.textContent=nombre  // este sirve
    nombreUsuario.textContent=usuarioBage
    emailUsuario.textContent=correo
    teleUsuario.textContent=phone
const valorLimpio = (usuarioBage === null || usuarioBage === "null" || usuarioBage === "") 
                        ? "Cliente" 
                        : usuarioBage;

    if (nombreUsuario) nombreUsuario.textContent = valorLimpio
   

}



async function empleadosCitas() {
        const citas_registradas = document.getElementById("citas_registradas")
        const noti_emple = document.getElementById("bage_emple")
        const token = localStorage.getItem("token")
    try {
            const respuesta = await fetch("http://localhost:8080/citas/mostrar/empleado",{
                method: "GET",
                headers:{
                    "Authorization": `Bearer ${token}`,
                   "Content-Type": "application/json"
                }
            })
            if (!respuesta.ok) {

    console.error("Backend error:", respuesta.status);
    citas_registradas.innerHTML = "<li>No hay citas registradas</li>";
    noti_emple.style.display = "none";
    return;
}

            const misCitas = await respuesta.json();

            if (misCitas && misCitas.length > 0) {
                citas_registradas.innerHTML = ""
                
                misCitas.forEach(cita => {
                    const li = document.createElement('li');
                    if(cita.estadoCita===1){
                         li.innerHTML = `
                        <h1>Cita Nueva</h1>
                        <p class="bold">Cliente: ${cita.usuarioCita.nombre}</p>
                        <p class="bold">Fecha: ${cita.fechaCita}</p>
                        <p class="bold">Hora: ${cita.horaInicio.horaHorario}</p>
                        <p class="bold">Id Cita: ${cita.idCita}</p>
                    `
                noti_emple.style.display = "block"
                noti_emple.textContent = misCitas.length}
                if(cita.estadoCita===3){
                        li.innerHTML=`
                        <p class="bold">El cliente cancelo la cita</p>
                        `
                    }
                   
                   
                    citas_registradas.appendChild(li)
                })

                noti_emple.style.display = "block"
                noti_emple.textContent = misCitas.length
            } else {
                citas_registradas.innerHTML = '<li>No tienes citas pendientes</li>';
                noti_emple.style.display = 'none';
            }
        } catch (err) {
            console.error("Error cargando citas:", err);
        }
    }
    

async function empleadosCitasV2() {
        const tableEmpleado = document.querySelector("#table_empleados tbody")
         const token = localStorage.getItem("token")

    try {
            const respuesta = await fetch("http://localhost:8080/citas/mostrar/empleado",{
                method: "GET",
                headers:{
                    "Authorization": `Bearer ${token}`,
                   "Content-Type": "application/json"
                }
            })

            const datos=await respuesta.json()
            if (!respuesta.ok) {

    console.error("Backend error:", respuesta.status);
    tableEmpleado.innerHTML = "<td><span>Error en el servidor</span></td>"
   // return;
}

    const userCache=Array.isArray(datos) ? datos : []
    const citasEstado=userCache.filter(cita => cita.estadoCita === 1 || cita.estadoCita === 2 || cita.estadoCita === 3 )

    console.log("citas en la cache son: ",citasEstado)
    const estados={
        1:{texto:"Activo",clase:"Activo"},
        2:{texto:"Inactivo",clase:"Inactivo"},
        3:{texto:"Cancelada",clase:"Canelada"}
    }
    tableEmpleado.innerHTML=` 
    ${citasEstado.map(cita=>{
        const renderState=estados[cita.estadoCita] //vincula el estado con el diccionario
        return ` 
        <tr>
        <td>${cita.usuarioCita.nombre}</td>
        <td>${cita.usuarioCita.apellidos}</td>
        <td>${cita.fechaCita}</td>
        <td>${cita.horaInicio.horaHorario}</td>
        <td>${cita.idCita}</td>
        <td>${cita.usuarioCita.telefono}</td>
        <td> <span class="estadoEmpleado ${renderState.clase}" >${renderState.texto}</td>
        <td><button onclick="cancelarCita(${cita.idCita})" class="button">Cancelar</td>
        </tr>
       
        `

    }).join('')}
    `
           
        } catch (err) {
            console.error("Error cargando citas:", err);
        }
    }

empleadosCitasV2()


async function cancelarCita(cita){
    console.log("la cita cancelada es: ",cita)

    const idCitaCan=confirm(`Esta seguro que desea cancelar la cita con el id: ${cita}`)

    if(idCitaCan){
        try{
            const sendData=await fetch(`http://localhost:8080/cancelar/citas/${cita}`,{
                method: "POST",
                 headers: {
                "Content-Type": "application/json"
            }})
            const envio=await sendData.json()
              if(envio.codigo===1){
            alert(envio.mensaje)
            window.location.reload()
            console.log("la cita cancelada a sido: ",envio)
        }

        }catch(err){
            console.error("error en el front ",err)
        }
    }
}

    async function _notificacion_cita() {
         // const new_cita = JSON.parse(localStorage.getItem('Confirmar') || '[]');
     /* const noti_emple = document.getElementById("bage_emple");
    const _perfil_empleado = document.getElementById("b_eperfil");
    const citas_registradas = document.getElementById("citas_registradas");
    noti_emple.style.display = 'none'  */

    try {
        /* const respuesta = await fetch(``, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })

        const listaCita = await respuesta.json(); 

        if (respuesta.ok) {
            console.log("estas son mis citas", listaCita);
        } else {
            console.log("error en la funcion");
            return;
        }

        if (listaCita && listaCita.length > 0) {

            const nueva_cita = document.createElement('li')
            citas_registradas.innerHTML = `
                <h1>Citas Nueva</h1>
                <p class="bold">${listaCita.usuarioCita.nombre} ${listaCita.usuarioCita.apellidos}</p>
                <p class="bold">${listaCita.usuarioCita.horaInicio}<p>
                <p class="bold">Id Cita: ${id}</p>
            `
            citas_registradas.appendChild(nueva_cita)
            noti_emple.style.display="block"
            noti_emple.textContent=listaCita.length
        } else {
            citas_registradas.innerHTML = 'No hay citas registradas';
        } */

    } catch (err) {
/*         console.error("Error en ejecución:", err);
        //alert("El servidor esta caido o hay un error de variables"); */
    }


_perfil_empleado.addEventListener('click', () => {
    const menu = document.getElementById("menu_perfil");

    if (menu) {
        menu.style.display="block"
    }
    
})
        


        // Mostrar citas si existen
        /* if (new_cita.length > 0) {
            new_cita.forEach(cita_data => {
                if (citas_registradas) {
                    citas_registradas.innerHTML = `
                    <strong>${cita_data._nombre}</strong><br>
                    <strong>${cita_data._apellido}</strong><br>
                    <strong>${cita_data._fecha}</strong><br><br>
                    `
                    citas_registradas.appendChild(nueva_cita)
                    noti_emple.style.display=''
                    noti_emple.textContent=new_cita.length
                }
                if (mensaje_cita) {
                    nueva_cita.innerHTML = `
                    <strong>${cita_data._nombre}</strong><br>
                    <strong>${cita_data._apellido}</strong><br>
                    <strong>${cita_data._fecha}</strong>
                    `
                }
            });
        } */
    }

    // Evento para confirmar cita
    /* if (_confirm) {
        _confirm.addEventListener('click', (e) => {
            e.preventDefault()
            const new_nombre = document.getElementById("nombre_cita")
            const new_apellido = document.getElementById("apellido_cita")
            const new_documento = document.getElementById("tipo_documento")
            const new_numero = document.getElementById("numero_identidad")
            const new_fecha = document.getElementById("fecha_deseada")
            const new_especialidad = document.getElementById("especialidad")
            

            // Validar campos obligatorios
            if (!new_nombre.value.trim() || !new_apellido.value.trim() || !new_fecha.value) {
                alert("Por favor complete los campos obligatorios")
                return
            }

            const cita_data = {
                _nombre: new_nombre.value,
                _apellido: new_apellido.value,
                _documento: new_documento.value,
                _numero: new_numero.value,
                _fecha: new_fecha.value,
                _especialidad: new_especialidad.value
            }

            const new_cita = JSON.parse(localStorage.getItem('Confirmar') || '[]')
            new_cita.push(cita_data)
            localStorage.setItem('Confirmar', JSON.stringify(new_cita))

            new_nombre.value = ''
            new_apellido.value = ''
            new_documento.value = ''
            new_numero.value = ''
            new_fecha.value = ''
            new_especialidad.value = ''
            
            // Actualizar la visualización
           
            alert("Cita agendada correctamente!")
             _notificacion_cita()
        })
    } */
        
    const nav_admi = document.getElementById("nav_admi"); // forma para manejar el menu hambuerguesa
const _menu = document.getElementById("_menu");
const _seccion_ = document.getElementById("seccion_class");

_menu.addEventListener("click", () => {
    if (_menu) {
        nav_admi.style.display === "none"
        _seccion_.appendChild(_menu)
    }
})
const _perfil_empleado = document.getElementById("b_eperfil");
_perfil_empleado.addEventListener('click', () => {
    const menu = document.getElementById("menu_perfil");

    if (menu) {
        menu.style.display="block"
    }
    
});
const _cerrar_ = document.getElementById('cerrar_bage_display')
const menu = document.getElementById("menu_perfil");

_cerrar_.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    menu.style.display = 'none';
});
document.addEventListener('keydown',(e)=>{
    if (e.key==='Escape') {
        if (menu.style.display='block') {
            menu.style.display='none'
        }
    }
    //nota traer el otro modal
})

/* if (borrar_citas) {
        borrar_citas.addEventListener('click', function(e) {
            e.preventDefault() 
                localStorage.removeItem('Confirmar')
                alert("Todas las citas han sido borradas correctamente")
                console.log("funciona")
                citas_registradas.innerHTML=""
                _notificacion_cita()
        })
    } */
    _notificacion_cita()
     const borrar_citas = document.getElementById("borrar_citas")

async function borrarCitas(){
   
    const idBorrar=prompt("porfavor dijete el identificador de la cita a borrar") // prompt para pedir datos al usuario por popas
        if(idBorrar !==null && idBorrar !==""){
        const confirmar = confirm(`¿Estás seguro de que quieres borrar la cita #${idBorrar}?`);
        if (confirmar) {
            try {
                
                const respuesta = await fetch(`http://localhost:8080/citas/borrar/${idBorrar}`, {
                    method:  "PUT" //"DELETE" // 
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    alert(resultado.mensaje); 
                    _notificacion_cita(); 
                } else {
                    alert("No se pudo borrar: " + resultado.mensaje);
                }
            } catch (err) {
                console.error("Error al borrar:", err);
            }
            
        }
  
        
    }

    
   
   
    }

    if (borrar_citas) {
    borrar_citas.addEventListener("click", borrarCitas);
}

const cerrarSeccion=document.getElementById("cerrarSeccion").addEventListener("click",()=>{
    localStorage.clear()
})


empleadosCitas()

securePage()
})

