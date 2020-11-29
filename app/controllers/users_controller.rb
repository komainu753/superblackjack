class UsersController < ApplicationController
  before_action :authentic_user, {only: [:myPage,:edit,:update]}

  def top
    @user = User.new

  end

  def create
    @user = User.new(
      name: params[:name], 
      password: params[:password], 
      star: params[:star])
    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = "ユーザーを作成しました"
      redirect_to("/")
    else
      flash[:notice] = "作成に失敗しました"
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
      session[:user_money] = @user.money
      session[:user_id] = @user.id
      redirect_to("/")
    else
      flash.alert = "ユーザー名とパスワードが一致しません"
      render :login
    end
  end

  def logout
    session[:user_id] = nil
    flash[:notice] = "ログアウトしました"
    redirect_to("/")
  end

  def myPage
    if @current_user.id != params[:id].to_i
      flash[:notice] = "無効なアクセスです"
      redirect_to("/")
    end
  end

  def edit
    if @current_user.id != params[:id].to_i
      flash[:notice] = "無効なアクセスです"
      redirect_to("/")
    end
  end

  def update
    if @current_user.password == params[:password]
      if @current_user.update(
        name: params[:name],
        star: params[:star])
      end
      flash[:notice] = "ユーザー情報を更新しました"
      redirect_to("/myPage/#{@current_user.id}")
    else
      flash.now[:alert] = "パスワードが違います"
      render :edit
    end
  end

  def ready
    if @current_user.id != params[:id].to_i
      flash[:notice] = "無効なアクセスです"
      redirect_to("/")
    end
  end

  def destroy
    if @current_user.password == params[:password]
      @current_user.destroy
      flash[:notice] = "ユーザーを削除しました"
      redirect_to("/")
    else
      flash.now[:alert] = "パスワードが違います"
      render :ready
    end 
  end
end
