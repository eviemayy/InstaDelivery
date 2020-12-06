//-----------GET PAYMENTS-----------------------
let paymentCustomerIDs_array = []
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
        temp += "<td>" + payment.expirationDate.substring(0,10) + "</td>";
        temp += `<td><button class=\"payment-deleting btn btn-danger\" onclick=\"deletePayment(${payment.paymentID})\">Delete</button></td>`;
        temp += `<td><button class=\"payment-updating btn btn-primary\" onclick=\"editPayment(${payment.paymentID})\">Edit</button></td></tr>`;
        paymentCustomerIDs_array.push(payment.customerID);
      });
      document.getElementById("data").innerHTML = temp;
    }
  });
});

//---------GET CUSTOMER IDS FOR DROPDOWN-----------------
fetch("https://database-api-2.herokuapp.com/customers").then((res) => {
    res.text().then((data) => {
        let customers = JSON.parse(data);
        if (customers.length > 0) {
            let temp = "";
            customers.forEach((customer) => {
                temp += "<option id=\"cust\" value=" + customer.customerID + ">" + customer.lastName + "</option>";
            });
            document.getElementById("holder_id_options").innerHTML = temp;
        }
    });
});


//----------PUT REQUEST----------------------------
function updatePayment(){

  if(document.getElementById("payment-id").value == ""){
    alert("Payment ID Needed! Press an \"Edit\" button to populate fields.")
    return;
  }

  if(!paymentCustomerIDs_array.includes(Number(document.getElementById("holder_id_options").value))){
    alert("Customer does not have payment option. Try Again");
    return;
  }

  let data = {
    paymentID: document.getElementById("payment-id").value,
    customerID: document.getElementById("holder_id_options").value,
    cardNumber: document.getElementById("card-number").value,
    bank: document.getElementById("card-bank").value,
    ccv: document.getElementById("sec-code").value,
    expirationDate: new Date(document.getElementById("exp-date").value)
  }

  console.log("DATE: ",document.getElementById("exp-date").value);

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
  // To populate payment form for updating

  console.log("Update", id);

  let table = document.getElementById("payment-table");
  for (var i = 1, row; (row = table.rows[i]); i++) {
    //loop through rows
    for (var j = 0, col; (col = row.cells[j]); j++) {
      let currentRow = row;
      
      //loop through columns
      if (col.innerHTML == id) {
        console.log(currentRow);
        console.log("Security Code", currentRow.cells[4].innerHTML);
        console.log("Checking", col.innerHTML);
        
        document.getElementById('sec-code').value = row.cells[4].innerHTML;
        document.getElementById('card-number').value = row.cells[2].innerHTML;
        document.getElementById('exp-date').value = row.cells[5].innerHTML;
        // document.getElementById('holder-id').value = row.cells[1].innerHTML;
        document.getElementById('card-bank').value = row.cells[3].innerHTML;
        document.getElementById("holder_id_options").value = row.cells[1].innerHTML;
        let paymentID = document.getElementById('payment-id');
        paymentID.setAttribute("style", "display:inline");
        paymentID.setAttribute("readonly", "readonly");
        paymentID.style.color = "#A52A2A";
        paymentID.value = id;
      }
    }
  }
}

//-------------DELETE-------------------------------
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

//---------------POST-----------------
const myForm = document.getElementById("form-payment");
myForm.addEventListener("submit", function (e) {
  if (document.getElementById("payment-id").value !== ""){
    alert("Cannot Add Payment that already exists")
    return;
  }

  console.log("Dropdown: ", document.getElementById("holder_id_options").value);
  console.log("Customer IDs:", paymentCustomerIDs_array)

  if(paymentCustomerIDs_array.includes(Number(document.getElementById("holder_id_options").value))){
    alert("Customer already has payment option.");
    return;
  }

  e.preventDefault();

  let data = {
    customerID: document.getElementById("holder_id_options").value,
    cardNumber: document.getElementById("card-number").value,
    bank: document.getElementById("card-bank").value,
    ccv: document.getElementById("sec-code").value,
    expirationDate: new Date(document.getElementById("exp-date").value),
  };

  console.log(data);
  console.log("DATE: ",document.getElementById("exp-date").value);

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

      //location.reload();
      return response.text();
    },
    function (error) {
      console.log(error);
    }
  );
});
