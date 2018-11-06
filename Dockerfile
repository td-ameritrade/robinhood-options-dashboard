FROM kyma/docker-nginx
COPY dist/pwa-mat /var/www
CMD 'nginx'