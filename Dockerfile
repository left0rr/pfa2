FROM php:8.3-fpm

# System deps
RUN apt-get update && apt-get install -y \
    git curl libpq-dev zip unzip \
    libonig-dev libxml2-dev \
    libzip-dev && \
    docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .
RUN mkdir -p /var/www/html/storage && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage

RUN git config --global --add safe.directory /var/www/html

RUN composer install

# Laravel Permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 775 /var/www/html/storage

EXPOSE 9000
CMD ["php-fpm"]
