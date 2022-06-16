import React from 'react';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

export default function MyProfile() {
  const data = useSelector((state) => state.missions);
  const missions = data.filter((mission) => mission.reserved);
  const reservedRockets = useSelector((state) => state.rockets).filter((rocket) => rocket.reserved);
  return (
    <div className="d-flex">
      <div className="MyProfile-Rockets mx-5">
        <h1 className="mt-2">My Rockets</h1>
        <ListGroup>
          {missions.map((mission) => (
            <ListGroup.Item key={mission.mission_id} className="h3">{mission.mission_name}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="MyProfile-Rockets">
        <h1 className="mt-2">My Rockets</h1>
        <ListGroup>
          {reservedRockets.map(
            (rocket) => <ListGroup.Item key={rocket.id} className="h3">{rocket.name}</ListGroup.Item>,
          )}
        </ListGroup>
      </div>
    </div>
  );
}
