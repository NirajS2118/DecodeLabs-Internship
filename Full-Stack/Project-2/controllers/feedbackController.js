const store = require('../data/feedbackStore');

const getAllFeedback = (req, res) => {
  const feedbacks = store.getAll();
  res.status(200).json(feedbacks);
};

const submitFeedback = (req, res) => {
  const { name, email, message } = req.body;
  store.add(name.trim(), email.trim(), message.trim());
  res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
};

module.exports = { getAllFeedback, submitFeedback };
