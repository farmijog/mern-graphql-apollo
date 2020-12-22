import React from "react";
import { makeStyles, AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button href="/" color="inherit">
                        Home
                    </Button>
                    <Typography className={classes.title}>
                        {/* Space between Home and Login */}
                    </Typography>
                    <Button href="/login" color="inherit">
                        Login
                    </Button>
                    <Button href="/register" color="inherit">
                        Register
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;