import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { Avatar, Button, Grid, Card, CardHeader, CardContent, CardActions, Typography, 
    IconButton, makeStyles, TextField  } from "@material-ui/core";
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
    const [comment, setComment] = useState("");
    const commentInputRef = useRef(null);

    const { data: { getPost: postDetail } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        } 
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment("");
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })

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
                    <Card className={classes.root} style={{ marginTop: 20 }}>
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
                    {user && (
                        <Card style={{marginTop: 20}}>
                            <form noValidate>
                                <TextField 
                                    fullWidth
                                    variant="outlined"
                                    placeholder="post a comment..."
                                    name="comment"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    ref={commentInputRef}
                                />
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    disabled={comment.trim() === ""}
                                    style={{ borderRadius: 50, height: 40 }}
                                    onClick={submitComment}
                                >
                                    reply
                                </Button>
                            </form>
                        </Card>
                    )}
                    {comments.map(comment => (
                        <Card key={comment.id} style={{marginTop: 20}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar} >
                                        {comment.username.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                                title={comment.username}
                                subheader={moment(comment.createdAt).fromNow(true)}
                            />
                            <CardContent>
                                <Typography>
                                    {comment.body}
                                </Typography>
                                
                            </CardContent>
                            <CardActions>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId={id} commentId={comment.id} />
                                )}
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        )
    }

    return postMarkup;

}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $body: String!) {
        createComment(postId: $postId body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

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