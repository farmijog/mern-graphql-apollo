import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    likeIcon: {
        color: red[500]
    }
}));

function LikeButton({ user, post: { id, likes, likeCount } }) {

    const classes = useStyles();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    const likeButton = user ? (
        liked ? (
            <IconButton aria-label="like" onClick={likePost}>
                <FavoriteOutlined className={classes.likeIcon} />    
            </IconButton>
        ) : (
            <IconButton aria-label="like" onClick={likePost} >
                <FavoriteBorderOutlined className={classes.likeIcon} />    
            </IconButton>
        )
    ) : (
        <IconButton href="/login" aria-label="like">
            <FavoriteBorderOutlined className={classes.likeIcon} />        
        </IconButton>
    )

    return (
        <div >
            {likeButton}
        </div>
    );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;