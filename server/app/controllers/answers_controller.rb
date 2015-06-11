class AnswersController < ApplicationController
  before_action :set_answer, only: [:show, :edit, :update, :destroy]


  # GET /answers
  # GET /answers.json
  def index
    @answers = Answer.all.order(score: :asc)
  end

  # GET /answers/1
  # GET /answers/1.json
  def show

    p @question = @answer.question
  end

  # GET /answers/new
  def new
    @question = Question.find(params[:question_id])
    @answer = Answer.new
    p @answer
    p @question
  end

  # GET /answers/1/edit
  def edit
    p @answer
    p @question = @answer.question
  end

  # POST /answers
  # POST /answers.json
  def create
    @question = Question.find(params[:question_id])
    p @question
    @answer = @question.answers.create(answer_params)
    redirect_to question_path(@question), notice: 'Answer was successfully created.'
  end


  # PATCH/PUT /answers/1
  # PATCH/PUT /answers/1.json
  def update
    respond_to do |format|
      if @answer.update(answer_params)
        format.html { redirect_to question_answer_url, notice: 'Answer was successfully updated.' }
        format.json { render :show, status: :ok, location: @answer }
      else
        format.html { render :edit }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /answers/1
  # DELETE /answers/1.json
  def destroy
    @answer.destroy
    respond_to do |format|
      format.html { redirect_to answers_url, notice: 'Answer was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def answer_params
      params.require(:answer).permit(:title, :content)
    end
end
