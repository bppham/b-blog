import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showToast(message, type = "success", duration = 3000) {
    console.log("[TOAST]", message);
    const colors = {
        success: "#4ade80",
        error: "#f87171",
        info: "#60a5fa",
        warning: "#facc15",
    };

    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        backgroundColor: colors[type] || colors.info,
    }).showToast();
}
