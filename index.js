//arrays
const profesionesMedicas = [
    { nombre: "Médico General", horasSemanales: 40 },
    { nombre: "Cirujano", horasSemanales: 50 },
    { nombre: "Pediatra", horasSemanales: 35 }
];

function calcularSueldo() {
    const nombre = prompt("Por favor, ingrese su nombre:");
    const apellido = prompt("Por favor, ingrese su apellido:");
    const dni = prompt("Por favor, ingrese su DNI:");
    const mail = prompt("Por favor, ingrese su correo electrónico:");
    const fechaNacimiento = prompt("Por favor, ingrese su fecha de nacimiento:");
    const montoPorHora = parseFloat(prompt("Por favor, ingrese el monto por hora:"));

    const opcionProfesion = parseInt(prompt("Por favor, elija una profesión médica:\n1. Médico General\n2. Cirujano\n3. Pediatra"));
    
    // Validar la elección del usuario
    if (opcionProfesion >= 1 && opcionProfesion <= profesionesMedicas.length) {
        const profesionElegida = profesionesMedicas[opcionProfesion - 1]; 
        const sueldoMensual = montoPorHora * profesionElegida.horasSemanales * 4;
        const sueldoAnual = sueldoMensual * 12;

        // Sueldo anual con aumentos de 2%, 3% y 5%
        const sueldoAnualConAumento2 = sueldoAnual * 1.02;
        const sueldoAnualConAumento3 = sueldoAnual * 1.03;
        const sueldoAnualConAumento5 = sueldoAnual * 1.05;

        const resultado = `Sueldo Mensual de ${nombre} ${apellido} como ${profesionElegida.nombre}:\n$${sueldoMensual.toFixed(2)}\nSueldo Anual sin ajustes: $${sueldoAnual.toFixed(2)}\nSueldo Anual con 2% de aumento: $${sueldoAnualConAumento2.toFixed(2)}\nSueldo Anual con 3% de aumento: $${sueldoAnualConAumento3.toFixed(2)}\nSueldo Anual con 5% de aumento: $${sueldoAnualConAumento5.toFixed(2)}`;
        
        alert(resultado); 
        console.log(resultado); 
    } else {
        alert("Opción no válida. Por favor, elija una opción válida.");
    }
}


