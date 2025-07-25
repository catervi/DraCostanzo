// Datos de horarios por consultorio
const horariosConsultorios = {
    1: {
        nombre: "Consultorio Centro",
        direccion: "Av. Principal 123, Centro",
        horarios: [
            { dia: "Lunes", horas: "9:00 - 13:00 / 15:00 - 19:00" },
            { dia: "Martes", horas: "9:00 - 13:00 / 15:00 - 19:00" },
            { dia: "Miércoles", horas: "9:00 - 13:00" },
            { dia: "Jueves", horas: "15:00 - 19:00" },
            { dia: "Viernes", horas: "9:00 - 13:00 / 15:00 - 19:00" },
            { dia: "Sábado", horas: "9:00 - 13:00" },
            { dia: "Domingo", horas: "Cerrado" }
        ],
        horasDisponibles: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"]
    },
    2: {
        nombre: "Consultorio Norte",
        direccion: "Calle Norte 456, Zona Norte",
        horarios: [
            { dia: "Lunes", horas: "8:00 - 12:00 / 14:00 - 18:00" },
            { dia: "Martes", horas: "8:00 - 12:00" },
            { dia: "Miércoles", horas: "8:00 - 12:00 / 14:00 - 18:00" },
            { dia: "Jueves", horas: "8:00 - 12:00 / 14:00 - 18:00" },
            { dia: "Viernes", horas: "8:00 - 12:00" },
            { dia: "Sábado", horas: "Cerrado" },
            { dia: "Domingo", horas: "Cerrado" }
        ],
        horasDisponibles: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]
    },
    3: {
        nombre: "Consultorio Sur",
        direccion: "Av. Sur 789, Zona Sur",
        horarios: [
            { dia: "Lunes", horas: "10:00 - 14:00 / 16:00 - 20:00" },
            { dia: "Martes", horas: "10:00 - 14:00 / 16:00 - 20:00" },
            { dia: "Miércoles", horas: "10:00 - 14:00" },
            { dia: "Jueves", horas: "16:00 - 20:00" },
            { dia: "Viernes", horas: "10:00 - 14:00 / 16:00 - 20:00" },
            { dia: "Sábado", horas: "10:00 - 14:00" },
            { dia: "Domingo", horas: "Cerrado" }
        ],
        horasDisponibles: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]
    }
};

// Función para mostrar horarios en modal
function verHorarios(consultorioId) {
    const consultorio = horariosConsultorios[consultorioId];
    const modal = document.getElementById('horariosModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `Horarios - ${consultorio.nombre}`;
    
    let horariosHTML = `
        <div class="consultorio-info">
            <p><i class="fas fa-map-marker-alt"></i> ${consultorio.direccion}</p>
        </div>
        <div class="horarios-grid">
    `;
    
    consultorio.horarios.forEach(horario => {
        const isClosedClass = horario.horas === 'Cerrado' ? 'style="opacity: 0.5;"' : '';
        horariosHTML += `
            <div class="horario-item" ${isClosedClass}>
                <span class="horario-dia">${horario.dia}</span>
                <span class="horario-horas">${horario.horas}</span>
            </div>
        `;
    });
    
    horariosHTML += '</div>';
    modalBody.innerHTML = horariosHTML;
    modal.style.display = 'block';
    
    // Animar entrada del modal
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

// Función para cerrar modal
function cerrarModal() {
    const modal = document.getElementById('horariosModal');
    modal.style.display = 'none';
}

// Función para ir a la sección de turnos desde el modal
function solicitarTurno() {
    cerrarModal();
    document.getElementById('turnos').scrollIntoView({ behavior: 'smooth' });
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('horariosModal');
    if (event.target === modal) {
        cerrarModal();
    }
}

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Funcionalidad del formulario de turnos
document.addEventListener('DOMContentLoaded', function() {
    const consultorioSelect = document.getElementById('consultorio');
    const horaSelect = document.getElementById('hora');
    const fechaInput = document.getElementById('fecha');
    const turnoForm = document.getElementById('turnoForm');
    
    // Actualizar horas disponibles cuando cambia el consultorio
    consultorioSelect.addEventListener('change', function() {
        const consultorioId = this.value;
        horaSelect.innerHTML = '<option value="">Selecciona una hora</option>';
        
        if (consultorioId && horariosConsultorios[consultorioId]) {
            const horas = horariosConsultorios[consultorioId].horasDisponibles;
            horas.forEach(hora => {
                const option = document.createElement('option');
                option.value = hora;
                option.textContent = hora;
                horaSelect.appendChild(option);
            });
        }
    });
    
    // Establecer fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
    fechaInput.min = today;
    
    // Manejar envío del formulario
    turnoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Recopilar datos del formulario
        const formData = new FormData(this);
        const turnoData = {
            consultorio: horariosConsultorios[formData.get('consultorio')]?.nombre || '',
            fecha: formData.get('fecha'),
            hora: formData.get('hora'),
            nombre: formData.get('nombre'),
            telefono: formData.get('telefono'),
            email: formData.get('email'),
            motivo: formData.get('motivo')
        };
        
        // Simular envío (aquí conectarías con tu backend)
        mostrarConfirmacion(turnoData);
    });
});

// Función para mostrar confirmación de turno
function mostrarConfirmacion(turnoData) {
    const modal = document.getElementById('horariosModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = '¡Solicitud Enviada!';
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #10b981; margin-bottom: 1rem;">Turno Solicitado Exitosamente</h3>
            <div style="background: #f0fdf4; padding: 1.5rem; border-radius: 10px; margin: 1rem 0; text-align: left;">
                <p><strong>Consultorio:</strong> ${turnoData.consultorio}</p>
                <p><strong>Fecha:</strong> ${new Date(turnoData.fecha).toLocaleDateString('es-ES')}</p>
                <p><strong>Hora:</strong> ${turnoData.hora}</p>
                <p><strong>Paciente:</strong> ${turnoData.nombre}</p>
                <p><strong>Teléfono:</strong> ${turnoData.telefono}</p>
            </div>
            <p style="color: #6b7280; margin-top: 1rem;">
                Nos pondremos en contacto contigo para confirmar el turno en las próximas horas.
            </p>
        </div>
    `;
    
    // Cambiar el botón del footer
    document.querySelector('.modal-footer').innerHTML = `
        <button class="btn btn-primary" onclick="cerrarModal()">
            <i class="fas fa-times"></i>
            Cerrar
        </button>
    `;
    
    modal.style.display = 'block';
    
    // Limpiar formulario
    document.getElementById('turnoForm').reset();
}

// Animaciones al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animación de las tarjetas al entrar en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas de consultorios
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.consultorio-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
});