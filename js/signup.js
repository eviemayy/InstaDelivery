//-----------------CUSTOMERS------------------------------
const requestURL = "http://flip2.engr.oregonstate.edu:3892/customers";
fetch("http://localhost:3892/customers").then((res) => {
  res.text().then((data) => {
    let customerData = JSON.parse(data);
    if (customerData.length > 0) {
      let temp = "";
      customerData.forEach((customer) => {
        temp += "<tr>";
        temp += `<th scope=\"row\">${customer.customerID}</th>`;
        temp += "<td>" + customer.firstName + "</td>";
        temp += "<td>" + customer.lastName + "</td>";
        temp += "<td>" + customer.email + "</td>";
        temp += "<td>" + customer.password + "</td>";
        temp += "<td>" + customer.address + "</td></tr>";
      });
      document.getElementById("customer-data").innerHTML = temp;
    }
  });
});


//-----------------DELIVERERS------------------------------
const requestURL2 = "http://flip2.engr.oregonstate.edu:3892/deliverers";
fetch("http://localhost:3892/deliverers").then((res) => {
  res.text().then((data) => {
    let delivererData = JSON.parse(data);
    if (delivererData.length > 0) {
      let temp = "";
      delivererData.forEach((deliverer) => {
        temp += "<tr>";
        temp += `<th scope=\"row\">${deliverer.delivererID}</th>`;
        temp += "<td>" + deliverer.firstName + "</td>";
        temp += "<td>" + deliverer.lastName + "</td></tr>";
      });
      document.getElementById("deliverer-data").innerHTML = temp;
    }
  });
});

