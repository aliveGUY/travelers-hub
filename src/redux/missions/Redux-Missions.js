import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

const url = 'https://api.spacexdata.com/v3/missions';
const axios = require('axios');

export const loadMissions = createAsyncThunk('FETCH_MISSIONS', async () => {
  const response = await axios.get(url);
  const data = response.data.map((mission) => ({
    mission_id: mission.mission_id,
    mission_name: mission.mission_name,
    description: mission.description,
  }));
  return data;
});

const missionSlice = createSlice({
  name: 'Missions',
  initialState: [
    {
      mission_id: 0,
      mission_name: 'No Missions Yet',
      description: 'N/A',
    },
  ],
  reducers: {
    joinMission: (state, action) => {
      for (let i = 0; i < current(state).length; i += 1) {
        if (action.payload === state[i].mission_id) {
          /* eslint-disable */
          state[i] = { ...state[i], reserved: !state[i].reserved };
          /* eslint-enable */
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMissions.pending, (state, action) => [
      {
        mission_name: 'Loading',
        description: action.type,
        mission_id: 0,
      },
    ]);
    builder.addCase(loadMissions.fulfilled, (state, action) => [
      ...action.payload,
    ]);
  },
});

export const { joinMission } = missionSlice.actions;
export default missionSlice.reducer;
