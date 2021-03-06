const router = require('express').Router();
const { Thread } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newThread = await Thread.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newThread);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Thread.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }
    );
    res.status(200).json(threadData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Thread.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!threadData) {
      res.status(404).json({ message: 'No thread found with this id!' });
      return;
    }

    res.status(200).json(threadData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
