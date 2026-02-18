document.addEventListener("DOMContentLoaded", function() {

    const listTitle = document.getElementById("listTitle");
    const listDate = document.getElementById("listDate");
    const listItems = document.getElementById("listItems");
    const deleteListBtn = document.getElementById("deleteListBtn");
    const newItemInput = document.getElementById("newTaskInput");
    const addItemBtn = document.getElementById("addItemBtn");

    // Redirect to login if not authenticated
    //only logged in users can access lists
    if (!localStorage.getItem("username")) {
    window.location.href = "login.html";
    }

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


    // Render existing items (now objects with text and optional reminder)
    listData.items.forEach(itemObj => {
        addItemToPage(itemObj);
    });

    function addItemToPage(itemObj) {
        // itemObj: { text: string, reminder: string|null, completed: boolean }
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.setAttribute("tabindex", "0");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = itemObj.completed === true;

        // Text
        const span = document.createElement("span");
        span.textContent = itemObj.text;
        span.classList.add("task-text");
        // Cross out if completed
        if (itemObj.completed) {
            span.style.textDecoration = "line-through";
        }

        // Reminder display
        const reminderSpan = document.createElement("span");
        reminderSpan.classList.add("reminder-text");
        if (itemObj.reminder) {
            reminderSpan.textContent = ` (Remind: ${itemObj.reminder})`;
        }

        // Checkbox event for crossing out
        checkbox.addEventListener("change", function() {
            itemObj.completed = checkbox.checked;
            if (checkbox.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "none";
            }
            updateStorage();
        });

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("btn", "edit-btn");

        editBtn.addEventListener("click", function() {
            const newText = prompt("Edit item:", span.textContent);
            let newReminder = itemObj.reminder;
            if (newText !== null && newText.trim() !== "") {
                // Ask for reminder
                newReminder = prompt("Edit reminder (YYYY-MM-DD HH:MM) or leave blank:", newReminder || "");
                span.textContent = newText;
                itemObj.text = newText;
                if (newReminder && newReminder.trim() !== "") {
                    itemObj.reminder = newReminder.trim();
                    reminderSpan.textContent = ` (Remind: ${itemObj.reminder})`;
                } else {
                    itemObj.reminder = null;
                    reminderSpan.textContent = "";
                }
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
        li.appendChild(reminderSpan);
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
        // Ask for reminder
        const reminder = prompt("Set reminder (YYYY-MM-DD HH:MM) or leave blank:");
        const itemObj = {
            text: newItemText,
            reminder: (reminder && reminder.trim() !== "") ? reminder.trim() : null
        };
        addItemToPage(itemObj);
        checkbox.checked = itemObj.completed === true;

        checkbox.addEventListener("change", function() {
            itemObj.completed = checkbox.checked;
            if (checkbox.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "none";
            }
            updateStorage();
        });
            if (itemObj.completed) {
            span.style.textDecoration = "line-through";
            }

        listData.items.push(itemObj);
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
            const reminderSpan = li.querySelector(".reminder-text");
            let reminder = null;
            if (reminderSpan && reminderSpan.textContent) {
                const match = reminderSpan.textContent.match(/Remind: (.*)\)/);
                if (match) reminder = match[1];
            }
            const checkbox = li.querySelector("input[type='checkbox']");
            const completed = checkbox ? checkbox.checked : false;
            updatedItems.push({ text, reminder, completed });
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

    if ("Notification" in window) {
    Notification.requestPermission();
    }

    function checkReminders() {
    const now = new Date();
    const nowString = now.toISOString().slice(0,16).replace("T"," ");

    listData.items.forEach(item => {
        if (item.reminder && item.reminder === nowString && !item.completed) {
            new Notification("Reminder", {
                body: item.text,
                icon: "/static/Icons/icon-192.png"
            });
        }
    });
    }

// check every minute
setInterval(checkReminders, 60000);

});

