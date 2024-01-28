import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function CardSkeleton({ numOfCards }) {
 const rows = [];
 for (let i = 0; i < numOfCards / 2; i++) {
    rows.push(
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Skeleton
          sx={{ bgcolor: '#25236d', marginRight: '50px' , marginBottom: "20px",borderRadius: "20px"}}
          variant="rectangular"
          width={400}
          height={200}
        />
        <Skeleton
          sx={{ bgcolor: '#25236d', marginLeft: '50px', marginBottom: "20px", borderRadius: "20px"}}
          variant="rectangular"
          width={400}
          height={200}
        />
      </Box>
    );
 }

 return <>{rows}</>;
}