const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'blog_author',
                    attributes: ['username'],
                },
            ],
        });

    // serialize data
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    res.render('login');
});
  
module.exports = router;