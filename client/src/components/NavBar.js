import React, { useContext } from "react";
import { makeStyles, AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import { AuthContext } from "../context/auth";

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
    const { user, logout } = useContext(AuthContext);

    const navBar = user ? (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button href="/" color="inherit">
                        {user.username}
                    </Button>
                    <Typography className={classes.title}>
                        {/* Space between Home and Login */}
                    </Typography>
                    <Button onClick={logout} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    ) : (
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

    return (
        navBar
    )
}

export default NavBar;