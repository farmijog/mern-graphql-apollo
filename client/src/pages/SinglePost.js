import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Avatar, Grid, Card, CardHeader, CardContent, CardActions, Typography, IconButton, makeStyles  } from "@material-ui/core";
import { QuestionAnswerOutlined } from "@material-ui/icons";
import { red, blue } from "@material-ui/core/colors";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";


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

function SinglePost(props) {
    const classes = useStyles();

    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    console.log(postId);
    const { data: { getPost: postDetail } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        } 
    });

    function deletePostCallback() {
        props.history.push("/");
    }

    let postMarkup;
    if (!postDetail) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = postDetail;
        postMarkup = (
            <Grid container direction="column" justify="center" alignItems="center" spacing={3} >
                <Grid item xs={12} sm={10} md={8} lg={8} xl={8} className="grid-item">
                    <Card className={classes.root}>
                        <CardHeader  
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
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
                        <CardActions disableSpacing className="card-actions">
                            <LikeButton user={user} post={{ id, likes, likeCount }} />
                            <Typography>{likeCount}</Typography>
                            <IconButton onClick={() => console.log("comment on single post")} >
                               <QuestionAnswerOutlined className={classes.commentIcon} /> 
                            </IconButton>
                            <Typography> {commentCount} </Typography>
                            {user && user.username === username && (
                                <DeleteButton postId={id} callback={deletePostCallback}  />
                            )}
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    return postMarkup;

}

const FETCH_POST_QUERY = gql`
    query getPost($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default SinglePost;