

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon'); 
    const sunIcon = document.getElementById('sun-icon'); 
    const bodyElement = document.getElementById("body");
    const htmlElement = document.documentElement;
        const revealItems = document.querySelectorAll('.reveal-item');//forma para que el navegador encuentre mis animaciones
    if (revealItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        revealItems.forEach(item => {
            observer.observe(item);
        });
    } 
     /*const parallaxImage = document.querySelector('.parallax-img');
    if (parallaxImage) {
        const parallaxContainer = parallaxImage.closest('div');
        if (parallaxContainer) {
            parallaxContainer.addEventListener('mousemove', (e) => {
                const containerRect = parallaxContainer.getBoundingClientRect();
                const centerX = containerRect.left + containerRect.width / 2;
                const centerY = containerRect.top + containerRect.height / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                const moveX = mouseX * 0.05;
                const moveY = mouseY * 0.05;
                parallaxImage.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px) scale(1.1)`;
            });
            parallaxContainer.addEventListener('mouseleave', () => {
                parallaxImage.style.transform = 'translate(0, 0) scale(1.1)';
            });
        } 
        
    } */

    console.log("Elementos encontrados:", {
        themeToggleButton: !!themeToggleButton,
        moonIcon: !!moonIcon,
        sunIcon: !!sunIcon,
        bodyElement: !!bodyElement
    });

    if (themeToggleButton && moonIcon && sunIcon && bodyElement) { 
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            htmlElement.classList.add('dark');
            bodyElement.classList.add('bg-sky-900');
            moonIcon.classList.add('hidden'); 
            sunIcon.classList.remove('hidden'); 
            bodyElement.classList.add('text-white')
        } else {
            htmlElement.classList.remove('dark');
            bodyElement.classList.remove('bg-sky-900');
            moonIcon.classList.remove('hidden'); 
            sunIcon.classList.add('hidden'); 

        }

        // Evento de click
        themeToggleButton.addEventListener('click', () => {
            
            if (htmlElement.classList.contains('dark')) {
                // Cambiar a claro
                htmlElement.classList.remove('dark');
                bodyElement.classList.remove('bg-sky-900');
                localStorage.setItem('theme', 'light');
                moonIcon.classList.remove('hidden'); 
                sunIcon.classList.add('hidden');
            } else {
                // Cambiar a oscuro
                htmlElement.classList.add('dark');
                bodyElement.classList.add('bg-sky-900');
                localStorage.setItem('theme', 'dark');
                moonIcon.classList.add('hidden'); 
                sunIcon.classList.remove('hidden')
            }
        });
    } 
});    
document.addEventListener('DOMContentLoaded', function() {

    const toggleButton = document.getElementById("toggleMenu");
    const nav = document.querySelector("nav"); 

    


    const acordeonHeaders = document.querySelectorAll('.acordeon-header');

    if (toggleButton && nav) { 
        toggleButton.addEventListener("click", function() {
            nav.classList.toggle("oculto");
        });
    }


    acordeonHeaders.forEach(header => {
        header.addEventListener('click', function() {

            const content = this.nextElementSibling; 
          
            const icon = this.querySelector('.acordeon-icon'); 


            if (content.classList.contains('hidden')) {

                content.classList.remove('hidden');

                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) { 
                    icon.classList.add('rotate-180'); 
                }
            } else {
 
                content.style.maxHeight = '0'; 

                content.addEventListener('transitionend', function() {
                    if (content.style.maxHeight === '0px') {
                        content.classList.add('hidden');
                    }
                }, { once: true }); 
                if (icon) { 
                    icon.classList.remove('rotate-180'); 
                }
            }
        });
    });
});

function _buscador_tabla(){
    var _input=document.getElementById("Buscador");
   /*  var _elementos_buscales=document.querySelectorAll(".buscable") */
   if (!_input)return; {
    _input.addEventListener("keyup",function(){
        var _texto=_input.value.toLowerCase();
        var _filas=document.querySelectorAll("table tbody tr");

        _filas.forEach(function(_filas){
            var _titulo=_filas.cells[0].textContent.toLowerCase();
            if (_titulo.includes(_texto)) {
                _filas.style.display="";
            }
            else{
                _filas.style.display="none";
            }
        })
    })
   }
    
   
}
document.addEventListener("DOMContentLoaded",function(){
    _buscador_tabla();
})

