<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class bandara extends Model
{
    use HasFactory;
    protected $table = 'bandara';
    protected $fillable = ['nama_bandara', 'kode_bandara', 'kota'];

    public function penerbangan_asal(): HasMany
    {
        return $this->hasMany(penerbangan::class, 'bandara_asal_id');
    }
    public function penerbangan_tujuan(): HasMany
    {
        return $this->hasMany(penerbangan::class, 'bandara_tujuan_id');
    }
}
