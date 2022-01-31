import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuBar from './MenuBar';
import { BrowserRouter } from 'react-router-dom';

describe('MenuBar', () => {
    const renderComponent = () =>
        render(
            <BrowserRouter>
                <MenuBar />
            </BrowserRouter>
        );

    it("should on initial render, when there's no user, the login and register buttons appear", () => {
        renderComponent();

        expect(screen.getByRole('link', { name: /register/i }));
        expect(screen.getByRole('link', { name: /login/i }));
    });

    it('should match snapshot', () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
