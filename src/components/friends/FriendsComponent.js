// /components/friends/FriendsComponent.js
import React, { useState, useEffect } from "react";
import FriendsCardHeader from "./FriendsCardHeader";
import AddFriendSection from "./AddFriendSection";
import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";
import ContextMenu from "./ContextMenu";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendList,
  removeFriend,
} from "../../services/friendService";
import styles from "./FriendsCard.module.css";
import defaultPFP from "../../styles/images/Default_pfp.jpg";

const FriendsComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [error, setError] = useState("");

  // State for the context menu on friend cards
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    friend: null,
  });

  const fetchFriends = async () => {
    try {
      const data = await getFriendList();
      setFriendList(data.friends || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch friend list.");
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const data = await getFriendRequests();
      setFriendRequests(data.friendRequests || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch friend requests.");
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);

  const handleSendRequest = async () => {
    try {
      if (!newFriend.trim()) {
        setError("Please enter a valid friend username or ID.");
        return;
      }
      await sendFriendRequest(newFriend);
      setNewFriend("");
      fetchFriendRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to send friend request.");
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      fetchFriends();
      fetchFriendRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to accept friend request.");
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      await declineFriendRequest(requestId);
      fetchFriendRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to decline friend request.");
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(friendId);
      fetchFriends();
      setContextMenu({ visible: false, x: 0, y: 0, friend: null });
    } catch (err) {
      console.error(err);
      setError("Failed to remove friend.");
    }
  };

  const handleContextMenu = (e, friend) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      friend,
    });
  };

  const handleCloseContextMenu = () => {
    if (contextMenu.visible) {
      setContextMenu({ visible: false, x: 0, y: 0, friend: null });
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseContextMenu);
    return () => window.removeEventListener("click", handleCloseContextMenu);
  }, [contextMenu]);

  return (
    <div className={`${styles.sideNav} ${isCollapsed ? styles.collapsed : ""}`}>
      <FriendsCardHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      {/* Always render the content; CSS will handle fading it out */}
      <div className={styles.content}>
        {error && <p className={styles.error}>{error}</p>}
        <AddFriendSection
          newFriend={newFriend}
          setNewFriend={setNewFriend}
          handleSendRequest={handleSendRequest}
        />
        <div className={styles.sectionDivider} />
        <FriendList friendList={friendList} defaultPFP={defaultPFP} handleContextMenu={handleContextMenu} />
        <div className={styles.sectionDivider} />
        <FriendRequests
          friendRequests={friendRequests}
          handleAcceptRequest={handleAcceptRequest}
          handleDeclineRequest={handleDeclineRequest}
        />
      </div>
      {contextMenu.visible && (
        <ContextMenu contextMenu={contextMenu} handleRemoveFriend={handleRemoveFriend} />
      )}
    </div>
  );
};

export default FriendsComponent;
