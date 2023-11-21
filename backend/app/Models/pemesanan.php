<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class pemesanan extends Model
{
    use HasFactory;
    protected $table = 'pemesanan';
    protected $primaryKey = 'id';
    protected $fillable = ['penerbangan_id', 'status', 'metode_pembayaran', 'referensi_pembayaran', 'kelas_penerbangan_id', 'userId'];
    public function penerbangan(): BelongsTo
    {
        return $this->belongsTo(penerbangan::class);
    }
    public function pemesanan_harga(): HasOne
    {
        return $this->hasOne(pemesanan_harga::class);
    }
    public function pemesanan_penumpang(): HasMany
    {
        return $this->hasMany(pemesanan_penumpang::class);
    }
    public function userId(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id');
    }
    public function kelas_penerbangan(): BelongsTo
    {
        return $this->belongsTo(kelas_penerbangan::class)->select('id', 'penerbangan_id', 'tipe_kelas', 'harga', 'jumlah_kursi');
    }
}
