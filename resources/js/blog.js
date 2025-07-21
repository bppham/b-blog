import $ from "jquery";
import { showToast } from "./utils/toast";
import { apiRequest } from "./utils/api";
import "ckeditor4";

document.addEventListener("DOMContentLoaded", function () {
    CKEDITOR.replace("editor");
});

$(document).ready(function () {
    const token = localStorage.getItem("token");

    // Handle Create Blog
    $("#createBlogForm").on("submit", function (e) {
        e.preventDefault();

        const $submitButton = $(this).find('button[type="submit"]');
        $submitButton.prop("disabled", true).text("Loading...");

        const title = $("#title").val();
        const description = $("#description").val();
        const content = CKEDITOR.instances.editor.getData();

        apiRequest({
            url: "http://localhost:8000/api/blogs",
            method: "POST",
            data: { title, description, content },
            success: function (data) {
                if (data.success) {
                    showToast("Tạo blog thành công!", "success");
                    setTimeout(() => (window.location.href = "/home"), 1000);
                } else {
                    showToast(data.message || "Tạo blog thất bại!", "error");
                    $submitButton.prop("disabled", false).text("Create Blog");
                }
            },
            error: function (xhr) {
                const errorMsg =
                    xhr.responseJSON?.message ||
                    "Không kết nối được tới máy chủ!";
                showToast(errorMsg, "error");
                $submitButton.prop("disabled", false).text("Create Blog");
            },
        });
    });

    // Handle Update Blog
    if ($("#updateBlogForm").length) {
        const params = new URLSearchParams(window.location.search);
        const blogId = params.get("id");

        if (!blogId) {
            showToast("Thiếu ID blog để cập nhật!", "error");
            return;
        }

        // Load blog data
        apiRequest({
            url: `http://localhost:8000/api/blogs/${blogId}`,
            method: "GET",
            success: function (res) {
                if (res.success) {
                    const blog = res.data;
                    $("#title").val(blog.title);
                    $("#description").val(blog.description);
                    CKEDITOR.instances.editor.setData(blog.content);
                } else {
                    showToast("Không tìm thấy blog!", "error");
                }
            },
            error: function () {
                showToast("Lỗi khi lấy blog!", "error");
            },
        });

        // Handle form submit
        $("#updateBlogForm").on("submit", function (e) {
            e.preventDefault();

            const $submitButton = $(this).find('button[type="submit"]');
            $submitButton.prop("disabled", true).text("Loading...");

            const title = $("#title").val();
            const description = $("#description").val();
            const content = CKEDITOR.instances.editor.getData();

            apiRequest({
                url: `http://localhost:8000/api/blogs/${blogId}`,
                method: "PUT",
                data: { title, description, content },
                success: function (res) {
                    if (res.success) {
                        showToast("Cập nhật thành công!", "success");
                        setTimeout(
                            () => (window.location.href = "/my-blogs"),
                            1000
                        );
                    } else {
                        showToast(res.message || "Cập nhật thất bại!", "error");
                    }
                    $submitButton.prop("disabled", false).text("Cập nhật Blog");
                },
                error: function () {
                    showToast("Lỗi máy chủ khi cập nhật!", "error");
                    $submitButton.prop("disabled", false).text("Cập nhật Blog");
                },
            });
        });
    }

    // Handle Blog Detail
    if ($("#title").length && window.location.pathname.startsWith("/blogs/")) {
        const pathParts = window.location.pathname.split("/");
        const blogId = pathParts[pathParts.length - 1];

        apiRequest({
            url: `http://localhost:8000/api/blogs/${blogId}`,
            method: "GET",
            success: function (res) {
                if (res.success) {
                    const blog = res.data;
                    $("#title").text(blog.title);
                    $("#author").text(blog.user.name);
                    $("#time-created").text(
                        new Date(blog.created_at).toLocaleString()
                    );
                    $("#description").text(blog.description);
                    $("#content").html(blog.content);
                } else {
                    showToast("Không tìm thấy blog!", "error");
                }
            },
            error: function () {
                showToast("Lỗi khi tải blog!", "error");
            },
        });
    }
});
