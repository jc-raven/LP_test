import { IconButton, Snackbar, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';
import useNewSubmission from "../hooks/useNewSubmission";

Notification.propTypes = {
  handleAction: PropTypes.func.isRequired,
}

/**
 * a notification component implemented with the Material snackbar
 * @param handleAction: handler for when the like button is clicked
 */
export default function Notification(props) {
  const { handleAction } = props;

  const [show, setShow ] = useState(false);
  const newSubmission = useNewSubmission();

  // toggle notification visibility when there is a new submission available
  useEffect(() => {
    setShow(!!newSubmission);
  }, [newSubmission])

  // when the like button is clicked, call the parent handler and close the notification
  const handleClickLike = () => {
    handleAction(newSubmission);
    setShow(o => !o);
  }

  // only render when there is a 'new' submission
  if (!newSubmission) {
    return null
  }

  const { data } = newSubmission;

	return (
    <Snackbar
      open={show}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      sx={{backgroundColor: '#1976d2', color: '#fff'}}
    >
      <Box sx={{padding: '1rem', display:'flex', alignItems: 'center'}}>
        <Box mr={15} dispay={'flex'} flexDirection={'column'}>
          <div>{data.firstName} {data.lastName}</div>
          <div>{data.email}</div>
        </Box>
        <IconButton onClick={handleClickLike}>
          <ThumbUpIcon htmlColor='#fff' />
        </IconButton>
        <IconButton onClick={() => setShow(false)}>
          <CloseIcon htmlColor='#fff' />
        </IconButton>
      </Box>
    </Snackbar>
	)
}