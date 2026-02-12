document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");   
    const cancelBtn = document.getElementById("cancelBtn");
    

    signupForm.addEventListener("submit", function(e) {
    e.preventDefault();     
    const username = document.getElementById("username").value.trim();  
    if (username === "") {
        alert("Please enter a username.");
        return;
    }
    localStorage.setItem("username", username);
    window.location.href = "index.html";
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