<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $blogs = Blog::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return ApiResponse::success($blogs, 'All blogs paginated');
    }

    public function myBlogs(Request $request)
    {
        $user = Auth::user();
        $perPage = $request->input('per_page', 10);

        $blogs = Blog::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return ApiResponse::success($blogs, "Your blogs paginated");
    }

    public function show($id)
    {
        $blog = Blog::with('user')->find($id);

        if (!$blog) {
            return ApiResponse::error('Not found', 404);
        }

        return ApiResponse::success($blog, 'Successfully');
    }

    public function store(StoreBlogRequest $request)
    {
        $user = Auth::user();
        if (!$user) {
            return ApiResponse::error("Unauthorized", 401);
        }

        $data = $request->validated();
        $data['user_id'] = $user->id;

        $blog = Blog::create($data);

        return ApiResponse::success($blog, "Create blog successfully");
    }

    public function update(UpdateBlogRequest $request, $id)
    {
        $user = Auth::user();
        if (!$user) {
            return ApiResponse::error("Unauthorized", 401);
        }

        $blog = Blog::find($id);

        if (!$blog) {
            return ApiResponse::error("Blog not found", 404);
        }

        if ($blog->user_id !== $user->id) {
            return ApiResponse::error("Forbidden: You can only update your own blog", 403);
        }

        $data = $request->validated();

        $blog->update($data);

        return ApiResponse::success($blog, "Update blog successfully");
    }

    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user) {
            return ApiResponse::error("Unauthorized", 401);
        }

        $blog = Blog::find($id);

        if (!$blog) {
            return ApiResponse::error("Blog not found", 404);
        }

        if ($blog->user_id !== $user->id) {
            return ApiResponse::error("Forbidden: You can only delete your own blog", 403);
        }

        $blog->delete();

        return ApiResponse::success(null, "Delete blog successfully");
    }
}
