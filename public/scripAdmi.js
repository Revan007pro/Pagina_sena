
window.cerrarSeccion = cerrarSeccion;
window.ingresarUsuario=ingresarUsuario

window.datosConfi=datosConfi
window.confiPage=confiPage
window.listarUsuarios=listarUsuarios
window.prepararEdicion=prepararEdicion
window.prepararInativar=prepararInativar
window.activarUsuario=activarUsuario
window.prepararEmpleado=prepararEmpleado
window.paginaWorker=paginaWorker




document.addEventListener('DOMContentLoaded',function(){


elistaUserInactivados() // alerta genera error si se colocan de ultimo los dos siguientes
GestionUsuarios()
buscadorUsuarios()
ver_nav()


    
const nav_admi = document.getElementById("nav_admi");
const _menu = document.getElementById("_menu");
const _seccion = document.getElementById("seccion_class");
const _flecha_ = document.getElementById("arrow");
const _block_admi= document.getElementById("subgrupo")
const _arrow_admi=document.getElementById("arrow_admi")
const _menu_especial=document.getElementById("bage_admi")
const divPrinc=document.getElementById("divPrinci")








_arrow_admi.addEventListener("click",(e)=>{
    e.preventDefault()
        _arrow_admi.classList.toggle("none")
        if(_arrow_admi.classList.contains("none")){
        console.log("flecha admi detectada")
        _menu_especial.style.display="block"
        divPrinc.classList.add("mt-45") // agrega clases tailwinds al div
        
        }
        else{
            _menu_especial.style.display="none"
            divPrinc.classList.remove("mt-35") // remueve lo que le agrega el toggle
        }

        
})



document.addEventListener("keydown",(e)=>{
    if (e.key=='Escape') {
        _menu_especial.style.display='none'
        divPrinc.classList.remove("mt-35")
    }
})

_flecha_.addEventListener("click", (e) => {
    e.preventDefault(); 
    _flecha_.classList.toggle("rotar-flecha"); 
    if (_flecha_.classList.contains("rotar-flecha")) {
        console.log("Flecha rotada a 180°")
         _block_admi.style.display='block'

    } else {
        console.log("Flecha regresada a 0°")
        _block_admi.style.display='none'

    }
});

/* no podia hacer que el icono hamburguesa no se desaparesca juego con el nav
asi que lo que se me ocurrio, insertarlo en el section siguiente una vez se le de click
lo que hace es esconder todo e insertarlo en el section con pading fijos */
_menu.addEventListener("click", () => {
  if (nav_admi.style.display === "none") {
    nav_admi.style.display = "block"; //vuelve a colocar el display del nav
  } else {//el else activa mi boton
    nav_admi.style.display = "none";
    _seccion.appendChild(_menu); //en mi css con #_menu inserto el menu el en section
  }
   /* nav_admi.insertBefore(_menu, nav_admi.firstChild); forma para que el menu
   sea el primero antes de que sea hijo del nav solo para saber funciona igual sin 
   esto */


})


})

function GestionUsuarios(){
    const subG=document.getElementById("subgrupoG")
    const arrowG=document.getElementById("arrowG")
        arrowG.addEventListener("click",()=>{
        subG.classList.remove("hidden")
        console.log("activando el ul de la gestion")
        arrowG.classList.add("rotar-flecha")
    })

    

 
}


