FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    nodejs \
    npm

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy source code
COPY . .

# Install PHP packages
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# OPTIONAL: Build Vite (nếu bạn dùng Vite)
RUN npm install && npm run build

# Copy start script & make it executable
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8000

# Start Laravel via start.sh
CMD ["/start.sh"]
