import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux';
import reserveMission from '../redux/missions/Redux-Missions';

export default function Missions() {
  const missions = useSelector((state) => state.missions);
  const dispatch = useDispatch();
  return (
    <div className="Missions-wrapper">
      <Table striped bordered hover>
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
              <th>{mission.description}</th>
              <th className="vert">
                <Badge bg={mission.reserved ? 'info' : 'secondary'}>
                  {mission.reserved ? 'Active Member' : 'NOT A MEMBER'}
                </Badge>
              </th>
              <th className="vert">
                <Button
                  variant={`${mission.reserved ? 'outline-danger' : 'outline-secondary'}`}
                  className="m-3"
                  type="button"
                  onClick={() => {
                    dispatch(reserveMission(mission.mission_id));
                  }}
                >
                  {mission.reserved ? 'Leave Mission' : 'Join Mission'}
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