export function loginUsuario() {
    const usuario_ingresado = document.getElementById("usuario").value.trim();
    const contrasenia_ingresada = document.getElementById("password").value.trim();

    // 2. Definir el objeto de usuarios y contraseñas.
    const usuarios_y_contrasenias = {
        "admi": "123",       
        "empleado": "321",
        "usuario": "231"
    };
    
    // 3. Validar que los campos no estén vacíos.
    if (usuario_ingresado === "" || contrasenia_ingresada === "") {
        alert("Por favor, llene todos los datos"); 
        return;
    }

    // 4. Validar el usuario y la contraseña.
    const contrasenia_correcta = usuarios_y_contrasenias[usuario_ingresado];
    
    if (contrasenia_correcta === undefined) {
        alert("El usuario ingresado no existe");
    } 
    else if (contrasenia_ingresada === contrasenia_correcta) {
        if (usuario_ingresado === "admi") {
            localStorage.setItem("usuario", "admi");
            window.location.href = "/Administrador";
        } else if (usuario_ingresado === "empleado") {
            localStorage.setItem("usuario", "empleado");
            window.location.href = "/empleado";
        } else if (usuario_ingresado === "usuario") {
            localStorage.setItem("usuario", "user");
            window.location.href = "/usuario";
        }
    } 
    else {
        alert("Error: la contraseña ingresada es incorrecta");
    }
}

export async function ingresarUsuario(){
    const inputPassword = document.getElementById("password");
    const inputUsuario = document.getElementById("usuario");

    let password=document.getElementById("password").value.trim()
    let usuario=document.getElementById("usuario").value.trim()

    const errores={errorUser:false,
        errorPassword:false,
        allBad:false,
        any:false
    }

    const payload={
        nombre:usuario,
        password:password
    }

   
    try{
        const respuesta= await fetch("http://localhost:8080/Login/Status",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload) //arma el json con un objeto
        })
        console.log("los datos cargados son:",respuesta) //nota se debe elimiar despjest

        if(!respuesta.ok && !respuesta.status){
            //alert("error en el servidor")
            repuesta
            
        }  
        const data=await respuesta.json()
        console.log("los datos del json son: ", data)

        if(!data) return;

        switch(respuesta.status){

            case 200:

            alert(data.mensaje)

              localStorage.setItem("token", data.token)
                localStorage.setItem("nombre", data.nombre)
                localStorage.setItem("telefono", data.telefono)
                localStorage.setItem("usuario", data.usuario)
                localStorage.setItem("correo",data.correo)
                localStorage.setItem("identificacion", data.identificacion)
                localStorage.setItem("idEmoleado", data.idEmpleado)

                console.log("roll", data.roll)
                console.log("usuario", data.usuario)
                console.log("Correo", data.correo)
                console.log("telefono", data.telefono)
                console.log("nombre", data.nombre)
                console.log("Id",data.identificacion)
               
                if (data.urlTarget) {
                
                if(data.roll  === "Administrador"){
                     
             window.location.href = "/Administrador"


                 }

                if (data.usuario === "Empleado") {
                   // const idEmpleado = data.idEmpleado
                    //window.location.href = `/empleado?id_empleado=${idEmpleado}`
                   window.location.href = "/empleado"
                
                }
    
                if (data.roll  === "Cliente") {
                 //window.location.href = `/dashboard_usuario?id_persona=${idEmpleado}`
                window.location.href = "/dashboard_usuario"
                
                }
            
                    }break 
            case 400:
                alert("error : "+data.mensaje)
                errores.allBad=true
                break
            case 401:
                alert(data.mensaje)
                errores.allBad=true
                break
            case 404:
                alert("error "+data.mensaje)
                errores.errorUser=true
                break
            case 417:
                alert("error "+data.mensaje)
                errores.errorPassword = true;
                break
            default:
                alert(`"error inesperado: " ${respuesta.status}`)
                errores.any=true
                break


        }
 
switch (true) {
    case errores.errorUser:
        inputUsuario.classList.toggle("error-input")
        break

    case errores.errorPassword:
        inputPassword.classList.toggle("error-input")
        break

    case errores.allBad:
        inputPassword.classList.toggle("error-input")
        inputUsuario.classList.toggle("error-input")
        console.log("no hay inputs")
        break
    default:
        const todos = document.querySelectorAll(".input-user")
        todos.forEach(all => all.classList.toggle("error-input"))
        console.log("Error general desconocido")
        break
}
        return data;
        
    }catch(err){
        console.log("error de conexion",err)
        
    }
      
    
        
    }




