class RankController < ApplicationController
  def top
    @topUsers = User.all.order(money: "DESC").limit(10)
  end

end
