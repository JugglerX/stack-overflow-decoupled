rob = User.create(
  username: "rob",
  password: "rob"
)

tap = User.create(
  username: "tap",
  password: "tap"
)

# Gen questions for Rob
5.times do
  new_question = Question.create(
      title: Faker::Lorem.sentence,
      content: Faker::Lorem.paragraph(3),
      user_id: rob.id
  )
  5.times do
    Answer.create(
      title: Faker::Lorem.sentence,
      content: Faker::Lorem.paragraph(10),
      question_id: new_question.id,
      user_id: tap.id
    )
  end
end

# Gen questions for Tap
5.times do
  new_question = Question.create(
      title: Faker::Lorem.sentence,
      content: Faker::Lorem.paragraph(3),
      user_id: tap.id
  )
  5.times do
    Answer.create(
      title: Faker::Lorem.sentence,
      content: Faker::Lorem.paragraph(10),
      question_id: new_question.id,
      user_id: rob.id
    )
  end
end



# Drinker.create(beer_id: 1, user_id: 1)
# Rating.create(rating: 3, user_id: 1, beer_id: 1)
# Drinker.create(beer_id: 2, user_id: 1)
# Rating.create(rating: 5, user_id: 1, beer_id: 2)
# Drinker.create(beer_id: 3, user_id: 1)
# Rating.create(rating: 1, user_id: 1, beer_id: 3)
# Drinker.create(beer_id: 4, user_id: 1)
# Rating.create(rating: 2, user_id: 1, beer_id: 4)
# Drinker.create(beer_id: 5, user_id: 1)
# Rating.create(rating: 3, user_id: 1, beer_id: 5)


# Drinker.create(beer_id: 1, user_id: 2)
# Rating.create(rating: 2, user_id: 2, beer_id: 1)
# Drinker.create(beer_id: 2, user_id: 2)
# Rating.create(rating: 5, user_id: 2, beer_id: 2)
# Drinker.create(beer_id: 3, user_id: 2)
# Rating.create(rating: 5, user_id: 2, beer_id: 3)
# Drinker.create(beer_id: 4, user_id: 2)
# Rating.create(rating: 2, user_id: 2, beer_id: 4)
# Drinker.create(beer_id: 5, user_id: 2)
# Rating.create(rating: 2, user_id: 2, beer_id: 5)
