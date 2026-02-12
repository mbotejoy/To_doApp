document.addEventListener("DOMContentLoaded", function() {

    const listTitle = document.getElementById("listTitle");
    const listDate = document.getElementById("listDate");
    const listItems = document.getElementById("listItems");
    const deleteListBtn = document.getElementById("deleteListBtn");
    const newItemInput = document.getElementById("newTaskInput");
    const addItemBtn = document.getElementById("addItemBtn");

    // Get list id from URL
    const urlParams = new URLSearchParams(window.location.search);
    const listId = urlParams.get("id");

    const allLists = JSON.parse(localStorage.getItem("allLists")) || [];
    const listData = allLists.find(list => list.id == listId);

    if (!listData) {
        alert("No list found!");
        window.location.href = "create.html";
        return;
    }

    listTitle.textContent = listData.name;
    listDate.textContent = `Date: ${listData.date}`;

    // Render existing items
    listData.items.forEach(itemText => {
        addItemToPage(itemText);
    });

    function addItemToPage(text) {

        const li = document.createElement("li");
        li.classList.add("task-item");
        li.setAttribute("tabindex", "0");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");

        // Text
        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("task-text");

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("btn", "edit-btn");

        editBtn.addEventListener("click", function() {
            const newText = prompt("Edit item:", span.textContent);
            if (newText !== null && newText.trim() !== "") {
                span.textContent = newText;
                updateStorage();
            }
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn", "delete-btn");

        deleteBtn.addEventListener("click", function() {
            if (confirm("Delete this item?")) {
                li.remove();
                updateStorage();
            }
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        listItems.appendChild(li);
    }

    // Add new item
    addItemBtn.addEventListener("click", function () {

        const newItemText = newItemInput.value.trim();

        if (newItemText === "") {
            alert("Please enter an item.");
            return;
        }

        addItemToPage(newItemText);
        listData.items.push(newItemText);

        const index = allLists.findIndex(l => l.id == listId);
        allLists[index] = listData;

        localStorage.setItem("allLists", JSON.stringify(allLists));

        newItemInput.value = "";
    });

    // Update localStorage
    function updateStorage() {

        const updatedItems = [];

        listItems.querySelectorAll("li").forEach(li => {
            const text = li.querySelector(".task-text").textContent;
            updatedItems.push(text);
        });

        listData.items = updatedItems;

        const index = allLists.findIndex(l => l.id == listId);
        allLists[index] = listData;

        localStorage.setItem("allLists", JSON.stringify(allLists));
    }

    // Delete entire list
    deleteListBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete the entire list?")) {
            const updatedLists = allLists.filter(list => list.id != listId);
            localStorage.setItem("allLists", JSON.stringify(updatedLists));
            window.location.href = "index.html";
        }
    });

    // View previous lists button
    const previousBtn = document.createElement("button");
    previousBtn.textContent = "View Previous Lists";
    previousBtn.classList.add("btn", "previous-btn");

    previousBtn.addEventListener("click", function() {
        window.location.href = "previous.html";
    });

    document.querySelector(".list-container").appendChild(previousBtn);

});
