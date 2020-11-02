class UsersController < ApplicationController
  def top
    @user = User.new

  end

  def create
    @user = User.new(
      name: params[:name], 
      password: params[:password], 
      star: params[:star])
    if @user.save
      flash[:notice] = "ユーザーを作成しました"
      redirect_to("/game/#{@user.id}")
    else
        render :top
    end
  end

  def login
    @user = User.new

  end

  def logindb
    @user = User.find_by(
      name:params[:name],
      password:params[:password])
    if @user
      flash[:notice]="ログインしました"
      session[:user_name] = @user.name
      redirect_to("/game/#{@user.id}")
    else
      render :login
    end
  end

  def myPage
  end
end
