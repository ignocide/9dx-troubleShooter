const db = require('../lib/mysql');

const Post = {
  getAllPosts: function(callback) {
    return db.query('SELECT * from posts', callback);
  },
  getPostById: function(id, callback) {
    return db.query('SELECT * from posts WHERE id=?', [id], callback);
  },
  addPost: function(post, callback) {
    return db.query(
      'INSERT into posts values (DEFAULT, ?, ?, ?, ?, ?)',
      [
        post.title,
        post.content,
        post.created,
        post.updated,
        post.user_id
      ],
      callback
    );
  },
  deletePost: function(id, callback) {
    return db.query('DELETE from posts WHERE id=?', [id], callback);
  },
  updatePost: function(id, post, callback) {
    const currentTime = (new Date()).getTime();
    return db.query(
      'UPDATE posts SET title=?, content=?, updated=? WHERE id=?',
      [
        post.title,
        post.content,
        currentTime,
        id
      ],
      callback
    );
  }
};

module.exports = Post;
