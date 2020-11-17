## 概要
action cableを使ったチャットの練習用のアプリです。

## バージョン
ruby・・・2.5.7<br>
rails・・・5.2.4.4<br>
mysql・・・5.7

## ローカル環境での実行手順
dockerとdocker-composeを自分のpcにインストール

好きなディレクトリで<br>
`git clone https://github.com/Mac0917/chat.git`

移動<br>
`cd chat`

docker-composeを実行<br>
`docker-compose up -d`

データベース作成<br>
`docker exec -it chat_app_1 bash`(コンテナに入る)<br>
`rails db:create`<br>
`rails db:migrate`<br>

アクセス<br>
http://localhost:3000/<br>

終了<br>
`exit`(コンテナから出る)<br>
`docker-compose stop`<br>
`docker-compose rm`<br>
`docker rmi chat_web`<br>
`docker volume rm chat_db-volume`

リポジトリを削除<br>
`cd ..`<br>
`rm -rf chat`

## chatアプリの作り方

```rails g channel room```<br>
これで app/channels/room_channel.rb と<br>
javascripts/channels/roooms.coffeeが作られる　<br>
coffeeの書き方知らんのでjsに書き換えた<br>

coffeeはjsを簡単な記述で書くためのもの<br>
rals new app名 --skip-coffee　でcoffeeが作られなくなる<br>

あとはその二つのファイルをみれば理解できる


