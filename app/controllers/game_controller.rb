class GameController < ApplicationController
  before_action :authentic_user, {only: [:user]}

  def gest
  end

  def user
    @user = User.find_by(id:params[:id])
    if @current_user.id != params[:id].to_i
      flash[:notice] = "無効なアクセスです"
      redirect_to("/")
    end
  end

  def getmoney
    user = User.find_by(id:params[:id])
    user.money = params[:money]
  end

  def money
    user = User.find_by(id:params[:id])
    user.money = params[:money]
    user.save
  end
end