function crearCita(){
    /*scrip para cear cita*/
}

function _buscador() {

    var input = document.getElementById("buscador");
    

    var elementosBuscables = document.querySelectorAll(".buscable");

    if (!input) {
        console.error("El elemento con ID 'buscador' no fue encontrado.");
        //alert("El elemento con ID 'buscador' no fue encontrado.")
        return; 
    }

    input.addEventListener("keyup", function() {
     
        var textoBuscado = input.value.toLowerCase();
        
        var resultadosEncontrados = false;

        elementosBuscables.forEach(function(elemento) {
    
            var contenido = elemento.textContent.toLowerCase();

            if (contenido.includes(textoBuscado)) {
                
                elemento.style.display = ""; 
                resultadosEncontrados = true;
            } else {
                elemento.style.display = "none";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    _buscador();
});

function _nuevoUsuario(){
    //logica para crear y conectar a la base de datos
}

function loginUsuario_google(){
    //conectar el usuario con su correo personal.
}

document.addEventListener('DOMContentLoaded', function() {
    const botonMensaje = document.getElementById('boton_mensaje');
    const mensajeNotifi = document.getElementById("mensaje_notificaciones");
    const _bage_notifi = document.getElementById("bage_noti");
    const dibujarMensaje = document.getElementById("dibujar_mensaje");
    const botonBorrar = document.getElementById("borrar_mensajes"); 

    function actualizarMensajes() {
        const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes')) || [];


        if (mensajeNotifi) {
            mensajeNotifi.innerHTML = '';
        }

        if (mensajesGuardados.length > 0) {
            mensajesGuardados.forEach(mensajeData => {
                if (dibujarMensaje) {
                    dibujarMensaje.innerHTML = `
                        <strong>${mensajeData.nombre}</strong><br>
                        ${mensajeData.mensaje}<br>
                        <small>${mensajeData.timestamp}</small>
                    `;
                }
                
                if (mensajeNotifi) {
                    const nuevoMensaje = document.createElement("li");
                    nuevoMensaje.innerHTML = `
                        <strong>${mensajeData.nombre}</strong>: 
                        ${mensajeData.mensaje}
                        <br><small>${mensajeData.timestamp}</small>
                    `;
                    mensajeNotifi.appendChild(nuevoMensaje);
                }
            });


            if (_bage_notifi) {
                _bage_notifi.style.display = "";
                _bage_notifi.textContent = mensajesGuardados.length;
            }

        } else {

            if (_bage_notifi) {
                _bage_notifi.style.display = "none";
            }
            if (dibujarMensaje) {
                 dibujarMensaje.innerHTML = '';
            }
        }
    }
    actualizarMensajes();

    if (botonMensaje) {
        botonMensaje.addEventListener('click', function(event) {
            event.preventDefault();

            const nombreInput = document.getElementById("nombre_mensaje");
            const telefonoInput = document.getElementById("telefono_empresa");
            const emailInput = document.getElementById("email_mensaje");
            const direccionInput = document.getElementById("direccion_mensaje");
            const mensajeInput = document.getElementById("mi_mensaje");

            const mensajeData = {
                nombre: nombreInput.value,
                mensaje: mensajeInput.value,
                telefono: telefonoInput ? telefonoInput.value : '',
                email: emailInput ? emailInput.value : '',
                direccion: direccionInput ? direccionInput.value : '',
                timestamp: new Date().toLocaleString()
            };

            const mensajesActuales = JSON.parse(localStorage.getItem('mensajes')) || [];
            mensajesActuales.push(mensajeData);
            localStorage.setItem('mensajes', JSON.stringify(mensajesActuales));

            
            mensajeInput.value = "";
            nombreInput.value = "";
            if (telefonoInput) telefonoInput.value = "";
            if (emailInput) emailInput.value = "";
            if (direccionInput) direccionInput.value = "";

            // Llamamos a la función de actualización para reflejar el nuevo mensaje
            actualizarMensajes();
        });
    }
    if (botonBorrar) {
        botonBorrar.addEventListener('click', () => {
            localStorage.removeItem('mensajes');
             _bage_notifi.style.display = "none";
            actualizarMensajes();
        });
    }
});