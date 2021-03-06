import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, GridColumn, GridRow, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/Auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

export default function Home() {
    const { user } = useContext(AuthContext);

    const { loading, data: { getPosts: posts } = {} } =
        useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <GridRow className="page-title">
                <h1>Recent seecrets</h1>
            </GridRow>
            <GridRow>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>loading</h1>
                ) : (
                    <Transition.Group>
                        {posts &&
                            posts.map((post) => (
                                <GridColumn
                                    key={post.id}
                                    style={{ marginBottom: 20 }}
                                >
                                    <PostCard post={post} />
                                </GridColumn>
                            ))}
                    </Transition.Group>
                )}
            </GridRow>
        </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;
