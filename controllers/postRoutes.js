const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

router.get('/create', async (req, res) => {
    try {
        res.render('new-post');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'blog_author',
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    as: 'post_comments',
                    include: {
                        model: User,
                        as: 'comment_author',
                        attributes: ['username'],
                    },
                },
            ],
        });

        const singlePostData = postData.get({ plain: true });

        res.render('singlepost', { singlePostData });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;