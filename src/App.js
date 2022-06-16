import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Missions from './components/Missions';
import MyProfile from './components/MyProfile';
import Rockets from './components/Rockets';
import Nav from './components/Nav';
import { dispatchRockets } from './redux/rockets/Redux-Rockets';
import { loadMissions } from './redux/missions/Redux-Missions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMissions());
    dispatch(dispatchRockets());
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Missions />} />
        <Route exact path="/myprofile" element={<MyProfile />} />
        <Route exact path="/rockets" element={<Rockets />} />
      </Routes>
    </Router>
  );
}

export default App;
