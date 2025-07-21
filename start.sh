#!/bin/bash

echo "👉 Caching config..."
php artisan config:clear
php artisan config:cache

if [ -z "$APP_KEY" ]; then
  echo "👉 Generating APP_KEY..."
  php artisan key:generate
fi

echo "👉 Linking storage..."
php artisan storage:link || true

echo "👉 Migrating database..."
php artisan migrate --force || true

echo "👉 Starting Laravel..."
php artisan serve --host=0.0.0.0 --port=8000
