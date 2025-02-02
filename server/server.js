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
    // setTimeout(() => {
    //     res.status(200).jsonp(users);
    // }, 2000);
    res.status(200).jsonp(users);

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
//Маршрут для получения корневых комментариев поста по id
server.get('/comments/post/:postId', (req, res, next) => {
    const postId = req.params.postId;
    const limit = parseInt(req.query._limit, 10);
    const page = parseInt(req.query._page, 10);
    let comments = [...router.db.getState().comments.filter((comment) => comment.postId == postId && comment.parentId == 0)];
    const rootCommentCount = Object.keys(comments).length;
    if (page == 1 && limit == 2) {
        comments = comments.slice(0, 2);
    } else {
        comments = comments.slice((page - 1) * limit, page * limit); //15-20
    }
    comments.forEach((comment) => {
        const child = router.db.getState().comments.filter((childComment) => childComment.postId == postId && childComment.parentId == comment.id);
        if (child[0] != null) {
            comment.children = [];
            comment.children.push(child[0]);
            comment.childCount = Object.keys(child).length;
        }
    });
    res.status(200).jsonp({ comments: comments, totalCount: rootCommentCount });
    comments = [];
});

// // Маршрут для фильтрации корневых комментариев по postId
// server.get('/comments/post/:postId/root', (req, res, next) => {
//     const postId = req.params.postId;

//     const filteredComments = router.db.getState().comments.filter((comment) => comment.postId == postId);
//     const commentsById = router.db
//         .getState()
//         .comments.filter((comment) => comment.postId == postId && comment.parentId == 0);

//     commentsById.forEach((comment) => {
//         const child = filteredComments.filter((childComment) => {
//             return childComment.postId == postId && childComment.parentId == comment.id;
//         });
//         if (child[0] != null) {
//             comment.children = [];
//             comment.children.push(child[0]);
//             comment.childCount = Object.keys(child).length;
//         }
//     });
//     // } else if (query === 'child') {
//     //     commentsById = [];
//     //     const comments = router.db.getState().comments.filter((comment) => comment.postId == postId );
//     //     console.log(comments);
//     //     commentsById = buildTree(comments);
//     //}
//     res.status(200).jsonp({ comments: commentsById });
// });

// Маршрут для фильтрации дочерних комментариев по postId
server.get('/comments/post/:postId/child', (req, res, next) => {
    const postId = parseInt(req.params.postId, 10);
    const commentId = parseInt(req.query.commentId, 10);
    console.log(commentId, postId);
    const filteredComments = router.db.getState().comments.filter((comment) => comment.postId == postId && comment.parentId == commentId);

    const commentsById = {};

    filteredComments.forEach((comment) => {
        const children = router.db.getState().comments.filter((childComment) => childComment.postId == postId && childComment.parentId == comment.id);
        comment.children = [children[0]];
        comment.childCount = Object.keys(children).length;
    });
    console.log(filteredComments);
    res.status(200).jsonp({ comments: filteredComments });
});

// Функция для построения дерева комментариев
const buildTree = (comments) => {
    // Создаем объект для хранения всех комментариев по id
    const commentsById = {};

    // Проходимся по всем комментариям и добавляем их в объект
    comments.forEach((comment) => {
        commentsById[comment.id] = comment;
        delete comment.children;
    });

    // Проходимся еще раз по комментариям и собираем дерево
    comments.forEach((comment, index) => {
        if (comment.parentId && commentsById[comment.parentId]) {
            // Если комментарий имеет родителя, то добавляем его в массив children родителя
            commentsById[comment.parentId].children = commentsById[comment.parentId].children || [];
            commentsById[comment.parentId].children.push(comment);
            commentsById[comment.parentId].childCount = index;
        }
    });

    // Возвращаем только те комментарии, у которых  родитель = commentId
    return comments.filter((comment) => !comment.Id);
};

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server OK');
});
