#!/bin/bash

docker exec tiketin-be-core php artisan key:generate --force
docker exec tiketin-be-core php artisan migrate --seed --force
