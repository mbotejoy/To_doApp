document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.querySelector("#previousListsTable tbody");

    // Load all lists
    const allLists = JSON.parse(localStorage.getItem("allLists")) || [];

    if (allLists.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">No lists created yet.</td>
            </tr>`;
        return;
    }

    allLists.forEach(list => {
        const tr = document.createElement("tr");

        // List Name
        const nameTd = document.createElement("td");
        nameTd.textContent = list.name;

        // Date
        const dateTd = document.createElement("td");
        dateTd.textContent = list.date;

        // Actions
        const actionsTd = document.createElement("td");

        // View button
        const viewBtn = document.createElement("button");
        viewBtn.textContent = "View";
        viewBtn.addEventListener("click", function() {
            window.location.href = "list.html?id=" + list.id;
        });

        // Delete button
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
