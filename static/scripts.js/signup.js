// Handles user signup and stores credentials in IndexedDB for offline login
document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");   
    const cancelBtn = document.getElementById("cancelBtn");
    

    signupForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (!name || !email || !username || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        // Check if user exists
        const existing = await window.todoDB.getUser(username);
        if (existing) {
            alert("Username already exists. Please choose another.");
            return;
        }
        // Store user in IndexedDB
        await window.todoDB.addUser({ username, password, name, email });
        localStorage.setItem("username", username); // for session
        alert("Signup successful! You can now log in.");
        window.location.href = "login.html";
    });
    
    document.getElementById("cancelBtn").addEventListener("click", function() {
        // Check if all fields are empty
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        if (!name && !email && !username && !password && !confirmPassword) {
            window.location.href = "index.html";
        } else {
            //do nothing and let user decide if they want to navigate away or not
            if (confirm("You have unsaved changes. Do you want to leave this page?")) {
                window.location.href = "index.html";
            }
        }
    });
});