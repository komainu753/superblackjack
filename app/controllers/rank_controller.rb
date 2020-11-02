class RankController < ApplicationController
  def top
    @users = User.all
  end

end
