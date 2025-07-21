import $ from "jquery";
import { formatTime } from "./utils/helper";
import { showToast } from "./utils/toast";
import { apiRequest, API_BASE_URL } from "./utils/api";

$(document).ready(function () {
    const $blogList = $("#blog-list");
    const $pagination = $("#pagination");
    const $template = $("#blog-template");

    let currentPage = 1;
    const perPage = 5;

    function fetchBlogs(page = 1) {
        $blogList.html("<p class='text-gray-500'>Đang tải dữ liệu...</p>");

        apiRequest({
            url: `${API_BASE_URL}/blogs?page=${page}&per_page=${perPage}`,
            method: "GET",
            success: function (response) {
                const blogs = response.data.data;
                const current_page = response.data.current_page;
                const last_page = response.data.last_page;

                renderBlogs(blogs);
                renderPagination(current_page, last_page);
            },
            error: function (xhr) {
                console.error("Lỗi API:", xhr);
                $blogList.html(
                    "<p class='text-red-500'>Lỗi khi tải dữ liệu blog.</p>"
                );
                showToast("Lỗi khi load danh sách", "error");
            },
        });
    }

    function renderBlogs(blogs) {
        $blogList.empty();
        if (Array.isArray(blogs) && blogs.length > 0) {
            blogs.forEach(function (blog) {
                const $clone = $($template.html());

                $clone.find(".author-name").text(blog.user.name);
                $clone.find(".author-email").text(blog.user.email);
                $clone.find(".blog-time").text(formatTime(blog.created_at));
                $clone.find(".blog-title").text(blog.title);
                $clone.find(".blog-content").text(blog.description);
                $clone.attr("data-id", blog.id);

                $clone.find(".blog-title").on("click", function () {
                    window.location.href = `blogs/${blog.id}`;
                });

                $blogList.append($clone);
            });
        } else {
            $blogList.html("<p>Không có blog nào.</p>");
        }
    }

    function renderPagination(current, total) {
        $pagination.empty();

        for (let i = 1; i <= total; i++) {
            const $btn = $("<button>")
                .text(i)
                .addClass("px-4 py-2 rounded")
                .addClass(
                    i === current
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-blue-200"
                )
                .on("click", function () {
                    currentPage = i;
                    fetchBlogs(i);
                });

            $pagination.append($btn);
        }
    }

    fetchBlogs(currentPage);
});
