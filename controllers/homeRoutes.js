const router = require('express').Router();
const { User, Thread, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const threadData = await Thread.findAll({
      order: [
        ['date_created', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const threads = threadData.map((thread) => thread.get({ plain: true }));

    res.render('homepage', {
      threads,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/thread/:id', async (req, res) => {
  try {
    const threadData = await Thread.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ]
    });

    const thread = threadData.get({ plain: true });

    res.render('thread', {
      ...thread,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Thread }]
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/newthread', withAuth, async (req, res) => {
  res.render('newthread', {
    logged_in: true
  });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
