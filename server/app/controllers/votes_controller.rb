class VotesController < ApplicationController
  before_action :allow_cross_domain

  def create
    @vote = Vote.new(vote_value: params[:vote_value], votable_type: params[:votable_type], votable_id: params[:votable_id])
    p @vote
    # @vote.user_id = User.find_by(username: session[:username]).id
    p params[:user_id]
    p User.find_by(id: params[:user_id])
    @vote.user_id = User.find_by(id: params[:user_id])
    @vote.save
    p @vote
    p "test"

    if @vote.votable_type == "Question"
      @question = Question.find(@vote.votable_id)
      @question.score = Vote.where(votable_type: "Question", votable_id: @question.id).sum(:vote_value)
      @question.save
      render json: @question
    else
      @answer = Answer.find(@vote.votable_id)
      @answer.score = Vote.where(votable_type: "Answer", votable_id: @answer.id).sum(:vote_value)
      @answer.save
      @question = Question.find(@answer.question_id)
      respond_to do |format|
        format.html { redirect_to '/' }
        format.json { render json: @answer}
      end
    end



  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    # def vote_params
    #   params.require(:vote).permit(:vote_value, :votable_type, :votable_id)
    # end

     def allow_cross_domain
      headers['Access-Control-Allow-Origin'] = '*'
       headers['Access-Control-Request-Method'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
       headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    end
end
