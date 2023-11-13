
import VisibilityIcon from '@mui/icons-material/Visibility';


import * as React from 'react';
import Popover from '@mui/material/Popover';



export default function EyeDropDown({handleOne, handleTwo}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleStreet = () => {
    handleOne();
    handleClose();
  }

  const handleSat = () => {
    handleTwo();
    handleClose();
  }

  return (
    <div>
      
      <div className="eyedropdown" aria-describedby={id} variant="contained" onClick={handleClick}>
      <VisibilityIcon/>
    </div>
      <Popover
      
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className='popover-action-box' >
            <p className='popover-btn' onClick={handleStreet}>Street View</p>
            <p className='popover-btn' onClick={handleSat}>Satellite View</p>
        </div>
      </Popover>
    </div>
  );
}
