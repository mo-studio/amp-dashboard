import React from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import InputIcon from '@material-ui/icons/Input';
import Avatar from './Avatar';
import TopNavSecondary from './TopNavSecondary';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#9e9e9e',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  textButton: {
    display: 'flex',
  },
  headerText: {
    color: 'black',
  },
  secondaryBar: {
    display: 'flex',
    height: '100px',
    borderRadius: '0',
    backgroundColor: '#fff',
  },
});

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Typography variant="h4" className={classes.headerText}>
          AMP In-Processing Dashboard | Maxwell Air Force Base
        </Typography>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <Avatar name="Frank Smith" />
          <IconButton
            color="inherit"
            href="http://keycloak:8080/auth/realms/example/protocol/openid-connect/logout?redirect_uri=http://localhost:3001"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            href="http://keycloak:8080/auth/realms/example/protocol/openid-connect/logout?redirect_uri=http://localhost:3001"
          >
            <InputIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <TopNavSecondary classes={classes} />
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
