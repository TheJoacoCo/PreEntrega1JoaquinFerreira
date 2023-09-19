document.addEventListener("DOMContentLoaded", function () {
    // Array de profesiones médicas con horas semanales promedio
    const profesionesMedicas = [
        { nombre: "Médico General", horasSemanales: 40 },
        { nombre: "Cirujano", horasSemanales: 50 },
        { nombre: "Pediatra", horasSemanales: 35 },
        { nombre: "Dermatólogo", horasSemanales: 38 },
        { nombre: "Ginecólogo", horasSemanales: 42 },
        { nombre: "Oftalmólogo", horasSemanales: 37 }
    ];

    // Obtener el elemento de selección de profesión
    const profesionSelect = document.getElementById("profesion");

    // Cargar la profesión preferida del usuario desde el almacenamiento local
    const profesionPreferida = localStorage.getItem("profesionPreferida");
    
    // Si se encuentra una profesión preferida en el almacenamiento local, establecerla como seleccionada
    if (profesionPreferida) {
        profesionSelect.value = profesionPreferida;
    }

    function calcularSueldo() {
        // Obtener los valores de los campos de entrada
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const dni = document.getElementById("dni").value;
        const mail = document.getElementById("mail").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const montoPorHora = parseFloat(document.getElementById("montoPorHora").value);
        const opcionProfesion = document.getElementById("profesion").value;
        const inflacion = parseFloat(document.getElementById("inflacion").value);

        // Validar la elección del usuario
        if (opcionProfesion) {
            const profesionElegida = profesionesMedicas.find(profesion => profesion.nombre === opcionProfesion); 
            const sueldoMensual = montoPorHora * profesionElegida.horasSemanales * 4;
            const sueldoAnual = sueldoMensual * 12;

            // Aplicar la inflación al sueldo anual
            const sueldoAnualConInflacion = sueldoAnual * (1 + (inflacion / 100));

            // Mostrar resultados en el DOM
            const resultadoElement = document.getElementById("resultado");
            resultadoElement.style.display = "block"; // Mostrar el resultado
            resultadoElement.innerHTML = `
                <h2>Resultado:</h2>
                <p>Sueldo Mensual de ${nombre} ${apellido} como ${profesionElegida.nombre}: $${sueldoMensual.toFixed(2)}</p>
                <p>Sueldo Anual sin ajustes: $${sueldoAnual.toFixed(2)}</p>
                <p>Sueldo Anual con Inflación del ${inflacion}%: $${sueldoAnualConInflacion.toFixed(2)}</p>
            `;

            // Guardar la profesión preferida del usuario en el almacenamiento local
            localStorage.setItem("profesionPreferida", opcionProfesion);
        } else {
            alert("Opción no válida. Por favor, elija una opción válida.");
        }
    }

    // Encuentra el botón por su id y agrega un event listener para el clic
    const calcularButton = document.getElementById("calcularButton");
    calcularButton.addEventListener("click", calcularSueldo);
});
