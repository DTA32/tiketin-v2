# Backend

## Installation Guide

Execute these lines in your terminal

1. `composer install`
1. `cp .env.example .env` (or copy and rename .env.example to .env)
1. `php artisan migrate`
1. `php artisan db:seed`
1. `php artisan key:generate`

To run backend server, execute

`php artisan serve`

---

## Default data

After executing db:seed, these data will be available:

### Credentials

- Admin

email: <admin@email.com>

password: admin

- User

email: <user@email.com>

password: user

### Flights

Flights are available tomorrow, starting from db:seed was executed

---