export function securePage() {
    const user = localStorage.getItem("usuario")
    const token = localStorage.getItem("token")
    const usuarioPermitidos = "Administrador"

    if (!token || !usuarioPermitidos.includes(user)) {
        alert("Usted no tiene los permisos necesarios.")
        window.location.href = "/"
        localStorage.clear()
        return
  
    }
    insertarUsuario(user);
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


function traerUsuarios(){
    fetch('http://localhost:3000/Usuario')
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById('Usuario')
      if (data !== null){
        data.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = usuario.nombre + " " + usuario.apellidos;
        ul.appendChild(li); 
      })}
    })}

function elistar_usuarios(){
    fetch('http://localhost:3000/Usuario/cantidad')
    .then(res => res.json())
    .then(data =>{
        const en = document.getElementById("cantidad_usuarios")
        const cantidad = data.total_usuarios;
        en.textContent = `Total de Usuarios: ${cantidad}`;

    })
}


const notificaciones = [
  { titulo: "nueva actualización disponible", fecha: "12/08/2025" },
  { titulo: "tu reporte mensual está disponible", fecha: "12/08/2024" },
  { titulo: "Recordatorio de reuniones", fecha: "21/08/2025" },
  
];

document.addEventListener("DOMContentLoaded", function() {
    const btnNotificaciones = document.getElementById("btnNotificaciones");
    const _modal = document.getElementById("modal_notificaciones");
    const _cerrar = document.getElementById("cerrar_modal");
    const _lista = document.getElementById("lista_notificaciones");
    const _bage=document.getElementById("bage");
     
    bodyElement.addEventListener('click',(e)=>{//forma para detectar clicks nulos
        if (![_bage,_cerrar].includes(e.target)) {
        //alert("click en body vacío");
        _modal.style.display="none"
    }

    })
    _bage.textContent=notificaciones.length;
    notificaciones.forEach(n =>{
        const li = document.createElement("li"); 
        li.textContent = `${n.titulo} - ${n.fecha}` ;
        _lista.appendChild(li);

    })
    btnNotificaciones.addEventListener("click", ()=>{
    _modal.style.display = "block";
    
});
cerrar_modal.addEventListener("click",()=>(
    _modal.style.display="none"
))
})



/* document.getElementById('usuario').addEventListener('blur',()=>{//blur cuando abandona el foco
    const usuario_=document.getElementById('usuario')
    const erro_usuario=document.getElementById("error_password")
    const vacio=usuario_.value.trim()===''
    erro_usuario.style.display=vacio ? 'inline':"none"
    usuario_.classList.toggle('error-input',vacio)

}) //aun no funciona implementat con css

document.getElementById("password").addEventListener('input',()=>{
    const password_=document.getElementById('password')
    const error_password=document.getElementById('error_password')
    const vacion=password_.value.trim()===''
    error_password.style.display=vacion ? "inline" : "none"
    password_.classList.toggle('error-input',vacion) //ambos metodos son para manejar los errores
}) */
document.addEventListener('DOMContentLoaded',function(){
    const _show=document.getElementById("show")
const _hide=document.getElementById("hide")
const contrasenia_ingresada = document.getElementById("password")

_hide.addEventListener('click',()=>{
    if (_hide) {
        _show.style.display="block"
        _hide.style.display="none"
        contrasenia_ingresada.type='text' 
    }

}
)
_show.addEventListener('click',()=>{
    if (_show) {
        _hide.style.display="block"
        _show.style.display="none"
        contrasenia_ingresada.type='password'
    }

})





})



function confiPage(){
    window.location.href="/Confi"
}

function cerrarSeccion() {
    localStorage.clear();
    window.location.href = "/";
}

