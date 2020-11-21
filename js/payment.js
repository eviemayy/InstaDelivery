// let headers = new Headers();

// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
// headers.append('Access-Control-Allow-Origin', 'http://localhost:5500');
// headers.append('Access-Control-Allow-Credentials', 'true');

// const proxyURL = "https://cors-anywhere.herokuapp.com/";   //Not needed
const requestURL = "http://flip2.engr.oregonstate.edu:3892/payments";
fetch("http://localhost:3892/payments").then((res) => {
  res.text().then((data) => {
    let paymentData = JSON.parse(data);
    if (paymentData.length > 0) {
      let temp = "";
      paymentData.forEach((payment) => {
        temp += "<tr>";
        temp += `<th scope=\"row\">${payment.paymentID}</th>`;
        temp += "<td>" + payment.customerID + "</td>";
        temp += "<td>" + payment.cardNumber + "</td>";
        temp += "<td>" + payment.bank + "</td>";
        temp += "<td>" + payment.ccv + "</td>";
        temp += "<td>" + payment.expirationDate + "</td></tr>";
      });
      document.getElementById("data").innerHTML = temp;
    }
  });
});

