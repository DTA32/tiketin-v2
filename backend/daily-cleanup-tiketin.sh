#!/bin/bash

# Location: {Project Location}/daily-cleanup.sh
# Description: Script to daily cleanup Laravel application
# Notes: 

start=$(date)
echo "${start} - daily-cleanup-tiketin.sh - start"

cd /var/www/backend

# Run Laravel database cleanup command
php artisan migrate:fresh --force
php artisan db:seed --force

# Clear cache and re-cache
php artisan cache:clear
php artisan optimize

end=$(date)
echo "${end} - daily-cleanup-tiketin.sh - end"
