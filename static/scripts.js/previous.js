// Handles displaying and managing previous to-do lists for the logged-in user (offline-capable with IndexedDB)
document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.querySelector("#previousListsTable tbody");
    if (!localStorage.getItem("username")) {
        window.location.href = "login.html";
    }
    const loggedInUser = localStorage.getItem("username");
    window.todoDB.getLists(loggedInUser).then(userLists => {
        if (userLists.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">No lists created yet.</td>
                </tr>`;
            return;
        }
        userLists.forEach(list => {
            const tr = document.createElement("tr");
            const nameTd = document.createElement("td");
            nameTd.textContent = list.name;
            const dateTd = document.createElement("td");
            dateTd.textContent = list.date;
            const actionsTd = document.createElement("td");
            const viewBtn = document.createElement("button");
            viewBtn.textContent = "View";
            viewBtn.addEventListener("click", function() {
                window.location.href = "list.html?id=" + list.id;
            });
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.marginLeft = "5px";
            deleteBtn.addEventListener("click", async function() {
                if (confirm("Delete this list?")) {
                    // Remove from IndexedDB
                    list.deleted = true;
                    await window.todoDB.updateList(list);
                    tr.remove();
                }
            });
            actionsTd.appendChild(viewBtn);
            actionsTd.appendChild(deleteBtn);
            tr.appendChild(nameTd);
            tr.appendChild(dateTd);
            tr.appendChild(actionsTd);
            tableBody.appendChild(tr);
        });
    });
});
