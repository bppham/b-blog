<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', function () {
    return view('pages.home');
});

Route::get('/auth/login', function () {
    return view('pages.login');
});

Route::get('/auth/sign-up', function () {
    return view('pages.register');
});

Route::get('/create-blog', function () {
    return view('pages.create_blog');
});

Route::get('/update-blog', function () {
    return view('pages.update_blog');
});

Route::get('/blogs/{id}', function ($id) {
    return view('pages.detail_blog');
});

Route::get('/my-blogs', function () {
    return view('pages.my_blogs');
});
