document.addEventListener("DOMContentLoaded", function () {


    const createPageBtn = document.getElementById("createPageBtn");
    const challengesBtn = document.getElementById("templatePageBtn");
    const previousPageBtn = document.getElementById("previousPageBtn");
    const challengesModal = document.getElementById("challengesModal");
    const closeChallenges = document.getElementById("closeChallenges");

    // Hide Previous Lists button if not logged in
    if (!localStorage.getItem("username")) {
        previousPageBtn.style.display = "none";
    } else {
        previousPageBtn.style.display = "";
    }

    createPageBtn.addEventListener("click", function () {
        window.location.href = "create.html";
    });

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

    previousPageBtn.addEventListener("click", function () {
        window.location.href = "previous.html";
    });

});
