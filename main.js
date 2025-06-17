
const root = document.getElementById('root');

let trips = JSON.parse(localStorage.getItem('didiTrips') || '[]');

function render() {
  const totalDistance = trips.reduce((sum, trip) => sum + trip.distance, 0);
  const totalFare = trips.reduce((sum, trip) => sum + trip.fare, 0);
  const totalProfit = trips.reduce((sum, trip) => sum + trip.profit, 0);

  root.innerHTML = `
    <h1>DiDi Tracker</h1>
    <div>
      <label>اليوم:</label>
      <select id="day">
        <option value="السبت">السبت</option>
        <option value="الأحد">الأحد</option>
        <option value="الاثنين">الاثنين</option>
        <option value="الثلاثاء">الثلاثاء</option>
        <option value="الأربعاء">الأربعاء</option>
        <option value="الخميس">الخميس</option>
        <option value="الجمعة">الجمعة</option>
      </select>
      <input id="startTime" placeholder="يبدأ الساعة كام؟" type="time" />
      <input id="area" placeholder="هيشتغل فين؟" type="text" />
      <input id="avoid" placeholder="يبعد عن ايه؟" type="text" />
    </div>
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
          <th>اليوم</th>
          <th>الساعة</th>
          <th>المنطقة</th>
          <th>يتجنب</th>
          <th>قبل الرحلة</th>
          <th>بعد الرحلة</th>
          <th>المسافة</th>
          <th>المبلغ</th>
          <th>بنزين</th>
          <th>الربح</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody>
        ${trips.map((t, i) => `
          <tr>
            <td>${t.day}</td>
            <td>${t.startTime}</td>
            <td>${t.area}</td>
            <td>${t.avoid}</td>
            <td>${t.startKm}</td>
            <td>${t.endKm}</td>
            <td>${t.distance} كم</td>
            <td>${t.fare} جنيه</td>
            <td>${t.fuelCost.toFixed(2)} جنيه</td>
            <td>${t.profit.toFixed(2)} جنيه</td>
            <td><button onclick="deleteTrip(${i})">❌</button></td>
          </tr>`).join('')}
      </tbody>
    </table>
  `;
}

function addTrip() {
  const startKm = parseFloat(document.getElementById('startKm').value);
  const endKm = parseFloat(document.getElementById('endKm').value);
  const fare = parseFloat(document.getElementById('fare').value);
  const day = document.getElementById('day').value;
  const startTime = document.getElementById('startTime').value;
  const area = document.getElementById('area').value;
  const avoid = document.getElementById('avoid').value;

  const distance = endKm - startKm;
  const fuelCost = distance * 1.725;
  const profit = fare - fuelCost;

  trips.push({ startKm, endKm, distance, fare, fuelCost, profit, day, startTime, area, avoid });
  localStorage.setItem('didiTrips', JSON.stringify(trips));
  render();
}

function deleteTrip(index) {
  trips.splice(index, 1);
  localStorage.setItem('didiTrips', JSON.stringify(trips));
  render();
}

render();
