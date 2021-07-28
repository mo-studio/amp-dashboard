import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 400,
    transition: 'all .1s ease-in-out',
    '&:hover': {
      backgroundColor: '#fff',
      fontWeight: 600,
      transform: 'translateY(-2px)',
    },
  },
  active: {
    fontWeight: 600,
  },
});

const NavItem = ({ href, title }) => {
  const classes = useStyles();
  return (
    <Button
      disableRipple
      component={RouterLink}
      to={href}
      className={classes.root}
      activeClassName={classes.active}
    >
      {title}
    </Button>
  );
};

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default NavItem;
