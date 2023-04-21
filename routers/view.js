const { Router } = require('express')
const route = Router()
const init = require('../config/database');
var cf = null,
    genre = null,
    posts = null;
(async() => {
    cf = await init.getDatabase('config', 'id = 1');
    genre = await init.orderDatabase('category', 'id >= 1 ORDER BY id DESC');
    posts = await init.orderDatabase('post', 'id >= 1 ORDER BY id DESC LIMIT 10');
})();

route.get('/', async(req, res) => {
    res.render('index', { cf, genre, posts });
});
route.get('/posts/:slug', async(req, res) => {
    const slug = req.params.slug;
    const details = await init.getDatabase('post', `slug = '${slug}'`);
    const genres = await init.getDatabase('category', `slug = '${details.category}'`);
    const postURL = `${cf.url}/posts/${details.slug}`;
    res.render('viewPost', { cf, genre, posts, details, genres, postURL });
});
route.get('/category/:slug', async(req, res) => {
    const slug = req.params.slug;
    const list_post = await init.orderDatabase('post', `category = '${slug}' ORDER BY id DESC LIMIT 10`);
    const cate = await init.getDatabase('category', `slug = '${slug}'`);
    res.render('category', { cf, genre, posts, list_post, cate });
});

module.exports = route