class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :title
      t.text :content
      t.references :question
      t.integer :score, default: 0


      t.timestamps
    end
  end
end
