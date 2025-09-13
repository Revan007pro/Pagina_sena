// formulario_citas.js - Solo para el formulario de citas
document.addEventListener('DOMContentLoaded', function (){

    const _confirm = document.getElementById("confirmar_cita")
    const mensaje_cita = document.getElementById("mensaje_cita")

    function _notificacion_cita(){
        const new_cita = JSON.parse(localStorage.getItem('Confirmar') || '[]')

        if (mensaje_cita) {
            mensaje_cita.innerHTML = ''
        }

        if (new_cita.length > 0) {
            new_cita.forEach(cita_data => {
                if (mensaje_cita) {
                    const nueva_cita = document.createElement('li')
                    nueva_cita.innerHTML = `
                    <strong>${cita_data._nombre}</strong><br>
                    <strong>${cita_data._apellido}</strong><br>
                    <strong>${cita_data._fecha}</strong>
                    `
                    mensaje_cita.appendChild(nueva_cita)
                }
            })
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

            // Validar campos
            if (!new_nombre.value || !new_apellido.value || !new_fecha.value) {
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

            // Limpiar campos
            new_nombre.value = ''
            new_apellido.value = ''
            new_documento.value = ''
            new_numero.value = ''
            new_fecha.value = ''
            new_especialidad.value = ''
            
            // Actualizar y mostrar mensaje
            _notificacion_cita()
            alert("¡Cita agendada correctamente!")
        })
    }

    // Cargar citas al iniciar
    _notificacion_cita()
})