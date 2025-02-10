import './App.scss';
import { Menu } from './Elements/Menu';
import { Map } from './Elements/Map';
import { useUsersStore } from './store/users';
import { Loading } from './Elements/Loading';
import "leaflet/dist/leaflet.css";
import { useSavedUsersStore } from './store/savedUsers';
import { useMapStore } from './store/map';
import { useEffect } from 'react';
import { refetchNewWeather } from './Data/RefetchNewWeather';

function App() {
  const { users, fetchNewWeather } = useUsersStore();
  const { savedUsers, fetchSavedNewWeather } = useSavedUsersStore();
  const { mapUsers, changeUsers } = useMapStore();

  useEffect(() => {
    changeUsers(users, savedUsers);
  }, [users, savedUsers, changeUsers]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchNewWeather(users, savedUsers, fetchNewWeather, fetchSavedNewWeather);
    }, 300000); 
    
    return () => clearInterval(interval); 
  }, []);

  return (
    <div>
      {mapUsers.length > 0 ? (
        <div className="elements">
          <div className="Menu">
            <Menu />
          </div>
          <div className="Map">
            <Map />
          </div>
        </div>
      ) : (
        <h1 className='loading'>Loading 
          <div className="dot-container">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>

        </h1>
        
      )}
    </div>
  );
}

export default App;
