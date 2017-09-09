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
      'INSERT into posts values (?, ?, ?, ?, ?)',
      [
        post.id,
        post.title,
        post.content,
        post.created,
        post.updated
      ]
    );
  },
  deletePost: function(id, callback) {
    return db.query('DELETE from posts WHERE id=?', [id], callback);
  },
  updatePost: function(id, post, callback) {
    return db.query(
      'UPDATE posts set title=? content=? updated=? WHERE id=?',
      [
        post.title,
        post.content,
        post.updaetd,
        id
      ]
    );
  }
};

module.export = Post;
