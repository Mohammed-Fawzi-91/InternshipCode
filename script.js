
    
let data;
let jasonFile = "data.json";
// fetch the data and return error if not found 
async function fetchData() {
try {
    const response = await fetch(jasonFile);
    if (!response.ok) {
    throw new Error("Cannot find the data");
    }
    data = await response.json();
    return data;
} catch (error) {
    console.error("Something went wrong with the JSON data: ", error);
}
}
// desplay the jason file after we fectched.
async function displayJSONData() {
try {
    const theData = await fetchData();
    const showData = document.getElementById("dataContainer");

    theData.mvPurchaseOrders.forEach((order) => {
    const orderDiv = document.createElement("div");

    // Display the order information Type and orderNo
    const orderInfo = document.createElement("a");
    orderInfo.textContent = `Order Type: ${order.PurchaseOrderTypeAbbreviation}, Order No: ${order.PurchaseOrderNo}`;
    orderDiv.appendChild(orderInfo);

    // Create additional information 
    const orderDetailsParagraph = document.createElement("p");
    orderDetailsParagraph.className = "paragraph";

    orderDetailsParagraph.innerHTML = `Address: ${order.PurchaseOrderAddress}<br>Contact Person: ${order.PurchaseOrderContactPerson}<br>Status: ${order.PurchaseOrderStatus}<br>`;
    
    orderDiv.appendChild(orderDetailsParagraph);

    // Create table for order details
    const orderDetailsTable = document.createElement("table");
    const tableHeader = orderDetailsTable.createTHead();
    const headerRow = tableHeader.insertRow();
    const headers = [" SKU", "Quantity", "Unit Price", "Total Amount"];
    headers.forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    const tableBody = orderDetailsTable.createTBody();
    order.PurchaseOrderDetails.forEach((detail) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell();
        cell1.textContent = detail.PurchaseOrderRowProductSKU;
        const cell2 = row.insertCell();
        cell2.textContent = detail.PurchaseOrderRowQuantity;
        const cell3 = row.insertCell();
        cell3.textContent =
        detail.PurchaseOrderRowUnitPriceWithoutTaxOrDiscount;
        const cell4 = row.insertCell();
        cell4.textContent = detail.PurchaseOrderRowTotalAmount; 
    });
    orderDiv.appendChild(orderDetailsTable);

    // display on click
    orderInfo.addEventListener("click", () => {
        orderDetailsParagraph.classList.toggle("hide");
        orderDetailsTable.classList.toggle("hide");
    });

    showData.appendChild(orderDiv);
    });

    console.log(theData);
} catch (error) {
    const showData = document.getElementById("dataContainer");
    showData.textContent= "Error displaying JSON data"
    console.error("Error displaying JSON data:", error);
}
}

displayJSONData();
      
            