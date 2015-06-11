class SessionsController < ApplicationController
  def new
    # call login template
  end
  def create
    p params
    p "this ran"
  end

  def create
    p params
    @user = User.find_by(username: params[:session][:username].downcase)
    p @user
    if @user && @user.authenticate(params[:session][:password])
      session[:username] = @user.username
      redirect_to @user
    else
      # Create an error message.
      render 'new'
    end
  end

  def destroy
    p session
    session[:username] = nil
    redirect_to "/"
  end
end
