@extends('layouts.app')

@section('title', 'Trang chủ')

@section('content')
    <div id="blog-list"></div>
    <div id="pagination" class="flex justify-center gap-2 mb-10"></div>

    {{-- Template mẫu ẩn cho từng blog --}}
    <template id="blog-template">
        <div class="border border-black rounded-2xl mb-5 p-3 blog-item">
            <div class="mb-10 grid grid-cols-1 gap-2 md:grid-cols-2">
                <div class="rounded-lg bg-white p-6 shadow-md md:col-span-2">
                    <h2 class="mb-2 text-xl font-semibold text-gray-800">Tác giả</h2>
                    <p class="author-name text-gray-600"></p>
                    <div class="flex flex-col justify-between md:flex-row">
                        <p class="author-email text-gray-600"></p>
                        <p class="blog-time text-gray-600"></p>
                    </div>
                </div>
                <div class="rounded-lg bg-white p-6 shadow-md md:col-span-2">
                    <h2 class="mb-4 text-xl font-semibold text-gray-800">
                        <span
                            class="blog-title text-gray-600 hover:text-blue-800 cursor-pointer transition-colors duration-200"></span>
                    </h2>
                    <div class="blog-content text-gray-700"></div>
                </div>
            </div>
        </div>
    </template>

    @vite(['resources/js/home.js'])
@endsection
