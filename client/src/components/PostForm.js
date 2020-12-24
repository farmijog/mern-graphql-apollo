import React from "react";
import gql from "graphql-tag";
import { TextField, Button, Typography } from "@material-ui/core";
import { useMutation  } from "@apollo/client";


import { useForm } from "../utils/hooks";
import { FETCH_POST_QUERY } from "../utils/graphql";

function PostForm() {

    const { values, onChange, onSubmit } = useForm(createPostCallBack, {
        body: ""
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            // const data = proxy.readQuery({
            //     query: FETCH_POST_QUERY
            // });
            // proxy.writeQuery({ query: FETCH_POST_QUERY, data: { getPosts: [result.data.createPost, ...data.getPosts], }, });
            values.body = "";
        },
        refetchQueries: [{ query: FETCH_POST_QUERY }]
    });

    function createPostCallBack(){
        createPost();
    }

    return (
        <div>
            <form noValidate onSubmit={onSubmit}>
                <Typography variant="h6" className="grid-item-post-title">
                    Create a post:
                </Typography>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder="What's on your mind?"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                    style={{ paddingBottom: 10 }}
                    error={error ? true : false}
                />
                <Button
                    className="post-button-home"
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    style={{ borderRadius: 50, height: 40 }}
                >
                    Post
                </Button>
            </form>
            {error && (
                <div>
                    {error.graphQLErrors[0].message} 
                </div>
            )}
        </div>
    )
}

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id 
            body 
            createdAt 
            username 
            likes {
                id 
                username 
                createdAt
            }
            likeCount
            comments {
                id 
                body 
                username 
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;

