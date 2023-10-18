FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY --chown=nginx:nginx ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80