class GameController < ApplicationController
  def gest
  end

  def user
    @user = User.find_by(id:params[:id])
  end

  def money
    user = User.find_by(id:params[:id])
    puts(params[:money])
    user.money = params[:money]
    user.save
    redirect_to("/rank/top")
  end
end
