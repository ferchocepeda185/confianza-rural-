/* -------------------------------
   SIMULADOR DE CRÉDITO
--------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
  
  const simuladorForm = document.getElementById("simulador-form");
  const simuladorResultado = document.getElementById("simulador-result");

  if (simuladorForm) {
    simuladorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const monto = parseFloat(document.getElementById("monto").value);
      const plazo = parseInt(document.getElementById("plazo").value);
      const modalidad = document.getElementById("modalidad").value;

      let tasa;
      if (modalidad === "p2p") tasa = 0.015;       // 1.5% mensual
      if (modalidad === "productivo") tasa = 0.012; // 1.2% mensual
      if (modalidad === "fondo") tasa = 0.010;      // 1% mensual

      const interes = monto * tasa * plazo;
      const total = monto + interes;
      const cuota = (total / plazo).toFixed(2);

      simuladorResultado.innerHTML = `
        <h3>Resultado de tu crédito:</h3>
        <p><strong>Monto solicitado:</strong> $${monto.toLocaleString()}</p>
        <p><strong>Plazo:</strong> ${plazo} meses</p>
        <p><strong>Modalidad:</strong> ${modalidad}</p>
        <hr>
        <p><strong>Interés total:</strong> $${interes.toLocaleString()}</p>
        <p><strong>Total a pagar:</strong> $${total.toLocaleString()}</p>
        <p><strong>Cuota mensual aproximada:</strong> $${cuota.toLocaleString()}</p>
      `;
    });
  }

  /* -------------------------------
     SCORING ALTERNATIVO
  --------------------------------*/

  const scoringForm = document.getElementById("scoring-form");
  const scoringResult = document.getElementById("scoring-result");

  if (scoringForm) {
    scoringForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const ingresos = parseFloat(document.getElementById("ingresos").value);
      const experiencia = parseInt(document.getElementById("experiencia").value);
      const reputacion = parseInt(document.getElementById("reputacion").value);

      // Algoritmo simple basado en el Capítulo 3:
      let score = 0;

      // Ingresos rurales ponderados
      if (ingresos < 800000) score += 10;
      else if (ingresos < 1200000) score += 20;
      else if (ingresos < 2000000) score += 30;
      else score += 40;

      // Años de experiencia productiva
      if (experiencia <= 1) score += 10;
      else if (experiencia <= 3) score += 20;
      else if (experiencia <= 6) score += 30;
      else score += 40;

      // Reputación comunitaria
      score += reputacion;

      // Clasificación final
      let nivel = "";
      if (score < 40) nivel = "Riesgo Alto";
      else if (score < 70) nivel = "Riesgo Medio";
      else nivel = "Riesgo Bajo";

      scoringResult.innerHTML = `
        <h3>Resultado de tu scoring:</h3>
        <p><strong>Puntaje total:</strong> ${score}</p>
        <p><strong>Nivel de riesgo:</strong> ${nivel}</p>
        <hr>
        <p>Este cálculo se basa en ingresos, experiencia productiva y reputación comunitaria, siguiendo el modelo alternativo del Capítulo 3.</p>
      `;
    });
  }

});
