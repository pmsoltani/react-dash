const env = process.env.REACT_APP_ENV;
let envApiUrl = "";

if (env === "production") {
  envApiUrl = `http://${process.env.REACT_APP_DOMAIN_PROD}`;
} else if (env === "staging") {
  envApiUrl = `http://${process.env.REACT_APP_DOMAIN_STAG}`;
} else {
  // default case
  envApiUrl = `http://${process.env.REACT_APP_DOMAIN_DEV}`;
}

export const apiUrl = envApiUrl;
