@extends('layouts.app')

@section('title', 'Trang chủ')

@section('content')
    <div class="p-4">
        <h2 id="title" class="mb-3 p-4 text-4xl font-black text-black italic">The blog title here</h2>
        <div class="mb-4 flex flex-col justify-between p-1 text-gray-600 md:flex-row">
            <p class="italic">Published by <span id="author" class="font-bold"></span></p>
            <p id="time-created"></p>
        </div>
        <div id="description" class="text-gray-700 mb-5"></div>
        <div id="content" class="text-gray-900"></div>
    </div>


    @vite(['resources/js/blog.js'])
@endsection
