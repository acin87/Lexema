import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShareIcon from '@mui/icons-material/Share';
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetchCommentByIdQuery } from '../../app/reducers/posts/postsApi ';
import { PostTypes } from '../../app/reducers/posts/postTypes';
import { useGetUserByIdQuery } from '../../app/reducers/user/userApi';

export const PostView = forwardRef<HTMLDivElement, PostTypes>((post: PostTypes, ref) => {
    const { data: userData } = useGetUserByIdQuery({ id: post.userId });
    const { data: comment } = useFetchCommentByIdQuery({ id: post.id });

    const comments = comment?.comments.map((key, index) => {
        if (index > 1) {
            return '';
        }
        return (
            <Box sx={{ display: 'flex', padding: '1rem' }} id={`${post.id}-${index}`} key={index}>
                <Box>
                    <Avatar src="../../src/assets/icons/avatar.jpg"></Avatar>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '1.25rem' }}>
                    <Typography variant="body2" component="span">
                        {key.user.fullName}
                    </Typography>
                    <Typography variant="body2" component="span">
                        {key.body}
                    </Typography>
                    <ButtonGroup variant="text" aria-label="Ui button group" size="small">
                        <Button sx={{ paddingLeft: 0 }}>Понравилось</Button>
                        <Button>Поделится</Button>
                        <Button>Перевести</Button>
                    </ButtonGroup>
                </Box>
            </Box>
        );
    });

    return (
        <Box ref={ref} className="post">
            <Card sx={{ width: '100%', height: 'calc(100% - 1rem)', paddingBottom: '1rem' }}>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="Avatar" src={userData?.image} />}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <NavLink style={{ textDecoration: 'none' }} to={`friends/user/${userData?.id}`}>
                            {userData?.firstName} {userData?.lastName}
                        </NavLink>
                    }
                    subheader={`User ID - ${post.id}`}
                ></CardHeader>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {post.body}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image="../../src/assets/images/1361476761_621333142.jpg"
                    alt="Paella dish"
                />
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <ButtonGroup
                        variant="text"
                        aria-label="Реакция друзей"
                        disableElevation
                        sx={{ marginLeft: '0.5rem' }}
                    >
                        <Button sx={{ paddingRight: '1rem' }}>
                            <FavoriteIcon />
                            <span style={{ marginLeft: '0.5rem' }}>{post.reactions.likes}</span>
                        </Button>
                        <Button sx={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                            <CommentOutlinedIcon />
                            <span style={{ marginLeft: '0.5rem' }}>22</span>
                        </Button>
                        <Button sx={{ paddingLeft: '1rem' }}>
                            <ShareIcon />
                            <span style={{ marginLeft: '0.5rem' }}>{post.reactions.dislikes}</span>
                        </Button>
                    </ButtonGroup>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title={`Посмотрели ${post.views} человек`}>
                            <RemoveRedEyeOutlinedIcon fontSize="small"></RemoveRedEyeOutlinedIcon>
                        </Tooltip>
                        <Typography variant="body2" component="span" sx={{ marginLeft: '0.5rem' }}>
                            {post.views}
                        </Typography>
                    </Box>
                </CardActions>
                <Divider />
                <Box>{comments}</Box>

                <Box sx={{ p: 2 }}>
                    <TextField
                        placeholder="Написать коментарий"
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CommentOutlinedIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                        size="small"
                    />
                </Box>
            </Card>
        </Box>
    );
});
