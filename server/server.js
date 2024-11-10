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
    setTimeout(() => {
        res.status(200).jsonp(users);
    }, 2000);
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

server.get('/comments/post/:postId', (req, res, next) => {
    const postId = req.params.postId;
    const limit = req.query._limit;
    const page = req.query._page;
    let comments = [
        ...router.db.getState().comments.filter((comment) => comment.postId == postId && comment.parentId == 0),
    ];
    const rootCommentCount = Object.keys(comments).length;
    if (limit != undefined && page != undefined) {
        comments = comments.slice((Number(page) -1 )* Number(limit) , Number(page) * Number(limit)); //2 - 8
    
        console.log(comments.length);
        comments = buildTree(comments);
    } else {
        comments = comments.slice(0, 2);

        comments.forEach((comment) => {
            const child = router.db
                .getState()
                .comments.filter(
                    (childComment) => childComment.postId == postId && childComment.parentId == comment.id,
                );
            if (child[0] != null) {
                comment.children = [];
                comment.children.push(child[0]);
                comment.childCount = Object.keys(child).length;
            }
        });
    }

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

// // Маршрут для фильтрации дочерних комментариев по postId
// server.get('/comments/post/:postId/child', (req, res, next) => {
//     const postId = req.params.postId;
//     const commentId = req.query.commentId;

//     const filteredComments = router.db
//         .getState()
//         .comments.filter(
//             (comment) => comment.postId == postId && (comment.parentId == commentId || comment.id == commentId),
//         );
//     const commentsById = buildTree(filteredComments, commentId);
//     res.status(200).jsonp({ comments: commentsById });
// });

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

    // Возвращаем только те комментарии, у которых нет родителей (корневые)
    return comments.filter((comment) => !comment.parentId);
};

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server OK');
});
