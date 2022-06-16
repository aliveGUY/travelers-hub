import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinMission } from '../redux/missions/Redux-Missions';

export default function Missions() {
  const missions = useSelector((state) => state.missions);
  const dispatch = useDispatch();
  return (
    <div className="Missions-wrapper">
      <table className="Missions-table">
        <tbody>
          <tr>
            <th>Mission</th>
            <th className="Missions-description">Description</th>
            <th>Status</th>
            <th>Interaction</th>
          </tr>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <th>{mission.mission_name}</th>
              <th className="Missions-description">{mission.description}</th>
              <th>
                <p className={mission.reserved ? 'Mission-active' : 'Mission-incative'}>
                  {mission.reserved ? 'Active Member' : 'NOT A MEMBER'}
                </p>
              </th>
              <th>
                <button
                  className={`Mission-button ${mission.reserved ? 'reserved' : ''}`}
                  type="button"
                  onClick={() => {
                    dispatch(joinMission(mission.mission_id));
                  }}
                >
                  {mission.reserved ? 'Leave Mission' : 'Join Mission'}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
