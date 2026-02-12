document.addEventListener("DOMContentLoaded", function() {

    const addItemBtn = document.getElementById("addItemBtn");
    const listItemInput = document.getElementById("listItemInput");
    const listItems = document.getElementById("listItems");
    const createListForm = document.getElementById("createListForm");
    const saveListBtn = document.getElementById("saveListBtn");

    const itemsArray = []; // store items

    // Enable Save button if at least one item exists
    function updateSaveBtn() {
        saveListBtn.disabled = itemsArray.length === 0;
    }

    // Add item
    addItemBtn.addEventListener("click", function() {
        const itemText = listItemInput.value.trim();
        if (itemText === "") {
            alert("Please enter an item.");
            return;
        }

        const li = document.createElement("li");
        li.textContent = itemText;

        // Optional: allow deleting items before saving
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", function() {
            const index = Array.from(listItems.children).indexOf(li);
            itemsArray.splice(index, 1); // remove from array
            li.remove();
            updateSaveBtn();
        });

        li.appendChild(deleteBtn);
        listItems.appendChild(li);

        itemsArray.push(itemText);
        listItemInput.value = "";
        updateSaveBtn();
    });

    // Save list
    createListForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const listName = document.getElementById("listName").value.trim();
        const listDate = document.getElementById("listDate").value;

        if (listName === "" || listDate === "" || itemsArray.length === 0) {
            alert("Please fill in all fields and add at least one item.");
            return;
        }

        const listData = {
            id: Date.now(),
            name: listName,
            date: listDate,
            items: itemsArray
        };

        // Load existing lists
        let allLists = JSON.parse(localStorage.getItem("allLists")) || [];
        allLists.push(listData);
        localStorage.setItem("allLists", JSON.stringify(allLists));

        alert("List saved successfully!");
        window.location.href = "list.html?id=" + listData.id;
    });

});
