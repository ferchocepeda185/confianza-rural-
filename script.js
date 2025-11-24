// ==========================
//   SCORING CALCULATOR
// ==========================

function calcularScoring() {
  const activos = parseFloat(document.getElementById("activos").value);
  const historial = parseFloat(document.getElementById("historial").value);
  const endeudamiento = parseFloat(document.getElementById("endeudamiento").value);
  const antiguedad = parseFloat(document.getElementById("antiguedad").value);
  const comportamiento = parseFloat(document.getElementById("comportamiento").value);
  const demograficos = parseFloat(document.getElementById("demograficos").value);

  // Escala 0–1 → 0–100
  const total = (
    activos +
    historial +
    endeudamiento +
    antiguedad +
    comportamiento +
    demograficos
  ) / 6 * 100;

  const resultado = Math.round(total);

  document.getElementById("scoring-result").innerHTML =
    `<h3>Puntaje final: <strong>${resultado}</strong> / 100</h3>`;
}




// ================================
//   SIMULADOR — MÉTODO FRANCÉS
// ================================

// Asignar valor automáticamente según modelo
document.getElementById("modeloCasaSelect").addEventListener("change", function () {
  const precio = this.options[this.selectedIndex].dataset.precio;
  if (precio) {
    document.getElementById("valorFinanciar").value = precio;
  }
});


// Función principal
function simularFrances() {

  const valor = parseFloat(document.getElementById("valorFinanciar").value);
  const plazo = parseInt(document.getElementById("plazoMeses").value);

  if (isNaN(valor) || valor <= 0) {
    alert("Ingrese un valor válido a financiar.");
    return;
  }

  if (isNaN(plazo) || plazo <= 0) {
    alert("Ingrese un plazo válido.");
    return;
  }

  // Tasa 5% EA → tasa mensual vencida
  const tasaEA = 0.05;
  const tasaMensual = Math.pow(1 + tasaEA, 1 / 12) - 1;

  // Cuota fija del método francés
  const cuota = valor * (tasaMensual * Math.pow((1 + tasaMensual), plazo)) /
                (Math.pow((1 + tasaMensual), plazo) - 1);

  // Mostrar resumen
  document.getElementById("simulador-result").innerHTML = `
    <h3>Resultados</h3>
    <p><strong>Cuota mensual:</strong> $${cuota.toFixed(0).toLocaleString("es-CO")}</p>
    <p><strong>Tasa mensual equivalente:</strong> ${(tasaMensual * 100).toFixed(4)}%</p>
  `;

  // =============================
  // TABLA DE AMORTIZACIÓN
  // =============================

  let saldo = valor;
  let tablaHTML = `
    <table border="1" cellpadding="5">
      <tr>
        <th>Mes</th>
        <th>Cuota</th>
        <th>Interés</th>
        <th>Abono a capital</th>
        <th>Saldo</th>
      </tr>
  `;

  for (let mes = 1; mes <= plazo; mes++) {
    const interes = saldo * tasaMensual;
    const abono = cuota - interes;
    saldo = saldo - abono;

    tablaHTML += `
      <tr>
        <td>${mes}</td>
        <td>$${cuota.toFixed(0).toLocaleString("es-CO")}</td>
        <td>$${interes.toFixed(0).toLocaleString("es-CO")}</td>
        <td>$${abono.toFixed(0).toLocaleString("es-CO")}</td>
        <td>$${Math.max(saldo, 0).toFixed(0).toLocaleString("es-CO")}</td>
      </tr>
    `;
  }

  tablaHTML += `</table>`;
  document.getElementById("amortizacion-table").innerHTML = tablaHTML;
}
