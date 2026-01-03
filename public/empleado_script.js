import { ingresarUsuario } from "/scripAdmi.js";

document.addEventListener('DOMContentLoaded', function (){
    

    const _confirm = document.getElementById("confirmar_cita")
    const mensaje_cita = document.getElementById("mensaje_cita")
    const citas_registradas = document.getElementById("citas_registradas")
    const borrar_citas = document.getElementById("borrar_citas")


    function _notificacion_cita(){
        const new_cita = JSON.parse(localStorage.getItem('Confirmar') || '[]');
        const nueva_cita = document.createElement('li')
        const noti_emple=document.getElementById("bage_emple")
const _perfil_empleado = document.getElementById("b_eperfil");

_perfil_empleado.addEventListener('click', () => {
    const menu = document.getElementById("menu_perfil");

    if (menu) {
        menu.style.display="block"
    }
    
});
        noti_emple.style.display='none'


        // Mostrar citas si existen
        if (new_cita.length > 0) {
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
        }
        else{
            citas_registradas.innerHTML = 'No hay citas'
        }
    }

    // Evento para confirmar cita
    if (_confirm) {
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
    }
        
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

_cerrar_.addEventListener('click', (e) => { // Asegúrate de pasar 'e'
    // Detiene el evento para que no llegue al manejador del body.
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

if (borrar_citas) {
        borrar_citas.addEventListener('click', function(e) {
            e.preventDefault() 
                localStorage.removeItem('Confirmar')
                alert("Todas las citas han sido borradas correctamente")
                console.log("funciona")
                citas_registradas.innerHTML=""
                _notificacion_cita()
        })
    }
    _notificacion_cita()
})