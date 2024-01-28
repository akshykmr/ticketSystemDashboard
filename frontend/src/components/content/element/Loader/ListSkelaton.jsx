import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const RowsWithSkeleton = ({ numRows }) => {
  const skeletons = [];

  for (let i = 0; i < numRows; i++) {
    skeletons.push(
      <Skeleton key={i} height={100} animation="wave" />
    );
  }

  return <>{skeletons}</>;
};

const Animations = () => {
  return (
    <Box sx={{ width: 1100 }}>
      <RowsWithSkeleton numRows={4} rowHeight={30} />
      <Skeleton />
    </Box>
  );
};

export default Animations;
