//-----------------ORDERS------------------------------
fetch("https://database-api-2.herokuapp.com/orders").then((res) => {
  res.text().then((data) => {
    let orderData = JSON.parse(data);
    console.log(orderData);
    if (orderData.length > 0) {
      let temp = "";
      orderData.forEach((order) => {
        let random = Math.floor(Math.random() * 10000000);
        temp += '<div class="card" style="margin-top: 20px;">';
        temp += `<h5 class="card-header">Order ${order.orderID}</h5>`;
        temp += `<div class="card-body">`;
        temp += `<p><b>Customer ID:</b> ${order.customerID}</p>`;
        temp += `<p><b>Deliverer ID:</b> ${order.delivererID}</p>`;
        temp += `<p><b>Date Ordered:</b> ${order.dateOrdered.substring(0,10)}</p>`;
        temp += `<p><b>Delivery Status:</b> ${order.deliveryStatus}</p>`;
        temp += `<p><b>Departure Time:</b> ${order.departureTime}</p>`;
        temp += `<p><b>Arrival Time:</b> ${order.arrivalTime}</p>`;
        temp += `<button class="btn btn-primary" onclick=\"editOrder(${order.orderID}, ${random})\" style="margin: 5px;">Edit Order</button>`;
        temp += `<button class="btn btn-danger" onclick="deleteOrder(\'${order.orderID}\')">Delete</button>`;
        temp += `<span style="display:none;">Order ID: </span><input type="number" id="order-id" name="order-id" placeholder="Order ID" style="display:none;">`;
        // temp += `<span style="display:none;">Customer ID: </span><input type="number" id="customer-ids" name="customer-ids" placeholder="Customer ID" style="display:none;">`;
        temp += `<span style="display:none;"> Customer ID: </span><select id="cust_id_options_${random}" name="cust-id-2" style="display:none;"></select>`;
        // temp += `<span style="display:none;">Deliverer ID: </span><input type="number" id="deliverer-ids" name="deliverer-ids" placeholder="Deliverer ID" style="display:none;">`;
        temp += `<span style="display:none;"> Deliverer ID: </span><select id="del_id_options_${random}" name="del-id-2" style="display:none;"></select>`;
        temp += `<span style="display:none;"> Date Ordered: </span><input type="date" id="order-date" name="order-date" placeholder="Date Ordered" style="display:none;">`;
        temp += `<span style="display:none;"> Delivery Status: </span><input type="text" id="delivery-status" name="status" placeholder="Delivery Status" style="display:none;">`;
        temp += `<span style="display:none;"> Departure Time: </span><input type="time" id="depart-time" name="depart-time" placeholder="Departure Time" style="display:none;">`;
        temp += `<span style="display:none;"> Arrival Time: </span><input type="time" id="arrive-time" name="arrive-time" placeholder="Arrival Time" style="display:none;"><br style="display:none;">`;
        temp += `<button class="btn btn-primary" style="margin: 5px; display:none;">Update</button></div></div>`;
      });
      document.getElementById("all-orders").innerHTML = temp;
    }
  });
});

//-----------------DELIVERERS------------------------------
fetch("https://database-api-2.herokuapp.com/deliverers").then((res) => {
  res.text().then((data) => {
    let delivererData = JSON.parse(data);
    if (delivererData.length > 0) {
      let temp = "";
      delivererData.forEach((deliverer) => {
        temp += "<tr>";
        temp += `<th scope=\"row\">${deliverer.delivererID}</th>`;
        temp += "<td>" + deliverer.firstName + "</td>";
        temp += "<td>" + deliverer.lastName + "</td>";
        temp += `<td><button href="#" class="btn btn-primary" style="margin: 5px;" onclick=\"editDeliverer(${deliverer.delivererID})\">Edit</button></td>`;
        temp += `<td><button class="btn btn-danger" onclick="deleteDeliverer(\'${deliverer.delivererID}\')" style="margin: 5px;">Delete</button></td></tr>`;
      });
      document.getElementById("deliverer-data").innerHTML = temp;
    }
  });
});

//----------------- POST REQ DELIVERERS------------------------------