let usuarioCache=[]
let pages=1
const maxim=6
async function listarUsuarios(){
    try{
        const response=await fetch("http://localhost:8080/listar/usuarios",{
            method:"GET"

        })
        const data=await response.json()
        //console.log("los datos son: ",data)

        switch(response.status){
            case 200:
                const listaBD=Array.isArray(data.datos) ? data.datos:[data.datos]
                //const listaBD=Array.isArray(data.datos) ? data.datos:[]
                usuarioCache=listaBD.filter(u=>u.estadoUser=='1') 
                //renderTabla(usuarioCache) // se sobreescribe los usuarios con el array
                pages=1
                listaUser(pages)
                break
            case 404:
                const tablaUser=document.getElementById("gestionUsuarios")
                if (tablaUser) {
                    tablaUser.innerHTML=`<tr><td colspan="6">Error al Cargar los Usuarios</td></tr>`
                }
                break
        }
        
    }catch(err){
            console.error("Error:",err)
        }
}

function listaUser(pagina){
    let inicio=(pagina-1)*maxim
    let fin=inicio + maxim
    const userMax=usuarioCache.slice(inicio,fin)

   const tbody = document.getElementById("gestionUsuarios")
    tbody.classList.remove("efecto-libro")
    void tbody.offsetWidth; // 
    tbody.classList.add("efecto-libro") 

    renderTabla(userMax)
    renderControl()
    console.log("el dato es: ",userMax)
}

 function renderControl(){
    const tatalPages=Math.ceil(usuarioCache.length/maxim)
    const contenedor=document.getElementById("controlPaginacion")

    if (!contenedor) return;

    contenedor.innerHTML = `
        <button onclick="cambiarPagina(-1)" ${pages === 1 ? 'disabled' : ''} class="btn-pag cursor-pointer"> &lt; Anterior </button>
        <span> Página ${pages} de ${tatalPages} </span>
        <button onclick="cambiarPagina(1)" ${pages=== tatalPages ? 'disabled' : ''} class="btn-pag cursor-pointer"> Siguiente &gt; </button>
    `;

   
    

}

 function cambiarPagina(direccion){
        pages +=direccion
        listaUser(pages)
    }

window.cambiarPagina=cambiarPagina



function renderTabla(usuarios){
    const tbody=document.getElementById("gestionUsuarios")
    if(!tbody)return
    if (usuarios.length===0) {
        tbody.innerHTML=`<tr><td colspan="6" class="text-center">No se encontraron usuarios</td></tr>`
        console.error("no se encontro los usuarios",usuarios)
        return
    }
    if(tbody){
         tbody.innerHTML=usuarios.map(u =>`
     <tr class="animar-hoja border-b hover:bg-gray-50 transition-colors">
        <td>${u.id}</td>
        <td>${u.roll}</td>
        <td>${u.nombre}</td>
        <td>${u.apellidos}</td>
        <td>${u.correo}</td>
        <td>${u.telefono}</td>
        <td> <button onclick="prepararEdicion(${u.id})" class="cursor-pointer" title="Editar">📝</button>
        <td> <button onclick="prepararInativar(${u.id})" class="cursor-pointer" title="Eliminar">🗑️</button>
        <td> <button onclick="prepararEmpleado(${u.id})" class="cursor-pointer" title="Empleaar">👷‍♂️</button>
        </td>
        </tr>

        `).join("")
    }
    else{
        console.error("error desconocido")
    }
   
}

function prepararEdicion(id){
      localStorage.setItem('IdEditar',id)
      window.location.href="/perfil"
}

async function prepararInativar(id){
    if(!confirm(`¿Desea Inactivar Este Usuario con ID: ${id}?`))return
    else{
        try{
            const send=await fetch(`http://localhost:8080/inactivar/usuarios/${id}`,{
            method:"POST"

        })
        if(send.ok){
            alert("se inactico el usuario")
            window.location.reload()
        }
        }catch(err){
            console.error("error en el metodo del front",err)
        }

    }
          
}

async function prepararEmpleado(id){
   const url=`convertirEmpleado?idPersona=${id}`
   window.location=url
}

