<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        for ($i = 1; $i <= 20; $i++) {
            Blog::create([
                'user_id' => rand(1, 2),
                'title' => "Blog thử nghiệm #$i",
                'description' => "Mô tả ngắn của blog số $i", 
                'content' => "Nội dung mẫu cho blog số $i",
            ]);
        }
    }
}
