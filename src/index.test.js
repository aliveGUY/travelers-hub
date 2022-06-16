import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import Missions from './components/Missions';

const mockStore = configureStore([]);

describe('Missions testing', () => {
  const mission = [
    {
      mission_id: 0,
      mission_name: 'Mission Name',
      description: 'Mission Description',
    },
  ];
  test('REnder Missions', () => {
    const store = mockStore({
      missions: mission,
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Missions />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Should dispatch MissionReserve action', () => {
    const store = mockStore({
      missions: mission,
    });
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Join Mission'));
    const firedAction = store.getActions();
    expect(...firedAction).toEqual({
      payload: 0,
      type: 'Missions/joinMission',
    });
  });
});
