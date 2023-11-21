<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller
{
    public function index(Request $request){
        $news = News::limit(5)->get();
        foreach($news as $n){
            $n->title = substr($n->title, 0, 40);
            $n->content = substr($n->content, 0, 80);
        }
        return response()->json($news);
    }
}