const myForm = document.getElementById('my-form-assign');
myForm.addEventListener('submit', function (e) {

  if (document.getElementById("deliverer-id").value !== ""){
    alert("Cannot Add Deliverer that already exists")
    return;
  }

  e.preventDefault();

  let data = {
    firstName: document.getElementById('fname').value,
    lastName: document.getElementById('lname').value
  }

  console.log(data);

  fetch("https://database-api-2.herokuapp.com/deliverers", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    response.status
    response.statusText
    response.headers
    response.url

    location.reload();
    return response.text()
  }, function (error) {
    console.log(error);
  })
});


//----------------- DELETE DELIVERER ------------------------------

function deleteDeliverer(id) {

  console.log(id);

  fetch("https://database-api-2.herokuapp.com/deliverers", {
    method: "DELETE",
    body: JSON.stringify({ delivererID: id }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    response.status
    response.statusText
    response.headers
    response.url

    location.reload();
    return response.text()
  }, function (error) {
    console.log(error);
  });
}

//----------------- DELETE ORDER ------------------------------

function deleteOrder(id) {
  console.log("Delete", id);

  fetch("https://database-api-2.herokuapp.com/orders", {
    method: "DELETE",
    body: JSON.stringify({ orderID: id }),
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
}


//----------------UPDATE DELIVERERS----------------------
function updateDeliverer(){
  if(document.getElementById("deliverer-id").value == ""){
    alert("Deliverer ID Needed! Press an \"Edit\" button to populate fields.")
    return;
  }

  let data = {
    delivererID: document.getElementById("deliverer-id").value,
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value
  }

  fetch("https://database-api-2.herokuapp.com/deliverers", {
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

function editDeliverer(id){

  console.log("Update", id);

  let table = document.getElementById("deliverer-table");
  for (var i = 1, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 0, col; (col = row.cells[j]); j++) {
      let currentRow = row;
      
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
      if (col.innerHTML == id) {
        console.log(currentRow);
        console.log("Checking", col.innerHTML);
        
        document.getElementById('lname').value = row.cells[2].innerHTML;
        document.getElementById('fname').value = row.cells[1].innerHTML;
        let delivererID = document.getElementById('deliverer-id');
        delivererID.setAttribute("style", "display:inline");
        delivererID.setAttribute("readonly", "readonly");
        delivererID.setAttribute("style", "color:#A52A2A;");
        delivererID.value = id;
      }
    }
  }
}



//-----------UPDATE ORDERS---------------------
function editOrder(orderID, random){

  //------------For Customer ID Dropdown---------------

  fetch("https://database-api-2.herokuapp.com/customers").then((res) => {
    res.text().then((data) => {
        let customers = JSON.parse(data);
        if (customers.length > 0) {
            let temp = "";
            customers.forEach((customer) => {
                temp += "<option id=\"cust\" value=" + customer.customerID + ">" + customer.customerID + "</option>";
            });
            document.getElementById(`cust_id_options_${random}`).innerHTML = temp;
        }
    });
});
  //-----------------------------------------------------


  //------------For Deliverer ID Dropdown---------------

  fetch("https://database-api-2.herokuapp.com/deliverers").then((res) => {
    res.text().then((data) => {
        let deliverers = JSON.parse(data);
        if (deliverers.length > 0) {
            let temp = "";
            deliverers.forEach((deliverer) => {
                temp += "<option id=\"del\" value=" + deliverer.delivererID + ">" + deliverer.delivererID + "</option>";
            });
            temp += "<option id=\"del\"  value=\"NULL\" >NULL</option>";
            document.getElementById(`del_id_options_${random}`).innerHTML = temp;
          }
      });
  });
  //-----------------------------------------------------

  let cards = document.getElementsByClassName(`card-body`);
  for (var i = 0; i < cards.length; i++) {
    console.log("Checking: ", cards[i].childNodes);
    console.log("Parent: ", cards[i].parentElement.childNodes[0].innerHTML.split(" "));
    let textOrderID = cards[i].parentElement.childNodes[0].innerHTML.split(" ");
    let cardOrderID = textOrderID[textOrderID.length - 1];
    let textCustomerID = cards[i].childNodes[0].innerHTML.split(" ");
    let cardCustomerID = textCustomerID[textCustomerID.length - 1];
    let textDelivererID = cards[i].childNodes[1].innerHTML.split(" ");
    let cardDelivererID = textDelivererID[textDelivererID.length - 1];
    let textDateOrdered = cards[i].childNodes[2].innerHTML.split(" ");
    let cardDateOrdered = textDateOrdered[textDateOrdered.length - 1].substring(0,10);
    let textDeliveryStatus = cards[i].childNodes[3].innerHTML.split(" ");
    let cardDeliveryStatus = textDeliveryStatus[textDeliveryStatus.length - 1];
    let textDepartTime = cards[i].childNodes[4].innerHTML.split(" ");
    let cardDepartTime = textDepartTime[textDepartTime.length - 1];
    let textArriveTime = cards[i].childNodes[5].innerHTML.split(" ");
    let cardArriveTime = textArriveTime[textArriveTime.length - 1];

    //Hide the text
    if (cardOrderID == orderID) {
      cards[i].childNodes[0].setAttribute("style", "display:none;");
      cards[i].childNodes[1].setAttribute("style", "display:none;");
      cards[i].childNodes[2].setAttribute("style", "display:none;");
      cards[i].childNodes[3].setAttribute("style", "display:none;");
      cards[i].childNodes[4].setAttribute("style", "display:none;");
      cards[i].childNodes[5].setAttribute("style", "display:none;");
      cards[i].childNodes[6].setAttribute("style", "display:none;");//Edit button
      cards[i].childNodes[7].setAttribute("style", "display:none;");//button
      cards[i].childNodes[8].setAttribute("style", "display:inline;"); // start of span tags
      cards[i].childNodes[9].setAttribute("style", "display:block;"); 
      cards[i].childNodes[9].setAttribute("style", "color:#A52A2A;");
      cards[i].childNodes[10].setAttribute("style", "display:inline;");
      cards[i].childNodes[11].setAttribute("style", "display:inline-block;");
      let childCustomerID = cards[i].childNodes[11];
      setTimeout(function(){ childCustomerID.value = cardCustomerID; }, 300); // wait to put value in dropdown
      childCustomerID.disabled = true;
      cards[i].childNodes[12].setAttribute("style", "display:inline;");
      cards[i].childNodes[13].setAttribute("style", "display:inline-block;");
      let childDelivererID = cards[i].childNodes[13];
      setTimeout(function(){ childDelivererID.value = cardDelivererID; }, 300); // wait to put value in dropdown
      cards[i].childNodes[14].setAttribute("style", "display:inline;");
      cards[i].childNodes[15].setAttribute("style", "display:inline-block;");
      cards[i].childNodes[15].disabled = true;
      cards[i].childNodes[16].setAttribute("style", "display:inline;");
      cards[i].childNodes[17].setAttribute("style", "display:inline-block;");
      cards[i].childNodes[18].setAttribute("style", "display:inline;");
      cards[i].childNodes[19].setAttribute("style", "display:inline-block;");
      cards[i].childNodes[20].setAttribute("style", "display:inline;");
      cards[i].childNodes[21].setAttribute("style", "display:inline-block;");
      cards[i].childNodes[22].setAttribute("style", "display:inline-block;"); //br tag
      cards[i].childNodes[23].setAttribute("style", "display:inline;");//Update button
      // Changing values of inputs
      cards[i].childNodes[9].value = cardOrderID;
      cards[i].childNodes[9].setAttribute("readonly", "readonly");
      cards[i].childNodes[11].value = cardCustomerID; //not working
      cards[i].childNodes[13].value = cardDelivererID; //not working
      cards[i].childNodes[15].value = cardDateOrdered;
      cards[i].childNodes[17].value = cardDeliveryStatus;
      cards[i].childNodes[19].value = cardDepartTime;
      cards[i].childNodes[21].value = cardArriveTime;

      //For data population for PUT request
      let dataDelivererID = cards[i].childNodes[13];
      let dataDeliveryStatus = cards[i].childNodes[17];
      let dataDepartureTime = cards[i].childNodes[19];
      let dataArrivalTime = cards[i].childNodes[21];
      

      //Update button to actually update values
      cards[i].childNodes[23].addEventListener("click", function () {
        let data = {
          orderID: cardOrderID,
          // customerID: cards[i].childNodes[11].value,
          delivererID: dataDelivererID.value == "NULL" ? null : dataDelivererID.value,
          // dateOrdered: cards[i].childNodes[15].value,
          deliveryStatus: dataDeliveryStatus.value,
          departureTime:  dataDepartureTime.value,
          arrivalTime: dataArrivalTime.value
  
        }
        console.log("Testing:",data);
        fetch("https://database-api-2.herokuapp.com/orders", {
          method: "PUT",
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

            location.reload();
            return response.text();
          },
          function (error) {
            console.log(error);
          }
        );
      });
    }
  }
}