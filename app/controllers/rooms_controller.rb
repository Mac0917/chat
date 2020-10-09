class RoomsController < ApplicationController
  def show
    @messages = Message.all
    @image = Message.find(49)
    
  end
end
