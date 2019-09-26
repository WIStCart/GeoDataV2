class PagesController < ApplicationController
  def show
    begin
      render template: "pages/#{params[:page]}"
    rescue
      raise ActionController::RoutingError.new('Not Found')
    end
  end
end
