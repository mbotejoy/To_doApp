document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.querySelector("#previousListsTable tbody");
    if (!localStorage.getItem("username")) {
        window.location.href = "login.html";
    }
    const loggedInUser = localStorage.getItem("username");
    const allLists = JSON.parse(localStorage.getItem("allLists")) || [];
    // Show only lists created by the current user
    const userLists = allLists.filter(list => {
        // If username property exists, match it
        if (typeof list.username !== "undefined") {
            return list.username === loggedInUser;
        }
        // If no username property, fallback: show only if current user created it
        // (optional: if you want to hide all lists without username, return false)
        return false;
    });
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
        deleteBtn.addEventListener("click", function() {
            if (confirm("Delete this list?")) {
                const updatedLists = allLists.filter(l => l.id !== list.id);
                localStorage.setItem("allLists", JSON.stringify(updatedLists));
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
