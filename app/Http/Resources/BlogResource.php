<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class BlogResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "created_at" => $this->created_at->format("Y-m-d H:i:s"),
            "title" => $this->title,
            "text" => $this->text,
            "user" => new UserResource($this->whenLoaded("user"))
        ];
    }
}
