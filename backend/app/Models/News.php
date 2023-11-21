<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $table = 'news';
    protected $fillable = ['title', 'author', 'image', 'content'];
    protected $guarded = ['id', 'updated_at'];
    protected $casts = [
        'created_at' => 'datetime',
    ];
}