async function editarUsuarios() {
    let id=localStorage.getItem("IdEditar")
    const state=document.getElementById("estadoUser")
    if (!id) {
        //console.error("No se encontro ningun id seleccionado")
        id=localStorage.getItem("identificacion")
        console.log("el identificador es: ",id)
    }
  
    try{
        const response=await fetch(`http://localhost:8080/consultar/${id}`,{
            method: "GET"
        })
        const resultado=await response.json()
       // console.log("los datos son:",resultado.datos)

        if(response.status===200 && resultado.datos){
            const u=resultado.datos
            
            document.getElementById("idUser").value=u.id
            document.getElementById("nombreUser").value=u.nombre
                 document.getElementById("apellidosUser").value=u.apellidos
                document.getElementById("fechaUser").value=u.fechaNacimiento
                document.getElementById("newRoll").value=u.roll
                document.getElementById("correoUser").value=u.correo
                document.getElementById("telefonoUser").value= u.telefono
                if(u.estadoUser==1&&state){
                    state.innerText="Activo"
                }
                else{
                    state.innerText="inactivo"
                }
        }
        else{
            console.log("error no se encontro o no funciono el metodo")
        }
      if (id===null) {
        console.error("No se encontro ningun id seleccionado", id)
        return
 
    }

    }
    catch(err){
        console.error("alerta error desconocido")
    }
}



