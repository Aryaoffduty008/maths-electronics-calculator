let powerChart;

function calculatePower() {
  const V = parseFloat(document.getElementById("V").value);
  const I = parseFloat(document.getElementById("I").value);
  const R = parseFloat(document.getElementById("R").value);

  const P1 = V * I;
  const P2 = I * I * R;
  const P3 = (V * V) / R;

  document.getElementById("results").innerHTML =
    "P = V × I = " + P1.toFixed(2) + " W<br>" +
    "P = I² × R = " + P2.toFixed(2) + " W<br>" +
    "P = V² / R = " + P3.toFixed(2) + " W";

  const Rvals = [];
  const Pvals = [];

  for (let r = 1; r <= 50; r++) {
    Rvals.push(r);
    Pvals.push((V * V) / r);
  }

  plotPower(Rvals, Pvals);
}

function plotPower(Rvals, Pvals) {
  const ctx = document.getElementById("powerChart").getContext("2d");

  if (powerChart) {
    powerChart.destroy();
  }

  powerChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Rvals,
      datasets: [{
        label: "Power vs Resistance (P = V² / R)",
        data: Pvals,
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Resistance (Ω)" } },
        y: { title: { display: true, text: "Power (W)" } }
      }
    }
  });
}
