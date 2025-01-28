import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { FC, Fragment, useState } from 'react';
import { CommentType } from '../../../app/reducers/comments/commntsType';
import { useGetUserByIdQuery } from '../../../app/reducers/user/userApi';
import { formatTimeAgo } from '../../../app/util/Utils';
import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';

type CommentProps = {
    comment: CommentType;
};

const Comment: FC<CommentProps> = ({ comment }) => {
    const { data: user } = useGetUserByIdQuery({ id: comment.user.id });
    const [expandArea, setExpandArea] = useState(false);

    const answerBtn = () => {
        setExpandArea(!expandArea);
    };

    return (
        <Fragment>
            <Card sx={{ boxShadow: 'none', width: '100%', paddingBottom: 0 }}>
                <CardHeader
                    sx={{ paddingBottom: 0 }}
                    avatar={<Avatar src={user?.image} />}
                    action={
                        <Fragment>
                            <Stack direction="row">
                                <Tooltip title="репост" placement="top">
                                    <IconButton>
                                        <ReplyIcon></ReplyIcon>
                                    </IconButton>
                                </Tooltip>

                                <IconButton aria-label="settings">
                                    <MoreVertOutlinedIcon />
                                </IconButton>
                            </Stack>
                        </Fragment>
                    }
                    title={
                        <Typography variant="body2" component="span">
                            {comment?.user?.fullName} id - {comment.id}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" component="div">
                            {formatTimeAgo(comment?.createdAt)}
                        </Typography>
                    }
                />
                <CardContent sx={{ p: '16px 20px 5px 20px', '&:last-child': { pb: 0 } }}>
                    <Typography variant="body2" component="div">
                        {comment.body}
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: 0 }} disableSpacing>
                    {!expandArea ? (
                        <Button sx={{ textTransform: 'lowercase', ml: '16px' }} size="small" onClick={answerBtn}>
                            ответить
                        </Button>
                    ) : (
                        <TextField
                            placeholder="Ваш ответ"
                            name="aswer-comments"
                            variant="outlined"
                            size="small"
                            sx={{ width: '100%', p: 2 }}
                            onBlur={() => setExpandArea(false)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CommentIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    )}
                </CardActions>
            </Card>
            <Divider variant="middle" />
        </Fragment>
    );
};

export default Comment;
