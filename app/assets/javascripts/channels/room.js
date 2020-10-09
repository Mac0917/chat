App.room = App.cable.subscriptions.create("RoomChannel", {
    connected: function() { //フロントをしっかりと監視できているとき発動
      console.log("dfafa");
    },
    disconnected: function() {

    },
    received: function(data) {
      //alert(data['message']);
      var message = data['message']
      $("#messages").append(`<p>${message}</p>`);
    },//バックエンドから送れられてきたデータをここで受け取る

    speak: function(content) { //フロントエンドからバックエンドにデータを送信できる
       return this.perform("speak", {message: content}) //room_channel.rbのspeakアクションにいく
    }
});

$(function(){
    $("#button").click(function(){
        var content = $("#message").val();
        var img = $("#image").val();
        alert(img);
        App.room.speak(content);
    })
});