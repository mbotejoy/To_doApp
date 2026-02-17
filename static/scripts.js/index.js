document.addEventListener("DOMContentLoaded", function () {


    const createPageBtn = document.getElementById("createPageBtn");
    const challengesBtn = document.getElementById("templatePageBtn");
    const previousPageBtn = document.getElementById("previousPageBtn");
    const challengesModal = document.getElementById("challengesModal");
    const closeChallenges = document.getElementById("closeChallenges");
    const logoutBtn = document.getElementById("logoutBtn");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");


    // check login state
    const loggedInUser = localStorage.getItem("username");

    const userWelcome = document.getElementById("userWelcome");
    if (loggedInUser) {
        // user is logged in → hide login & signup
        if (loginBtn) loginBtn.style.display = "none";
        if (signupBtn) signupBtn.style.display = "none";
        // show logout button
        if (logoutBtn) logoutBtn.style.display = "inline-block";
        // show welcome message
        if (userWelcome) {
            userWelcome.textContent = `Welcome, ${loggedInUser}!`;
            userWelcome.style.display = "inline-block";
        }
    } else {
        // user not logged in → show login & signup
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (signupBtn) signupBtn.style.display = "inline-block";
        // hide logout
        if (logoutBtn) logoutBtn.style.display = "none";
        // hide welcome message
        if (userWelcome) userWelcome.style.display = "none";
    }
    
        if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("username");
            window.location.href = "index.html";
        });
    }

    // Remove forced redirect to login for index.html
    // Only restrict access to previous lists and list creation in their respective pages/scripts

    // Hide Previous Lists button if not logged in
    if (!localStorage.getItem("username")) {
        previousPageBtn.style.display = "none";
    } else {
        previousPageBtn.style.display = "";
    }

    if (logoutBtn) {
        logoutBtn.style.display = localStorage.getItem("username") ? "" : "none";
    }

    createPageBtn.addEventListener("click", function () {
        window.location.href = "create.html";
    });
    
    // Show Challenges Modal
    challengesBtn.addEventListener("click", function () {
        challengesModal.classList.remove("hidden");
    });

    closeChallenges.addEventListener("click", function () {
        challengesModal.classList.add("hidden");
    });

    // Optional: close modal when clicking outside content
    window.addEventListener("click", function(event) {
        if (event.target === challengesModal) {
            challengesModal.classList.add("hidden");
        }
    });
    // Navigate to Previous Lists page
    previousPageBtn.addEventListener("click", function () {
        window.location.href = "previous.html";
    });

    //Registering a service worker for offline capabilities and caching
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    }  
    
    if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("username");
        window.location.href = "login.html";
    });
    }

});
