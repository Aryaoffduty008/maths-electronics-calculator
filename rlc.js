let chart;

function calculateRLC() {
  const R = parseFloat(document.getElementById("R").value);
  const L = parseFloat(document.getElementById("L").value);
  const C = parseFloat(document.getElementById("C").value);

  const fr = 1 / (2 * Math.PI * Math.sqrt(L * C));
  const Q = (1 / R) * Math.sqrt(L / C);

  document.getElementById("resonance").innerHTML =
    "Resonant Frequency = " + fr.toFixed(2) + " Hz";

  document.getElementById("qfactor").innerHTML =
    "Quality Factor (Q) = " + Q.toFixed(2);

  const freq = [];
  const current = [];

  for (let f = 1; f <= 500; f++) {
    const w = 2 * Math.PI * f;
    const Z = Math.sqrt(
      R * R + Math.pow(w * L - 1 / (w * C), 2)
    );
    freq.push(f);
    current.push(1 / Z);
  }

  plotGraph(freq, current);
}

function plotGraph(freq, current) {
  const ctx = document.getElementById("rlcChart").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: freq,
      datasets: [{
        label: "Current vs Frequency",
        data: current,
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Frequency (Hz)"
          }
        },
        y: {
          title: {
            display: true,
            text: "Current (A)"
          }
        }
      }
    }
  });
}
