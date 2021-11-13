import { IconButton, Snackbar, Box } from '@mui/material';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';

Notification.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  submission: PropTypes.object.isRequired,
}

/**
 * a notification component implemented with the Material snackbar
 * @param handleClose: handler to dismiss the notification
 * @param handleAction: handler for when the like button is clicked
 * @param open: should the notification be displayed?
 * @param submission: the new submission to display in the notification
 */
export default function Notification(props) {
  const { open, handleClose, handleAction, submission } = props;

  const { data } = submission;
	return (
    <Snackbar
      open={open}
      onClose={null}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      sx={{backgroundColor: '#1976d2', color: '#fff'}}
    >
      <Box sx={{padding: '1rem', display:'flex', alignItems: 'center'}}>
        <Box mr={15} dispay={'flex'} flexDirection={'column'}>
          <div>{data.firstName} {data.lastName}</div>
          <div>{data.email}</div>
        </Box>
        <IconButton onClick={handleAction}>
          <ThumbUpIcon htmlColor='#fff' />
        </IconButton>
        <IconButton onClick={handleClose}>
          <CloseIcon htmlColor='#fff' />
        </IconButton>
      </Box>
    </Snackbar>
	)
}