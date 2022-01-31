import React from 'react';
import { render, screen } from '@testing-library/react';
import wait from 'waait';

import { FETCH_POSTS_QUERY } from '../pages/Home';
import PostCard from './PostCard';
import { MemoryRouter, Router, Routes } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import { iterateObserversSafely } from '@apollo/client/utilities';

const mockPostsData = {
    id: '1',
    body: 'This is a test',
    createdAt: '2022-01-17T01:15:10.424Z',
    username: 'John',
    likeCount: '1',
    likes: [
        {
            username: '2',
        },
    ],
    commentCount: '1',
    comments: [
        {
            id: '2',
            username: 'username2',
            createdAt: 'commentdate',
            body: 'bodycomment',
        },
    ],
};

const mockedUser = {
    username: 'username',
    password: 'password',
    email: 'email@email.com',
    createdAt: 'date',
};

describe('renders posts data', () => {
    const renderComponent = () =>
        render(
            <AuthContext.Provider value={{ user: mockedUser }}>
                <MemoryRouter>
                    <PostCard post={mockPostsData} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

    it('should render the post comment properly', () => {
        renderComponent();

        expect(screen.getByText(mockPostsData.username));
        expect(screen.getByText(mockPostsData.body));
    });
});
