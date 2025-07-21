document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (token) {
        console.log("Has token");
        document.getElementById("link-sign-in")?.classList.add("hidden");
        document.getElementById("link-sign-up")?.classList.add("hidden");
        document.getElementById("link-log-out")?.classList.remove("hidden");
    } else {
        console.log("Don't have token");
        document.getElementById("link-sign-in")?.classList.remove("hidden");
        document.getElementById("link-sign-up")?.classList.remove("hidden");
        document.getElementById("link-log-out")?.classList.add("hidden");
    }
});
