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

function DeleteButton({ postId, callback }) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = () => {
        setOpenDialog(false);
    }

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
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
            postId
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
                    <Typography>¿Seguro que desea eliminar este post?</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={deletePost} color="primary">
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

export default DeleteButton;


