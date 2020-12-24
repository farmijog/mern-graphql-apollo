import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import {  
    Dialog, DialogActions, DialogTitle, IconButton, makeStyles,
    Button, Typography 
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { red  } from "@material-ui/core/colors";

import { FETCH_POST_QUERY } from "../utils/graphql";

const useStyles = makeStyles((theme) => ({
    deleteIcon: {
        color: red[500]
    }
}));

function DeleteButton({ postId, commentId, callback }) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = () => {
        setOpenDialog(false);
    }

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        refetchQueries: [{ query: FETCH_POST_QUERY }],
        update(proxy){
            setOpenDialog(false);
            // const data = proxy.readQuery({
            //     query: FETCH_POST_QUERY
            // });
            // data.getPosts = data.getPosts.filter(p => p.id !== postId);
            // proxy.writeQuery({ query: FETCH_POST_QUERY, data });
            if (callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    })
    return (
        <div>
            <IconButton onClick={() => setOpenDialog(true)}>
                <Delete className={classes.deleteIcon}/>
            </IconButton>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <Typography>¿Esta seguro?</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={deletePostOrComment} color="primary">
                        Si
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId commentId: $commentId){
            id
            comments {
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`;

export default DeleteButton;


