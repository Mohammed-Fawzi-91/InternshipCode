
async function fetchData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('cant find the data');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('somthing went wrong withe  JSON data: ', error);
    }
}

fetchData();