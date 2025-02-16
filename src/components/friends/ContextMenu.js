// /components/friends/ContextMenu.js
import React from "react";
import styles from "./FriendsCard.module.css";

const ContextMenu = ({ contextMenu, handleRemoveFriend }) => {
  return (
    <div
      className={styles.contextMenu}
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <ul>
        <li onClick={() => handleRemoveFriend(contextMenu.friend._id)}>
          Remove Friend
        </li>
        <li onClick={() => {}}>Block</li>
        <li onClick={() => {}}>View Profile</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
