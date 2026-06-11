const feedbacks = [];
let nextId = 1;

const getAll = () => feedbacks;

const add = (name, email, message) => {
  const entry = { id: nextId++, name, email, message };
  feedbacks.push(entry);
  return entry;
};

module.exports = { getAll, add };
