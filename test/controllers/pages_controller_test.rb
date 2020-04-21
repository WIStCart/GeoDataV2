require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should return a about page" do
    get '/pages/about'
    assert_response :success
  end

  test "should return a help page" do
    skip "Test env indeterminable routing error"
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
    assert_raises ActionController::RoutingError do
      get '/pages/unicorn'
    end
  end
end
