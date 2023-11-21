<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class penerbangan extends Model
{
    use HasFactory;
    protected $table = 'penerbangan';
    protected $fillable = ['bandara_asal_id', 'bandara_tujuan_id', 'waktu_berangkat', 'waktu_sampai', 'maskapai', 'tipe_pesawat'];
    protected $casts = [
        'waktu_berangkat' => 'datetime',
        'waktu_sampai' => 'datetime',
    ];
    public function bandara_asal(): BelongsTo
    {
        return $this->belongsTo(bandara::class, 'bandara_asal_id');
    }
    public function bandara_tujuan(): BelongsTo
    {
        return $this->belongsTo(bandara::class, 'bandara_tujuan_id');
    }
    public function kelas_penerbangan(): HasMany
    {
        return $this->hasMany(kelas_penerbangan::class, 'penerbangan_id');
    }
    public function pemesanan(): HasMany
    {
        return $this->hasMany(pemesanan::class, 'penerbangan_id');
    }
}
