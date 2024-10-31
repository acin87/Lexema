import jsonServer from 'json-server';
import path from 'path';

const __dirname = path.resolve();

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '/server/db.json'));
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Маршрут для получения всех постов
server.get('/posts', (req, res) => {
    const _limit = Number(req.query._limit || 10);
    const _start = Number(req.query._start || 0);
    const posts = {
        posts: [...router.db.getState().posts.slice(_start, _start + _limit)],
    };
    res.status(200).jsonp(posts);
});

// Маршрут для получения всех пользователей
server.get('/users', (req, res) => {
    const _limit = Number(req.query._limit || 10);
    const _start = Number(req.query._start || 0);
    const users = {
        users: [...router.db.getState().users.slice(_start, _start + _limit)],
    };
    setTimeout(()=>{
        res.status(200).jsonp(users);
    },2000)
    
});

// Маршрут для получения конкретного поста по id
server.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id); // Преобразуем строку в число
    const post = router.db.getState().posts.find((post) => post.id == id);
    if (!post) {
        return res.status(404).send({ error: 'Пост не найден' });
    }
    res.status(200).jsonp(post);
});

// Маршрут для фильтрации комментариев по postId
server.get('/comments/post/:postId', (req, res, next) => {
    const postId = req.params.postId;
    const comments = {
        comments: [...router.db.getState().comments.filter((comment) => comment.postId == postId)],
    };
    setTimeout(() => {
        res.status(200).jsonp(comments);
    }, 2000);
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server OK');
});
