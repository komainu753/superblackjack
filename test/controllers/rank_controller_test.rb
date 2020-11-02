require 'test_helper'

class RankControllerTest < ActionDispatch::IntegrationTest
  test "should get top" do
    get rank_top_url
    assert_response :success
  end

end
