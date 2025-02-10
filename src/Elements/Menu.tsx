import { useState } from "react";
import { useSavedUsersStore } from "../store/savedUsers";
import { useUsersStore } from "../store/users";
import { FiMapPin, FiAlignJustify } from "react-icons/fi";
import { FullUser } from "../Data/Type";
import { Modal } from "./Modal";
import "./Menu.scss";
import { useMapStore } from "../store/map";
import { WeatherIcon } from "./WeatherIcon";
import { Loading } from "./Loading";

export function Menu() {
  const { users, fetchNewUser } = useUsersStore();
  const { savedUsers, addUser, deleteUser } = useSavedUsersStore();
  const { changeCenter } = useMapStore();

  const [isSaved, setIsSaved] = useState(false); // Стан для вибору списку
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FullUser | null>(null);

  const MapUser = ({ MapUsers }: { MapUsers: FullUser[] }) => {
    return (
      <div className="mapBar">
        {MapUsers.map((user) =>
          user.isLoading ? (
            <div key={3}>
              <Loading />
            </div>
          ) : (
            <div
              key={user.user?.id}
              className="userDiv"
              onClick={() => {
                changeCenter(user);
              }}
            >
              <div className="userData">
                <picture>
                  {user.user && "photo" in user.user && user.user.photo ? (
                    <img
                      className="photo"
                      src={user.user.photo}
                      alt="User Photo"
                    />
                  ) : (
                    <div className="photo">
                      <FiMapPin className="point" />
                    </div>
                  )}
                </picture>

                <strong className="name">
                  {user.user?.title}{" "}
                  {user.user && "first" in user.user
                    ? user.user.first + " " + user.user.last
                    : null}
                </strong>

                <div className="weatherIcon">
                  {user.weather ? (
                    <WeatherIcon
                      weatherCode={user.weather.currentWeatherCode}
                    />
                  ) : null}
                </div>
              </div>

              <div className="userButton">
                {isSaved ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteUser(user);
                    }}
                    className="firstButton"
                  >
                    Delete User
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addUser(user);
                    }}
                    className="firstButton"
                  >
                    Save User
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser(user);
                  }}
                  className="secondButton"
                >
                  Show User
                </button>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="fullMenu">
      <div className={`burgerDiv ${isOpen ? "close" : "open"}`} >
        <FiAlignJustify className={`burger ${isOpen ? "close" : "open"}`}
        onClick={() => setIsOpen(!isOpen)}/>
      </div>
      <div className={`menuBar ${isOpen ? "open" : "close"}`}>
        <div className="menuButton">
          <button
            onClick={() => setIsSaved(false)}
            className={`mainButton${isSaved ? " notActive" : " isActive"}`}
          >
            Main
          </button>
          <button
            onClick={() => setIsSaved(true)}
            className={`savedButton${isSaved ? " isActive" : " notActive"}`}
          >
            Saved
          </button>
        </div>
        <div className="menu">
          {isSaved ? (
            <div>
              <MapUser MapUsers={savedUsers} />
            </div>
          ) : (
            <div>
              <MapUser MapUsers={users} />
            </div>
          )}
        </div>
        {!isSaved ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              fetchNewUser();
            }}
            className="newUser"
          >
            New User
          </button>
        ) : null}
        
      </div>
      {selectedUser && (
          <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
    </div>
  );
}
