document.addEventListener("DOMContentLoaded", function () {
    // Obtener el elemento de selección de profesión
    const profesionSelect = document.getElementById("profesion");
    let profesionesMedicas = []; // Definir la variable en un alcance más amplio
    let canvas; // Declarar la variable canvas en un alcance más amplio

    // Cargar los datos desde el archivo JSON local
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
            // Obtener la lista de profesiones desde los datos cargados
            profesionesMedicas = data.profesiones; // Asignar los datos al arreglo de profesiones

            // Llenar el elemento select con las opciones de profesiones
            profesionesMedicas.forEach((profesion) => {
                const option = document.createElement("option");
                option.value = profesion.nombre;
                option.textContent = profesion.nombre;
                profesionSelect.appendChild(option);
            });

            // Cargar la profesión preferida del usuario desde el almacenamiento local
            const profesionPreferida = localStorage.getItem("profesionPreferida");

            // Si se encuentra una profesión preferida en el almacenamiento local, establecerla como seleccionada
            if (profesionPreferida) {
                profesionSelect.value = profesionPreferida;
            }
        })
        .catch((error) => {
            console.error("Error al cargar el archivo JSON: " + error);
        });

    // Función para calcular el sueldo
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

            // Crear y mostrar el gráfico
            crearGrafico(sueldoAnualConInflacion);
        } else {
            alert("Opción no válida. Por favor, elija una opción válida.");
        }
    }

    // Encuentra el botón por su id y agrega un event listener para el clic
    const calcularButton = document.getElementById("calcularButton");
    calcularButton.addEventListener("click", calcularSueldo);

    // Encuentra el botón "Guardar Profesión Favorita" y agrega un event listener para el clic
    const guardarProfesionButton = document.getElementById("guardarProfesion");
    guardarProfesionButton.addEventListener("click", function () {
        const profesionPreferida = profesionSelect.value;
        localStorage.setItem("profesionPreferida", profesionPreferida);
        alert(`Profesión ${profesionPreferida} guardada como favorita.`);
    });

    // Función para crear y mostrar el gráfico
    function crearGrafico(sueldoAnualConInflacion) {
        // Encuentra el elemento del canvas donde se dibujará el gráfico
        canvas = document.getElementById("graficoSueldo");
        const containerWidth = 600;
        const canvasWidth = containerWidth;
        const canvasHeight = (containerWidth * 2) / 3;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.width = 400;
        canvas.height = 300;

        const ctx = canvas.getContext("2d");
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const sueldosMensuales = Array.from({ length: 12 }, (_, i) => sueldoAnualConInflacion / 12);

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: meses,
                datasets: [{
                    label: 'Sueldo Mensual con Inflación',
                    data: sueldosMensuales,
                    backgroundColor: 'rgba(0, 120, 212, 0.6)', // Color de las barras
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Sueldo Mensual ($)'
                        }
                    }
                }
            }
        });
    }
});
