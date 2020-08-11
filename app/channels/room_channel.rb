class RoomChannel < ApplicationCable::Channel
  def subscribed #フロントエンドとバックエンドがつながったときに発動
    #binding.pry
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data) #引数には送れられてきたデータがある 引数の名前は自由  #フロントから送られてきたデータを違う人のフロントにも送る room_channelはroom.jsのcreate("RoomChannel"に一致している
    #binding.pry
    Message.create(content: data["message"])
    # ActionCable.server.broadcast 'room_channel', message: data["message"]
    ActionCable.server.broadcast 'room_channel', message: data['message']
  end
end
