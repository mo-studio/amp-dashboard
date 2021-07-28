import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const notStarted = 63;
  const inProgress = 50;
  const completed = 23;
  const totalTasks = notStarted + inProgress + completed;

  const data = {
    datasets: [
      {
        data: [notStarted, inProgress, completed],
        backgroundColor: [
          colors.red[500],
          colors.orange[600],
          colors.green[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ['Not Started', 'In Progress', 'Completed'],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: 'Not Started',
      value: Math.round((notStarted / totalTasks) * 100),
      color: colors.red[500],
    },
    {
      title: 'In Progress',
      value: Math.round((inProgress / totalTasks) * 100),
      color: colors.orange[600],
    },
    {
      title: 'Completed',
      value: Math.round((completed / totalTasks) * 100),
      color: colors.green[600],
    },
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Task Progress" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {devices.map(({ color, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string,
};

export default TrafficByDevice;
