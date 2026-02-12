document.addEventListener("DOMContentLoaded", function () {

    const createPageBtn = document.getElementById("createPageBtn");
    const templatePageBtn = document.getElementById("templatePageBtn");
    const previousPageBtn = document.getElementById("previousPageBtn");

    createPageBtn.addEventListener("click", function () {
        window.location.href = "create.html";
    });

    templatePageBtn.addEventListener("click", function () {
        window.location.href = "templates.html";
    });

    previousPageBtn.addEventListener("click", function () {
        window.location.href = "previous.html";
    });

});
