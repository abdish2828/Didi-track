
const root = document.getElementById('root');

let trips = JSON.parse(localStorage.getItem('didiTrips') || '[]');

function render() {
  const totalDistance = trips.reduce((sum, trip) => sum + trip.distance, 0);
  const totalFare = trips.reduce((sum, trip) => sum + trip.fare, 0);
  const totalProfit = trips.reduce((sum, trip) => sum + trip.profit, 0);

  root.innerHTML = `
    <h1>DiDi Tracker</h1>
    <div>
      <input id="startKm" placeholder="عداد قبل الرحلة" type="number"/>
      <input id="endKm" placeholder="عداد بعد الرحلة" type="number"/>
      <input id="fare" placeholder="المبلغ المحصل (جنيه)" type="number"/>
      <button onclick="addTrip()">إضافة الرحلة</button>
    </div>
    <div>
      <p><strong>إجمالي الكيلومترات:</strong> ${totalDistance} كم</p>
      <p><strong>إجمالي الدخل:</strong> ${totalFare} جنيه</p>
      <p><strong>إجمالي الربح الصافي:</strong> ${totalProfit.toFixed(2)} جنيه</p>
    </div>
    <table border="1" style="width:100%;text-align:center">
      <thead>
        <tr>
          <th>قبل الرحلة</th>
          <th>بعد الرحلة</th>
          <th>المسافة</th>
          <th>المبلغ</th>
          <th>بنزين</th>
          <th>الربح</th>
        </tr>
      </thead>
      <tbody>
        ${trips.map(t => `
          <tr>
            <td>${t.startKm}</td>
            <td>${t.endKm}</td>
            <td>${t.distance} كم</td>
            <td>${t.fare} جنيه</td>
            <td>${t.fuelCost.toFixed(2)} جنيه</td>
            <td>${t.profit.toFixed(2)} جنيه</td>
          </tr>`).join('')}
      </tbody>
    </table>
  `;
}

function addTrip() {
  const startKm = parseFloat(document.getElementById('startKm').value);
  const endKm = parseFloat(document.getElementById('endKm').value);
  const fare = parseFloat(document.getElementById('fare').value);
  const distance = endKm - startKm;
  const fuelCost = distance * 1.725;
  const profit = fare - fuelCost;

  trips.push({ startKm, endKm, distance, fare, fuelCost, profit });
  localStorage.setItem('didiTrips', JSON.stringify(trips));
  render();
}

render();
