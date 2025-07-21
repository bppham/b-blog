<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    //
    public function me(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return ApiResponse::error(null, 'Unauthorized', 401);
        }

        return ApiResponse::success([
            'name' => $user->name,
            'email' => $user->email,
        ], 'User info retrieved successfully');
    }
}
