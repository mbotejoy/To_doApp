document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm"); 

    loginForm.addEventListener("submit", function(e) {
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
        window.location.href = "index.html";
     });

});

       
