import $ from "jquery";

$(document).ready(function() {
    const token = localStorage.getItem("token");
    if(!token) {
        document.getElementById("user-menu-button")?.classList.add("hidden");
        document.getElementById("user-dropdown")?.classList.add("hidden");
    }
});