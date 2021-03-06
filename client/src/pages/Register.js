import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';

import { AuthContext, AuthProvider } from '../context/Auth';
import { useForm } from '../utils/Hooks';

export default function Register() {
    const context = useContext(AuthContext);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values,
    });

    // addUser() needs to be inside a function because of hoisting
    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container" className={loading ? 'loading' : ''}>
            <Form onSubmit={onSubmit} noValidate error>
                <h1>Register</h1>
                <Form.Field>
                    <Form.Input
                        label="Username"
                        placeholder="Username..."
                        name="username"
                        type="text"
                        value={values.username}
                        error={errors.username ? true : false}
                        onChange={onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        label="Email"
                        placeholder="Email..."
                        name="email"
                        type="email"
                        value={values.email}
                        error={errors.email ? true : false}
                        onChange={onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        type="password"
                        value={values.password}
                        error={errors.password ? true : false}
                        onChange={onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        label="Confirm Password"
                        placeholder="Confirm Password..."
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        onChange={onChange}
                    />
                </Form.Field>
                <Button type="submit" primary>
                    Submit
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='"ui error message'>
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
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
            id
            email
            username
            createdAt
            token
        }
    }
`;
