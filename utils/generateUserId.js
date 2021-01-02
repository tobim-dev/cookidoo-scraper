const generateUserId = (username) => {
  return username + new Date().toLocaleDateString();
};
