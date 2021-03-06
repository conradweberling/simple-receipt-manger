<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'color'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function invitations() {

        return $this->hasMany(Invitation::class);

    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function receipts() {

        return $this->hasMany(Receipt::class);

    }

    /**
     * Check Password
     *
     * @param $hash
     * @return bool
     */
    public function checkPassword($hash) {

        return Hash::check($hash, $this->password);

    }

    /**
     * Get random user id
     *
     * @return |null
     */
    public static function randomUserId() {

        $ids_raw = User::select('id')->get();
        if(!$ids_raw) return null;

        $ids = $ids_raw->pluck('id')->all();
        return $ids[array_rand($ids)];

    }

    /**
     * Add demo user
     */
    public static function addDemoUser() {

        User::factory()->create([
            'name' => 'Max',
            'email' => 'max@example.net',
            'password' => '$2y$10$17oQb9TW1gNaHqawehrjWu5gGYsz7JsgxmW8qHLmhLKEXimg0So46',
            'color' => '#39e262'
        ]);

    }

}
