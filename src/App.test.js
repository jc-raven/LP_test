import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders header text', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/toast exercise/i);
  expect(linkElement).toBeInTheDocument();
});

test('content header text to be initially be loading', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/loading.../i);
  expect(linkElement).toBeInTheDocument();
});

test('header to contain the new submission button', () => {
  const { getByText } = render(<App />);
  const btn = getByText(/new submission/i);
  expect(btn).toBeInTheDocument();
});

test.todo('clicking new submission shows a notification');

test.todo('clicking like on a notification updates header status to saving'); 

test.todo('clicking close dismisses it');

test.todo('when a notification is liked, it is added to the liked list');

test.todo('can load liked submissions after saving one');