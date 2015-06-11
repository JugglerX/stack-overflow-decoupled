class User < ActiveRecord::Base
  has_secure_password

  has_many :votes
  has_many :answers
  has_many :questions
end
