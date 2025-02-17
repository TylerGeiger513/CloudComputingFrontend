// /components/friends/ContextMenu.js
import React, { useEffect, useRef, useState } from "react";
import styles from "./FriendsCard.module.css";

const ContextMenu = ({ contextMenu, handleRemoveFriend }) => {
  const menuRef = useRef(null);
  const [position, setPosition] = useState({
    top: contextMenu.y,
    left: contextMenu.x,
  });

  useEffect(() => {
    // Wait for the menu to render so we can measure its width.
    const menuWidth = menuRef.current?.offsetWidth || 0;
    let left = contextMenu.x;
    // If the menu would extend beyond the right edge of the viewport...
    if (contextMenu.x + menuWidth > window.innerWidth) {
      // Flip it so it appears to the left of the cursor.
      left = contextMenu.x - menuWidth;
      // Ensure it doesn't go off-screen on the left.
      if (left < 0) left = 0;
    }
    setPosition({
      top: contextMenu.y,
      left,
    });
  }, [contextMenu]);

  return (
    <div
      ref={menuRef}
      className={styles.contextMenu}
      style={{
        top: position.top,
        left: position.left,
        position: "fixed",
      }}
    >
      <ul>
        <li onClick={() => handleRemoveFriend(contextMenu.friend._id)}>
          Remove Friend
        </li>
        <li onClick={() => {}}>Block (inactive)</li>
        <li onClick={() => {}}>View Profile (inactive)</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
