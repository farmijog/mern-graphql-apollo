import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, ThemeProvider, CssBaseline, createMuiTheme } from "@material-ui/core";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const theme = createMuiTheme({
    typography: {
        fontFamily: "Google Sans, Arial"
    }
})

function App(){
    return (
        <AuthProvider>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <NavBar />
                    <Container maxWidth="lg">
                        <Route exact path="/" component={Home} />
                        <AuthRoute exact path="/login" component={Login} />
                        <AuthRoute exact path="/register" component={Register} />
                    </Container>
                </ThemeProvider>
            </Router>
        </AuthProvider>
    );
}

export default App;