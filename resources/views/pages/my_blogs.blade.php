@extends('layouts.app')

@section('title', 'My blogs')

@section('content')
    <div id="blog-list"></div>
    <div id="pagination" class="flex justify-center gap-2 mb-10"></div>

    {{-- Template mẫu ẩn cho từng blog --}}
    <template id="my-blog-template">
        <div class="blog-item mb-6 rounded-2xl border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <!-- Nội dung blog -->
                <div class="rounded-lg bg-white p-5 shadow md:col-span-2">
                    <h2 class="mb-3 text-xl font-semibold text-gray-800">
                        <span class="blog-title cursor-pointer transition-colors duration-200 hover:text-blue-600"> Tiêu đề
                            bài viết </span>
                    </h2>
                    <p class="blog-time mb-5 text-gray-600 italic">20/07/2025</p>
                    <div class="blog-content text-gray-700">Đây là nội dung ngắn gọn hoặc đoạn trích từ bài viết...</div>
                </div>

                <!-- Hành động -->
                <div class="flex flex-col items-stretch gap-3 md:col-span-2 md:flex-row md:justify-end">
                    <button data-id=""
                        class="btn-update cursor-pointer rounded-lg bg-green-500 px-5 py-2 text-white shadow transition hover:bg-green-600">Update</button>
                    <button data-id=""
                        class="btn-delete cursor-pointer rounded-lg bg-red-500 px-5 py-2 text-white shadow transition hover:bg-red-600">Delete</button>
                </div>
            </div>
        </div>

    </template>

    @vite(['resources/js/myBlogs.js'])
@endsection
s
