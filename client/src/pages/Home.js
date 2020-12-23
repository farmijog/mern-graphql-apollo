import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, makeStyles } from "@material-ui/core";

import { AuthContext } from "../context/auth"
import { FETCH_POST_QUERY } from "../utils/graphql";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0,
    }
}));

function Home() {

    const { loading, data } = useQuery(FETCH_POST_QUERY);

    const classes = useStyles();

    const { user } = useContext(AuthContext);

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
                    {user && (
                        <Grid item xs={12} sm={10} md={8} lg={8} xl={8} className="grid-item-post">
                            <PostForm />
                        </Grid>
                    )}
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




export default Home;