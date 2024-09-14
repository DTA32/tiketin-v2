# Use the official PHP 8.1.2 FPM base image
FROM php:8.1.2-fpm

# Set the working directory
WORKDIR /var/www/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    curl \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev \
    software-properties-common

# Install PHP extensions
RUN docker-php-ext-configure gd
RUN docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath -j$(nproc) gd intl

# Install Node.js and npm
# RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
# RUN apt-get install -y nodejs

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create a user and group
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Ensure that the working directory and vendor can be written by the www user
RUN chown -R www:www /var/www/backend

# Switch to the non-root user
USER www

# Copy files after ensuring permissions are correct
COPY --chown=www:www . .
# RUN php artisan storage:link

# Build the frontend assets
# RUN npm install
# RUN npm run build

# Start PHP-FPM
EXPOSE 9000
CMD ["php-fpm"]
