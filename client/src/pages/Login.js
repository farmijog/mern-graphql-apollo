import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {  Button, CircularProgress, Grid, Typography, TextField, makeStyles, Link } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useForm } from "../utils/hooks";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0
    }
}));

function Login(props) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
        username: "",
        password: ""
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallBack() {
        loginUser();
    }

    return (
        <div>
        <form onSubmit={onSubmit} noValidate>
            <div className={classes.root}>
                <Grid 
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant="h5" style={{ padding: 25 }}>Iniciar Sesi&oacute;n</Typography>
                    <Grid item xs={12} sm={7} md={5} lg={4} xl={4}  className="grid-item">
                        <TextField  
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Usuario"
                            name="username"
                            value={values.username}
                            onChange={onChange}
                            error={errors.username ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7} md={5} lg={4} xl={4}  className="grid-item">
                        <TextField 
                            fullWidth
                            size="small"
                            type="password"
                            variant="outlined"
                            label="Contrase&ntilde;a"
                            name="password"
                            value={values.password}
                            onChange={onChange}
                            error={errors.password ? true : false}
                        />
                    </Grid>
                    <Grid item xs={8} sm={5} md={4} lg={3} xl={3} className="grid-item" style={{ paddingTop: 20 }}> 
                        <Button type="submit" variant="contained" color="primary" style={{ borderRadius: 50, height: 40 }} fullWidth>
                            {loading ? <CircularProgress style={{ color: "white", position: "absolute" }} /> : "Iniciar Sesion"}
                        </Button>
                        <Typography style={{ paddingTop: 10 }}>
                            ¿No tienes una cuenta?
                            <Link href="/register"> Reg&iacute;strate</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5} lg={4} xl={4} className="grid-item">
                    {Object.keys(errors).length > 0 && (
                        <div>
                            <Alert severity="error">
                                {Object.values(errors).map(value => (
                                    <AlertTitle key={value}>* {value} </AlertTitle>
                                ))}
                            </Alert>
                        </div>
                    )}                
                    </Grid>
                </Grid>
            </div>
        </form>
        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(username: $username password: $password) {
            id email username createdAt token
        }
    }
`;

export default Login;

