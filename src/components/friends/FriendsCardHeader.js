// /components/friends/FriendsCardHeader.js
import React from "react";
import styles from "./FriendsCard.module.css";
import { ReactComponent as UserFriendsIcon } from "../../styles/images/user-friends.svg";
import { ReactComponent as CloseButtonIcon } from "../../styles/images/close-button.svg";

const FriendsCardHeader = ({ isCollapsed, setIsCollapsed }) => {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.header}>
      <button
        className={styles.toggleBtn}
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <UserFriendsIcon className={styles.toggleIcon} />
        ) : (
          <CloseButtonIcon className={styles.toggleIcon} />
        )}
      </button>
      {/* Note: The original Friends title has been removed */}
    </div>
  );
};

export default FriendsCardHeader;
