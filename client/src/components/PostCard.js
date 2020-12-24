import React, { useContext } from "react";
import { 
    makeStyles, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography
} from "@material-ui/core";
import { QuestionAnswerOutlined } from "@material-ui/icons";
import { red, blue } from "@material-ui/core/colors";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    },
    media: {
        height: 0,
        paddingTop: "56.25%"
    },
    avatar: {
        backgroundColor: red[500]
    },
    deleteIcon: {
        color: red[500]
    },
    likeIcon: {
        color: red[500]
    },
    commentIcon: {
        color: blue[500]
    }
}));

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) {
     
    const classes = useStyles();

    const { user } = useContext(AuthContext);

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} >
                            {username.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={username}
                    subheader={moment(createdAt).fromNow(true)}
                />
                <CardContent>
                    <Typography>
                        {body}
                    </Typography>    
                </CardContent>  
                <CardActions disableSpacing className="card-actions" >
                    <LikeButton user={user} post={{ id, likes, likeCount }} />
                    <Typography>{likeCount}</Typography>
                    <IconButton href={`/posts/${id}`}>
                        <QuestionAnswerOutlined className={classes.commentIcon} />                        
                    </IconButton>
                    <Typography>{commentCount}</Typography>
                    {user && user.username === username && (
                        <DeleteButton postId={id} /> 
                    )}
                </CardActions>     
            </Card>
        </div>
    )
}

export default PostCard;
