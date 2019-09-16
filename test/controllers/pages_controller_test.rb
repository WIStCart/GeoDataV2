require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should return a about page" do
    get '/pages/about'
    assert_response :success
  end

  test "should return a help page" do
    get '/pages/help'
    assert_response :success
  end

  test "should return a contribute page" do
    get '/pages/contribute'
    assert_response :success
  end

  test "should return a credits page" do
    get '/pages/credits'
    assert_response :success
  end

  test "should not return a unicorn page" do
    skip("# @TODO - rescue and 404 these bad requests")
    get '/pages/unicorn'
    assert_response :not_found
  end
end
