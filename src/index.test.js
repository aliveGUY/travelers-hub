import axios from 'axios';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { loadMissions } from './redux/missions/Redux-Missions';
import Missions from './components/Missions';
import store from './redux/config';

describe('Fetching Tests', () => {
  it('Fetching Missions', async () => {
    axios.post = jest.fn(() => Promise.resolve());
    const dispatch = jest.fn();

    await loadMissions()(dispatch);
    expect(dispatch.mock.calls[1][0].type).toEqual('FETCH_MISSIONS/fulfilled');
  });

  it('Render Missions', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    expect(await findByText('Mission')).toBeInTheDocument();
  });
});
