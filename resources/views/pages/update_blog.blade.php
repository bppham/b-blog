@extends('layouts.app')

@section('title', 'Update blog')

@section('content')
    {{-- Template mẫu ẩn cho từng blog --}}
    <h2 class="mb-1 text-3xl font-bold text-black">Update your blog</h2>
    <form id="updateBlogForm">
        <div class="mb-4">
            <label class="block mb-1 text-sm font-semibold" for="title">Title</label>
            <input type="text" id="title" name="title" class="w-full border rounded p-2" required>
        </div>
        <div class="mb-4">
            <label class="block mb-1 text-sm font-semibold" for="description">Description</label>
            <textarea id="description" name="description" rows="4" class="w-full border rounded p-2" required></textarea>
        </div>

        <div class="mb-4">
            <label class="block mb-1 text-sm font-semibold" for="content">Content</label>
            <textarea id="editor" name="content"></textarea>
        </div>

        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Update Blog
        </button>
    </form>
    <p id="statusMessage" class="mt-4 text-center"></p>
    @vite(['resources/js/blog.js'])
@endsection
