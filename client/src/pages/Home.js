import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import PostCard from "../components/PostCard";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
    }
}));

function Home() {

    const { loading, data } = useQuery(FETCH_POST_QUERY);

    const classes = useStyles();

    return (
        <div>
            <h1>
                Home
            </h1>
            <div className={classes.root}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    {loading ? (
                        <h1>loading posts...</h1>
                    ) : (
                        data.getPosts && data.getPosts.map(post => (
                            <Grid item xs={12} sm={10} md={8} lg={8} xl={8} key={post.id} className="grid-item">
                                <PostCard post={post}  /> 
                            </Grid>
                        ))
                    )}
                </Grid>
            </div>
        </div>
    )
}

const FETCH_POST_QUERY = gql`
    {
        getPosts{
            id body createdAt username likeCount
            likes {
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`;


export default Home;