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
        temp += "<td>" + payment.expirationDate + "</td>";
        temp += `<td><button class=\"payment-deleting btn btn-danger\" onclick=\"deletePayment(${payment.paymentID})\">Delete</button></td>`;
        temp += `<td><button class=\"payment-updating btn btn-primary\" onclick=\"editPayment(${payment.paymentID})\">Edit</button></td></tr>`;
      });
      document.getElementById("data").innerHTML = temp;
    }
  });
});

function updatePayment(){

  if(document.getElementById("payment-id").value == ""){
    alert("Payment ID Needed!")
    return;
  }

  let data = {
    paymentID: document.getElementById("payment-id").value,
    customerID: document.getElementById("holder-id").value,
    cardNumber: document.getElementById("card-number").value,
    bank: document.getElementById("card-bank").value,
    ccv: document.getElementById("sec-code").value,
    expirationDate: new Date(document.getElementById("exp-date").value)
  }

  fetch("https://database-api-2.herokuapp.com/payments", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
    response.status     //=> number 100–599
    response.statusText //=> String
    response.headers    //=> Headers
    response.url        //=> String

    location.reload();
    return response.text()
  }, function(error) {
    console.log(error);
  })
}

function editPayment(id) {
  

  console.log("Update", id);

  let table = document.getElementById("payment-table");
  for (var i = 1, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 0, col; (col = row.cells[j]); j++) {
      let currentRow = row;
      
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      if (col.innerHTML == id) {
        console.log(currentRow);
        console.log("Security Code", currentRow.cells[4].innerHTML);
        console.log("Checking", col.innerHTML);
        
        document.getElementById('sec-code').value = row.cells[4].innerHTML;
        document.getElementById('card-number').value = row.cells[2].innerHTML;
        document.getElementById('exp-date').value = row.cells[5].innerHTML;
        document.getElementById('holder-id').value = row.cells[1].innerHTML;
        document.getElementById('card-bank').value = row.cells[3].innerHTML;
        let paymentID = document.getElementById('payment-id');
        paymentID.setAttribute("style", "display:inline");
        paymentID.setAttribute("readonly", "readonly");
        paymentID.value = id;
      }
    }
  }
}

function deletePayment(id) {
  console.log("Delete", id);

  fetch("https://database-api-2.herokuapp.com/payments", {
    method: "DELETE",
    body: JSON.stringify({ paymentID: id }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(
    function (response) {
      response.status; //=> number 100–599
      response.statusText; //=> String
      response.headers; //=> Headers
      response.url; //=> String

      location.reload();
      return response.text();
    },
    function (error) {
      console.log(error);
    }
  );
}

const myForm = document.getElementById("form-payment");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let data = {
    customerID: document.getElementById("holder-id").value,
    cardNumber: document.getElementById("card-number").value,
    bank: document.getElementById("card-bank").value,
    ccv: document.getElementById("sec-code").value,
    expirationDate: new Date(document.getElementById("exp-date").value),
  };

  console.log(data);

  fetch("https://database-api-2.herokuapp.com/payments", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(
    function (response) {
      response.status; //=> number 100–599
      response.statusText; //=> String
      response.headers; //=> Headers
      response.url; //=> String

      return response.text();
    },
    function (error) {
      console.log(error);
    }
  );
});
