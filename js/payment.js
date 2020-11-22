fetch("https://database-api-2.herokuapp.com/payments").then((res) => {
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

