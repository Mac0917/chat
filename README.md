chatアプリの作り方

rails g channel room
これで app/channels/room_channel.rb と　javascripts/channels/roooms.coffeeが作られる　coffeeの書き方知らんのでjsに書き換えた

coffeeはjsを簡単な記述で書くためのもの
rals new app名 --skip-coffee　でcoffeeが作られなくなる

あとはその二つのファイルをみれば理解できる


# 本番環境での実行の仕方
エンジンエックスを編集する
/etc/nginx/conf.d/アプリケーション名.confに以下を記述


upstream puma {
    server unix:///home/ec2-user/chokichoki/current/tmp/sockets/puma.sock;
}
server {
    listen       80;
    server_name  54.64.74.19;
    root /home/ec2-user/chokichoki/current/public;
    access_log  /var/log/nginx/access.log  main;
    error_log /var/log/nginx/error.log;
    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;
    client_max_body_size 100M;
    include             /etc/nginx/mime.types;

    location / {
        proxy_pass http://puma;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_redirect off;
        proxy_connect_timeout 30;
    }

    location ^~ /assets/ {
        gzip_static on;
        expires max;
        add_header Cache-Control public;
        root /home/ec2-user/chokichoki/current/public;
    }

    #ActionCableを使用する場合コメントアウトを外してください
    location /cable {
       proxy_pass http://0.0.0.0:3000/cable;
       proxy_http_version 1.1;
       proxy_set_header Upgrade websocket;
       proxy_set_header Connection Upgrade;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header Host $host;
    }
}


cable.ymlに
production:
  adapter: async

environment/production.rbに
#本番環境でアクションケーブル
  config.action_cable.url = "ws://54.64.74.19/cable" 
  config.action_cable.allowed_request_origins = ["http://54.64.74.19"]
  ActionCable.server.config.disable_request_forgery_protection = true

一応書いておく


