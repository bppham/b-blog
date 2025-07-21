<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'My App')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')
</head>

<body class="bg-gray-100 text-gray-900">

    {{-- Header (navbar) --}}
    @include('layouts.partials.header')

    {{-- Sidebar --}}
    @include('layouts.partials.sidebar') {{-- ID: sidebar-multi-level-sidebar --}}

    {{-- Content wrapper with left margin for sidebar --}}
    <div class="p-4 sm:ml-64 mt-[65px]">
        <main class="p-4 dark:border-gray-700">
            @yield('content')
        </main>
    </div>

    @yield('scripts')
    <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>
    <script src="https://cdn.ckeditor.com/4.20.1/standard/ckeditor.js"></script>
    <script>
        CKEDITOR.replace('editor');
    </script>
</body>

</html>
