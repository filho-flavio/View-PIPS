import "./Sidebar.css";
import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { personsImgs } from "../../utils/images";
import { navigationLinks } from "../../data/data";
import { SidebarContext } from "../../context/sidebarContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(0);
  const { isSidebarOpen } = useContext(SidebarContext);
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = navigationLinks.findIndex(
      (link) => link.link === currentPath
    );

    if (activeIndex !== -1) {
      setActiveLinkIdx(activeIndex);
    }
  }, [location]);

  const handleLinkClick = (index) => {
    setActiveLinkIdx(index);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "sidebar-change" : ""}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img className="sidebar-toggler-btn-img" src={personsImgs.person_two} alt="profile image" />
        </div>
        <span className="info-name">User</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink, index) => (
            <li className="nav-item" key={navigationLink.id}>
              <Link
                to={navigationLink.link}
                className={`nav-link ${
                  index === activeLinkIdx ? "active" : ""
                }`}
                onClick={() => handleLinkClick(index)}
              >
                <img
                  src={navigationLink.image}
                  className="nav-link-icon"
                  alt={navigationLink.title}
                />
                <span className="nav-link-text">{navigationLink.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="btn-sair" onClick={() => navigate("/")}>Sair</button>
    </div>
  );
};

export default Sidebar;