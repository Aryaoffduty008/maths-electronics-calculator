let rlChart;

function calculateRL() {
  const R = parseFloat(document.getElementById("R").value);
  const L = parseFloat(document.getElementById("L").value);
  const V = parseFloat(document.getElementById("V").value);

  const tau = L / R;
  document.getElementById("timeConstant").innerHTML =
    "Time Constant (L/R) = " + tau.toFixed(4) + " seconds";

  const t = [];
  const i = [];

  for (let k = 0; k <= 50; k++) {
    const time = k * tau / 10;
    t.push(time);
    i.push((V / R) * (1 - Math.exp(-time / tau)));
  }

  plotRL(t, i);
}

function plotRL(t, i) {
  const ctx = document.getElementById("rlChart").getContext("2d");

  if (rlChart) {
    rlChart.destroy();
  }

  rlChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: t,
      datasets: [{
        label: "Current vs Time",
        data: i,
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Time (s)" } },
        y: { title: { display: true, text: "Current (A)" } }
      }
    }
  });
}
