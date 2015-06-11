module UsersHelper
  def current_user
    # @current_user ||= User.where(id: session[:user_id]).first if session[:user_id]
    current_user = User.find_by(username: session[:username])
  end

  def user_logged_in?
    session[:username] != nil
  end
end
