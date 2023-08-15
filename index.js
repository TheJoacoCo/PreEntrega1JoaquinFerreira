function calcularSueldo() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const mail = document.getElementById("mail").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const montoPorHora = parseFloat(document.getElementById("montoPorHora").value);

    const horasPorSemana = 40; // Suponemos una jornada de 40 horas semanales
    const semanasPorMes = 4;   // Suponemos un promedio de 4 semanas por mes

    const sueldoMensual = montoPorHora * horasPorSemana * semanasPorMes;
    const sueldoAnual = sueldoMensual * 12;

    document.getElementById("sueldoMensual").textContent = `Sueldo Mensual de ${nombre} ${apellido}: $${sueldoMensual.toFixed(2)}`;
    document.getElementById("sueldoAnual").textContent = `Sueldo Anual de ${nombre} ${apellido}: $${sueldoAnual.toFixed(2)}`;
}
