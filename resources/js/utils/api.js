import $ from "jquery";

export function apiRequest({
    url,
    method = "GET",
    data = null,
    success,
    error,
}) {
    const token = localStorage.getItem("token");

    const headers = {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const options = {
        url,
        method,
        dataType: "json",
        headers,
        success,
        error:
            error ||
            function (xhr, status, err) {
                console.error("Lỗi API:", err);
            },
    };

    // Nếu là POST/PUT thì cần gửi body JSON
    if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
        options.contentType = "application/json";
        options.data = JSON.stringify(data);
    } else {
        options.data = data; // GET, DELETE
    }

    $.ajax(options);
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
