import React from 'react';
import { makeStyles, List } from '@material-ui/core';
import PropTypes from 'prop-types';
import SideNavItem from './SideNavItem';

const useStyles = makeStyles({
  sideNav: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '320px',
    height: 'calc(100% - 164px)',
    backgroundColor: '#f4f6f8',
  },
});

const SideNav = ({ items }) => {
  const classes = useStyles();
  return (
    <div className={classes.sideNav}>
      <List>
        {items.map((item) => (
          <SideNavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </List>
    </div>
  );
};

SideNav.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SideNav;
