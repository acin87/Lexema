import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { Badge } from '@mui/material';
import { forwardRef } from 'react';
import { PostTypes } from '../../app/reducers/posts/postTypes';
import styles from './Post.module.css';

const post = forwardRef<HTMLDivElement, PostTypes>((post: PostTypes, ref) => (
    <div className={styles.postCard} ref={ref}>
        <div className={styles.postTitle}>
            <div className={styles.postAutor}>
                {post.id} --- {post.title}
            </div>
            <div className={styles.postReactions}>
                <Badge badgeContent={post.reactions.likes} max={9999}>
                    <FavoriteBorderOutlinedIcon />
                </Badge>
                <Badge badgeContent={post.reactions.dislikes} max={9999}>
                    <ReplyAllOutlinedIcon />
                </Badge>
                <Badge badgeContent={post.userId} max={9999}>
                    <TextsmsOutlinedIcon />
                </Badge>
            </div>
        </div>
        <div className={styles.postBody}>{post.body}</div>
        <div className={styles.postComments}>aaaaa</div>
    </div>
));
export default post;
