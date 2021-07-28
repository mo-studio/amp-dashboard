# AMP Dashboard

The web dashboard for AMP. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Docker

This project will build and run locally with Docker:

```
docker-compose up
```

To stop: `docker-compose down`

## Keycloak

This dashboard is equipped with Keycloak authentication. In order to sign in with keycloak and access the dashboard, you *must* have AMP API running. The API creates a local keycloak instance which is accessible in your browser at keycloak:8080/auth. 

Keycloak loads with an example realm with an amp-dashboard client. You must add a user within the example realm in order for authentication to work. 

Go to the keycloak URL keycloak:8080/auth. 

Login to the console

username: admin \
password: admin

Create a user within the example realm.

Go to Users and select Add User,

1.) create username \
2.) set a password in the Credentials tab

The end result should be a request for keycloak login when running the amp-dashboard at http://localhost:3001 and a successful authorization flow with the user you created.




