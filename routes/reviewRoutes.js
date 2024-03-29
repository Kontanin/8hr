const express =require('express');
const router =express.Router();
const {authenticateUser} = require('../middleware/authentication')

module.exports={
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
} =require('../controllers/reviewController');

router.route('/').post(authenticateUser,createReview).get(getAllReviews)

router.route('/:id')
    .get(getSingleReview)
    .patch(authenticateUser,updateReview)
    .delete(authenticateUser,deleteReview);


module.exports=router;