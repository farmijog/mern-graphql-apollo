import React from "react";
import { 
    makeStyles, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography,
} from "@material-ui/core";
import { FavoriteBorderOutlined, QuestionAnswerOutlined } from "@material-ui/icons";
import { red, blue } from "@material-ui/core/colors";
import moment from "moment";

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
    likeIcon: {
        color: red[500]
    },
    commentIcon: {
        color: blue[500]
    }
}));

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) {
     
    const classes = useStyles();

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
                    subheader={moment(createdAt).fromNow()}
                />
                <CardContent>
                    <Typography>
                        {body}
                    </Typography>    
                </CardContent>  
                <CardActions disableSpacing>
                    <IconButton aria-label="like">
                        <FavoriteBorderOutlined className={classes.likeIcon} />
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                    <IconButton disableSpacing href={`/post/${id}`}>
                        <QuestionAnswerOutlined className={classes.commentIcon} />                        
                    </IconButton>
                    <Typography>{commentCount}</Typography>
                </CardActions>     
            </Card>
        </div>
    )
}

export default PostCard;
