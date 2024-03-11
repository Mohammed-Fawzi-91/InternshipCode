let data;
let jasonFile = 'data.json';

async function fetchData() {
    try {
        const response = await fetch(jasonFile);
        if (!response.ok) {
            throw new Error('Cannot find the data');
        }
        data = await response.json();
        return data;
    } catch (error) {
        console.error('Something went wrong with the JSON data: ', error);
    }
}

async function displayJSONData() {
    try {
        const theData = await fetchData();
        const showData = document.getElementById('data_id');

        theData.mvPurchaseOrders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('purchase-order');

          
            const orderInfo = document.createElement('p');
            orderInfo.textContent = `Purchase Order No: ${order.PurchaseOrderNo}, Status: ${order.PurchaseOrderStatus}`;
            orderDiv.appendChild(orderInfo);

         

            showData.appendChild(orderDiv);
        });

        console.log(theData);
    } catch (error) {
        console.error('Error displaying JSON data:', error);
    }
}

displayJSONData();
