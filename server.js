const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let blogPosts = [
    {
        id: 1,
        title: 'Blog Post Title',
        date: 'July 22, 2024',
        author: 'Author',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in nibh magna. Fusce ac dui in dui vehicula tincidunt. Nullam vulputate, metus vitae facilisis posuere, purus sapien ullamcorper sem, eu varius ante arcu a augue.'
    },
    {
        id: 2,
        title: 'Another Blog Post',
        date: 'July 21, 2024',
        author: 'Author',
        content: 'Phasellus sit amet nisi ut lectus vehicula sodales. Nullam fringilla massa non justo tincidunt, vitae interdum dui commodo. Curabitur malesuada semper tortor nec vulputate.'
    }
];

// Get all blog posts
app.get('/api/posts', (req, res) => {
    res.json(blogPosts);
});

// Get a single blog post by ID
app.get('/api/posts/:id', (req, res) => {
    const post = blogPosts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
});

// Add a new blog post
app.post('/api/posts', (req, res) => {
    const newPost = {
        id: blogPosts.length + 1,
        title: req.body.title,
        date: req.body.date,
        author: req.body.author,
        content: req.body.content
    };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
});

// Update a blog post
app.put('/api/posts/:id', (req, res) => {
    const post = blogPosts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).send('Post not found');

    post.title = req.body.title;
    post.date = req.body.date;
    post.author = req.body.author;
    post.content = req.body.content;

    res.json(post);
});

// Delete a blog post
app.delete('/api/posts/:id', (req, res) => {
    const postIndex = blogPosts.findIndex(p => p.id == req.params.id);
    if (postIndex === -1) return res.status(404).send('Post not found');

    const deletedPost = blogPosts.splice(postIndex, 1);
    res.json(deletedPost);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
