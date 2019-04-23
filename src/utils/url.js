const getFacebookUrl = username => {
  return `https://facebook.com/${username}`;
};

const getTwitterUrl = username => {
  return `https://twitter.com/${username}`;
};

const getInstagramUrl = username => {
  return `https://instagram.com/${username}`;
};

const getGitHubUrl = username => {
  return `https://github.com/${username}`;
};

const getSocialUrl = (site, username) => {
  return `https://${site}.com/${username}`;
};

export {
  getFacebookUrl,
  getTwitterUrl,
  getInstagramUrl,
  getGitHubUrl,
  getSocialUrl,
};
