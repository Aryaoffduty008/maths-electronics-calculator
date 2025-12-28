function solveDC() {
  const R1 = parseFloat(document.getElementById("R1").value);
  const R2 = parseFloat(document.getElementById("R2").value);
  const R3 = parseFloat(document.getElementById("R3").value);
  const V1 = parseFloat(document.getElementById("V1").value);
  const V2 = parseFloat(document.getElementById("V2").value);

  /*
    Mesh equations:
    (R1 + R3) I1 - R3 I2 = V1
    -R3 I1 + (R2 + R3) I2 = V2
  */

  const A = [
    [R1 + R3, -R3],
    [-R3, R2 + R3]
  ];

  const B = [V1, V2];

  const det = A[0][0]*A[1][1] - A[0][1]*A[1][0];

  if (det === 0) {
    document.getElementById("result").innerHTML =
      "No unique solution exists.";
    return;
  }

  const I1 = (B[0]*A[1][1] - A[0][1]*B[1]) / det;
  const I2 = (A[0][0]*B[1] - B[0]*A[1][0]) / det;

  document.getElementById("result").innerHTML =
    "Loop Current I₁ = " + I1.toFixed(3) + " A<br>" +
    "Loop Current I₂ = " + I2.toFixed(3) + " A";
}
