import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: 'example',
  clientId: 'amp-dashboard',
});

export default keycloak;
