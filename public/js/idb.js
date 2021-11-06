

// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'budget-tracker' and set it to version 1
const request = indexedDB.open('budget-tracker', 1);
request.onupgradeneeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) called 'new-transaction', set it to have an auto incrementing primary key (idea)
    db.createObjectStore('new-transaction', { autoIncrement: true });
};
// upon a successful
request.onsuccess = function(event) {
    // when db is successfully created with its object store ( from onupgradeneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadBudget() function to send all local db data to api
    if (navigator.onLine) {
        // uploadTransactions function to be created
        uploadTransactions()
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transaction(['new-transaction'], 'readwrite');
    const budgetTrackerObjectStore = transaction.objectStore('new-transaction');
    budgetTrackerObjectStore.add(record);
};

function uploadTransactions() {
    const transaction = db.transaction(['new-transaction'], 'readwrite');
    const budgetTrackerObjectStore = transaction.objectStore('new-transaction');
    const getAllTransactions = budgetTrackerObjectStore.getAll();
    getAllTransactions.onsuccess = function() {
        if (getAllTransactions.result.length>0) {
            fetch("./api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAllTransactions.results),
                headers: {
                    Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json" 
                }
            })
            .then (response => {
                return response.json();
            })
            .then (data=>{
                const transaction = db.transaction(['new-transaction'], 'readwrite');
                const budgetTrackerObjectStore = transaction.objectStore('new-transaction');
                budgetTrackerObjectStore.clear()
            })
        }
    }
}
window.addEventListener("online", uploadTransactions)