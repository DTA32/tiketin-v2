<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class pemesanan_penumpang extends Model
{
    use HasFactory;
    protected $table = 'pemesanan_penumpang';
    protected $fillable = ['pemesanan_id', 'nama', 'kursi_penerbangan'];
    public function pemesanan(): BelongsTo
    {
        return $this->belongsTo(pemesanan::class);
    }
}