async function datosConfi(id){


    try{
     const payload={
        nombreUser: document.getElementById("nombreUser").value,
       // idPersona:parseInt(id),
       idPersona: parseInt(document.getElementById("idUser").value),
        apellidosUser: document.getElementById("apellidosUser").value,
        rollUser: document.getElementById("newRoll").value,
        fechaUser: document.getElementById("fechaUser").value,
        correoUser: document.getElementById("correoUser").value,
        contraseniaUser:document.getElementById("contraseñaActu").value ,
        newTelefono:document.getElementById("telefonoUser").value 
    }

        const respuesta=await fetch("http://localhost:8080/actualizar/datos",{
            method: "PUT",
             headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const inputs=await respuesta.json()
        console.log("los datos enviados son: ",payload)
        if(respuesta.ok) {
            alert("Datos actualizados con éxito");
            //localStorage.clear()
            window.location.reload();

        }
        else{
            alert(inputs.mensaje)
            return
        }
    }catch(error){
        alert("error interno",error)
    }

}

 async function elistaUserInactivados(){
    try{
        const response =await fetch("http://localhost:8080/encontrar/inactivados")
        const data =await response.json()

        const tablaInabi=document.getElementById("tablaInabili")
        

        if(!tablaInabi) return

        if(response.ok ){
            const listaBase= Array.isArray(data) ? data: []

            usuarioCache= listaBase

            renderTablaInactivos(usuarioCache) // se sobreescribe la variable con el array 
        }
        else{
            console.error("no se renderizo la tabla")
        }

    }catch(err){
        console.error("el servidor no responde bien",err)
        
    }
} 
function renderTablaInactivos(usuarios){
    const tbody = document.querySelector("#tablaInabili tbody")

    if(!tbody) return

    if (usuarios.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6">No hay usuarios inactivos</td></tr>`
        return
    }


    tbody.innerHTML = usuarios.map(u =>{
        const estadoUser=u.estadoUser ===0 ? 'Inactivo':'Activo'
        return `

        <tr>
            <td>${u.id}</td>
            <td>${u.nombre}</td>
            <td>${u.apellidos}</td>
            <td>${u.correo}</td>
            <td>${u.telefono}</td>
            <td><button 
  onclick="activarUsuario(${u.id})" 
  class="group bg-red-500 text-white px-3 py-1 rounded w-20 scala"
>
  <span class="group-hover:hidden">Inactivo</span>
  <span class="hidden group-hover:inline cursor-pointer ">Activar</span>
</button></td>
          
        </tr>
    `}).join("")

}

async function activarUsuario(id){
    const estadoUser=confirm("Desea habilitar a este usuario")
    if(!estadoUser) return
    if(estadoUser){
    /*     const payload={
        activarUser:1
    } */
    try{
        const respuesta =await fetch(`http://localhost:8080/activar/usuario/${id}`,{
            method: "POST"
           /*  headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload) */
            
        })
        const datos=await respuesta.json()

        if(respuesta.ok){
            console.log("setear a: ",datos)
            alert(datos.mensaje)
        }
     if (!respuesta.ok) {
            throw new Error(`HTTP error: ${respuesta.status}`);
        }
    

    }catch(err){
        console.error("error de tipo desconocido")
    }
    }
    
}

async function contarUser(){
    const mensajeCount=document.getElementById("contarUserBD")
    const numerosCount=document.getElementById("numberUser")

    try{
        const response=await fetch("http://localhost:8080/contar/usarios",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        })
        const datos=await response.json()
        if(datos){
            mensajeCount.innerText=datos.mensaje
            numerosCount.innerText=datos.total
        }
    }catch(err){
        console.error("servidor no responde bien",err)
    }

}


function ver_nav(){
    const flechaEmple=document.getElementById("arrowEm")
    const navEmple=document.getElementById("subgrupoEmp")

    flechaEmple.addEventListener("click",()=>{
        console.log("tecla del empleado detectada")
        if(navEmple.classList.contains("hidden")){
            navEmple.classList.remove("hidden")
           flechaEmple.classList.add("rotar-flecha");
        }else{
            navEmple.classList.add("hidden")
            flechaEmple.classList.remove("rotar-flecha")
        }
/*         nota importante: 1. El elemento <a> es "inline" por defecto
Los elementos <a> (y los <span>) tienen una propiedad de CSS llamada display: inline. Los elementos 
inline no se pueden rotar ni transformar. Para que la rotación funcione, necesitas cambiar la propiedad 
de display a inline-block o block */
        
    })
}
function paginaWorker(elemento){
    const roll = elemento.dataset.roll
    const url=`listarEmpleados?roll=${roll}`
    console.log("rederigiendo a la seccion ",roll)
    window.location.href=url
}

export function buscadorUsuarios(){
    const buscarTabla = document.getElementById("buscarUser")
    if (!buscarTabla) return;
    
    buscarTabla.addEventListener('keyup', function(){
        const texto = this.value.toLowerCase().trim()
        
        if (texto === "") {
            // mostrar todos si el buscador esta vacio
            renderTabla(usuarioCache)
            renderTablaInactivos(usuarioCache)
            listaUser(pages) 
            return
        }
        
        // filtrar usuarios que coincidan con la búsqueda
        const usuariosFiltrados = usuarioCache.filter(usuario => 
            usuario.nombre.toLowerCase().includes(texto) ||
            usuario.apellidos.toLowerCase().includes(texto) ||
            usuario.correo.toLowerCase().includes(texto)
        )
        
        // renderizar los filtrados
        renderTabla(usuariosFiltrados)
        renderTablaInactivos(usuariosFiltrados)
    })
}






/* async function datosConfi(elemeto){
    let valorCambiar=elemeto.innerText 
    let cambiarInput=document.getElementById("confiDatos").value=valorCambiar

    payload={
        opcion:cambiarInput,
        input:elec
      //  id:parseInt(id)
    }


    try{

        const respuesta=await fetch("http://localhost:8080/actualizar/datos",{
            method: "PUT",
             headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const inputs=await respuesta.json()
        switch(cambiarInput){
        case "Nombres":
        case "Apellidos":
        case "fecha de Nacimiento":
        case "Contraseña":
        const elec=prompt("Ingresar Nuevo  " +cambiarInput)
        
        if(!elec){
            alert("error debe ingresar datos")
        }
        
        if (elec) {
            
            console.log("el input es:"+elec,"el switch es: "+cambiarInput)
            valorCambiar=elec
        }
        if(respuesta.status===200 && inputs.codigo===0){
            alert[inputs.mensaje]

            localStorage.removeItem("IdEditar")
            window.location.href="/perfil"
        }
    }
    
    metodo no sirve porque en la base de datos las duplas no pueden ser nulas
        

    }catch(err){
        console.error("error de origen desconocido")
    }
  
    
}

 */
editarUsuarios() // este se debe dejar de ultimo no tengo ni idea del orque
contarUser()
