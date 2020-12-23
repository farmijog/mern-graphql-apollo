import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {  Button, CircularProgress, Link, Grid, TextField, Typography ,makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { useForm } from "../utils/hooks";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 0
    }
}));

function Register(props) {
    const classes = useStyles();
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
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
                    <Typography variant="h5" style={{ padding: 25 }}>Registrarse</Typography>
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
                            type="email"
                            variant="outlined"
                            label="Correo"
                            name="email"
                            value={values.email}
                            onChange={onChange}
                            error={errors.email ? true : false}
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
                    <Grid item xs={12} sm={7} md={5} lg={4} xl={4} className="grid-item">
                        <TextField 
                            fullWidth
                            size="small"
                            type="password"
                            variant="outlined"
                            label="Confirmar Contrase&ntilde;a"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={onChange}
                            error={errors.confirmPassword ? true : false}
                        />
                    </Grid>
                    <Grid item xs={8} sm={5} md={4} lg={3} xl={3} className="grid-item" style={{ paddingTop: 20 }}> 
                        <Button type="submit" variant="contained" color="primary" style={{ borderRadius: 50, height: 40 }} fullWidth>
                            {loading ? <CircularProgress style={{ color: "white", position: "absolute" }} /> : "Registrarse"}
                        </Button>
                        <Typography style={{ paddingTop: 10 }}>
                            ¿Ya tienes una cuenta?
                            <Link href="/login"> Inicia Sesi&oacute;n</Link>
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`;

export default Register;
