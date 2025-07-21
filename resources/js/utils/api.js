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
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    $.ajax({
        url: url,
        method: method,
        dataType: "json",
        data: data,
        headers,
        success: success,
        error:
            error ||
            function (xhr, status, err) {
                console.error("Lỗi API:", err);
            },
    });
}

export const API_BASE_URL = "https://b-bloging.onrender.com/api";