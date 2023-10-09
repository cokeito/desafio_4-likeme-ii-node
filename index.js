const express = require('express')
const morgan = require('morgan-body');
const cors = require('cors')

const { getPosts, createPost, updatePostLikes, deletePost } = require('./queries.js')
const app = express();
morgan(app);

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

app.get('/posts', async (req, res) => {

  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


});

app.post('/posts', async (req, res) => {

  try {
    const { titulo, img, descripcion } = req.body;
    console.log(req.body);
    const insertPost = await createPost(titulo, img, descripcion)
    res.status(201).json(insertPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})

app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await updatePostLikes(id);
    res.status(200).json(updatePost);
  } catch {
    res.status(500).json({ error: error.message });
  }

});

app.delete('/posts/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const removePost = await deletePost(id);
    res.json(removePost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})




