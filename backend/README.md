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

Server will be available at [localhost:8000](localhost:8000)

### Docker setup

> Most difficult docker image to create goes to Laravel

For quick preview, image is available on docker hub and can be pulled by `docker pull dta32/tiketin-v2-be:latest` then step 2, but it's based on main branch, so if there's code changes can do step 1 first

1. `docker build -t dta32/tiketin-v2-be .`
1. `cp .env.example .env` (then edit accordingly)
1. `docker run -d -p {externalPort}:8080 --env-file .env dta32/tiketin-v2-be:latest`

For more simple deploy on each side can also use docker compose, it will autorun frontend, backend, and database, but please build each sides image first

1. `cp .env.example .env` (then edit accordingly)
1. `docker compose up -d`

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
