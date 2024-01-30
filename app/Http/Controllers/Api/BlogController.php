<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Http\Resources\BlogResource;
use App\Http\Requests\StoreBlogRequest;
use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BlogResource::collection(
            Blog::query()->orderBy("created_at", "desc")->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        $data = $request->validated();
        Log::info(auth('sanctum')->user()->id);
        if ($data['user_id'] !== auth('sanctum')->user()->id) {
            return response(['errors' => array('err' => ['You are not authorized to upload this blog.'])], 403);
        }
        $blog = Blog::create($data);
        return response(new BlogResource($blog), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return new BlogResource($blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        if ($this->user()->id !== $blog->user_id) {
            return response(['error' => 'You are not authorized to delete this blog.'], 403);
        }
        $blog->delete();
        return response("", 204);
    }
}
