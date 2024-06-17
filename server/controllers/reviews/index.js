const { addComment } = require("./comment-event");
const { likeComment } = require("./like-event-comment");

const { addLike } = require("./like-event");

module.exports = {
  addComment,
  likeComment,
  addLike,
};
