

const Review = require('../models/Review');
const checkIfUserIsDeleted = async (user) => {
    if (!user)
        throw new Error('Fatal: user Id extracted from JWT Token doesn\'t match any in Database.');
};
const countAverageRating = async (toilet) => {
    Review.find({ address: toilet.address })
            .exec()
            .then(reviews => {
                console.log("rev"+reviews);
                if (reviews.length <=0) {
                    return 0;
                    }
                const averageRating = reviews.reduce((a, b) => a.rating + b.rating) / reviews.length;
                console.log("av"+averageRating);
                return averageRating;
            })
            .catch( err => console.log("idk why"))
    
};

module.exports = { checkIfUserIsDeleted ,countAverageRating};