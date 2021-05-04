const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./postRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/post', postRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoutes);


module.exports = router;