import $ from "jquery";
import { showToast } from "./utils/toast";
import { apiRequest } from "./utils/api";

$(document).ready(function () {
    // Submit Đăng ký
    $("#registerForm").on("submit", function (e) {
        e.preventDefault();

        const payload = {
            name: $("#name").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            password_confirmation: $("#password_confirmation").val(),
        };

        apiRequest({
            url: "http://localhost:8000/api/register",
            method: "POST",
            data: payload,
            success: function (data) {
                if (data.success) {
                    window.location.href = "/auth/login";
                } else {
                    const msg =
                        data.errors || data.message || "Đăng ký thất bại!";
                    showToast(msg, "error");
                }
            },
            error: function (xhr) {
                handleErrorResponse(xhr, "Đăng ký thất bại!");
            },
        });
    });

    // Submit Đăng nhập
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const payload = {
            email: $("#email").val(),
            password: $("#password").val(),
        };

        apiRequest({
            url: "http://localhost:8000/api/login",
            method: "POST",
            data: payload,
            success: function (data) {
                if (data.success) {
                    localStorage.setItem("token", data.data.token);
                    window.location.href = "/home";
                } else {
                    const msg =
                        data.errors || data.message || "Đăng nhập thất bại!";
                    showToast(msg, "error");
                }
            },
            error: function (xhr) {
                handleErrorResponse(xhr, "Đăng nhập thất bại!");
            },
        });
    });

    $("#link-log-out a").on("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
    });

    function handleErrorResponse(xhr, fallbackMsg) {
        let message = fallbackMsg;
        try {
            const res = JSON.parse(xhr.responseText);
            message = res.errors || res.message || fallbackMsg;
        } catch (e) {
            console.error("Lỗi parse JSON:", e);
        }
        showToast(message, "error");
    }
});
