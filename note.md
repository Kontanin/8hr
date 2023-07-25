{
  _id:"$product",
  avarageRating:{$avg:"$rating"},
  numOfReviews:{$sum:1}
}