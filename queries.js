const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'amazzon.pg',
  port: 5432,
  database: 'likeme',
  allowExitOnIdle: true
})

const getPosts = async (req, res) => {
  const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
  return result.rows;
}

const createPost = async (titulo, url, descripcion) => {
  const result = await pool.query(
    'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)',
    [titulo, url, descripcion, 0]
  );
  return result.rows;
}

const updatePostLikes = async (id) => {
  const result = await pool.query(
    'UPDATE posts SET likes = likes + 1 WHERE id = $1',
    [id]
  );
  return result.rows;
}

const deletePost = async (id) => {

  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1',
    [id]
  );
  return result.rows;
}

module.exports = { getPosts, createPost, updatePostLikes, deletePost }