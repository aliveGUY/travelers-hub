import axios from 'axios';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render as rtlRender, screen } from '@testing-library/react';
import reducer, { joinMission } from './redux/missions/Redux-Missions';
import App from './App';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { user: reducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ element }) {
    return <Provider store={store}>{element}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
const handlers = [
  rest.get('/api/user', (req, res, ctx) =>
    res(ctx.json('John Smith'), ctx.delay(150))
  ),
];
const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('Should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual([
    {
      description: 'N/A',
      mission_id: 0,
      mission_name: 'No Missions Yet',
    },
  ]);
});

test('should handle a mission being reserved', async () => {
  render(<App />);
  expect(screen.getByText(/Mission/i)).toBeInTheDocument();
});
