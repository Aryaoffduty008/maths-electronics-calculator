let rcChart;

function calculateRC() {
  const R = parseFloat(document.getElementById("R").value);
  const C = parseFloat(document.getElementById("C").value);
  const V = parseFloat(document.getElementById("V").value);

  const tau = R * C;
  document.getElementById("timeConstant").innerHTML =
    "Time Constant (RC) = " + tau + " seconds";

  const t = [];
  const vc = [];

  for (let i = 0; i <= 50; i++) {
    const time = i * tau / 10;
    t.push(time);
    vc.push(V * (1 - Math.exp(-time / tau)));
  }

  plotRC(t, vc);
}

function plotRC(t, vc) {
  const ctx = document.getElementById("rcChart").getContext("2d");

  if (rcChart) {
    rcChart.destroy();
  }

  rcChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: t,
      datasets: [{
        label: "Capacitor Voltage vs Time",
        data: vc,
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Time (s)" } },
        y: { title: { display: true, text: "Voltage (V)" } }
      }
    }
  });
}
