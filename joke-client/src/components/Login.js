import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Login(props) {
    const login = (credentials) => {
        axiosWithAuth()
          .post('/api/auth/login', credentials)
          .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.token);
            props.history.push('/jokes');
          })
          .catch(err => console.log(err.response));
      };

    return (
        <div className="login">
          <div className="form-container">
            <h2>Login</h2>
                <Formik
                initialValues={{ username: "", password: "" }}
                validate={values => {
                    let errors = {};
                    if (values.username === "") {
                    errors.username = "Username is required";
                    } else if (values.username.length < 2) {
                    errors.username = "Username must be 2 characters at minimum";
                    }
                    if (values.password === "") {
                    errors.password = "Password is required";
                    } else if (values.password.length < 3) {
                    errors.password = "Password must be 3 characters at minimum";
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    login({ username: values.username, password: values.password });
                    actions.setSubmitting(false);
                }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="username" placeholder="Username" />
                            <ErrorMessage
                                component="p"
                                name="username"
                                className="error"
                            />  
                            <Field type="password" name="password" placeholder="Password" />
                            <ErrorMessage
                                component="p"
                                name="password"
                                className="error"
                            />  
                            <div className="button-container">
                                <button 
                                    type="submit" 
                                    className="primary-button"
                                    disabled={isSubmitting}>
                                {isSubmitting ? "Please wait..." : "Log In"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
          </div>
        </div>
    )
};

export default Login;