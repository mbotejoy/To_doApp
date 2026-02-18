// Handles user login and checks credentials from IndexedDB for offline authentication
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm"); 

    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
        const user = await window.todoDB.getUser(username);
        if (!user || user.password !== password) {
            alert("Invalid username or password.");
            return;
        }
        localStorage.setItem("username", username); // for session
        window.location.href = "index.html";
    });

     document.getElementById("cancelBtn").addEventListener("click", function() {
        window.location.href = "index.html";
     });

});

       
