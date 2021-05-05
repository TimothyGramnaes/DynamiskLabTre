const users = [];

// user joins shat
function joiningUser(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function addCurrentUser(id) {
  return users.find((user) => user.id == id);
}

// Someone leaving the shat
function leavingUser(id) {
  const i = users.findIndex((user) => user.id === id);

  if (i !== -1) {
    return users.splice(i, 1)[0];
  }
}

// get room users
function usersInRoom(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  joiningUser,
  addCurrentUser,
  leavingUser,
  usersInRoom,
};
