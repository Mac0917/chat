App.room = App.cable.subscriptions.create("RoomChannel", {
    connected: function() { //フロントをしっかりと監視できているとき発動
      console.log("dfafa");
    },
    disconnected: function() {

    },
    received: function(data) {
      alert(data['message']);
    },//バックエンドから送れられてきたデータをここで受け取る

    speak: function() { //フロントエンドからバックエンドにデータを送信できる
       return this.perform("speak", {message: "aaaaaaa"}) //room_channel.rbのspeakアクションにいく
    }
});

// $("#button").click(function(){
//     alert(33);
// })