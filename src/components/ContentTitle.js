import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from "@mui/material";

ContentTitle.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
}

/**
 * renders a header based on save/loading state
 */
export default function ContentTitle (props) {
  const { isLoading, isSaving } = props;
  const [title, setTitle] = useState('');
  const msg = 'Liked Form Submissions';

  useEffect(() => {
    setTitle(() => {
      const status = isLoading ? '(Loading...)' : isSaving ? '(Saving...)' : '';
      return `${msg} ${status}`;
    });
  }, [isLoading, isSaving]);

  return (
    <Typography variant="h4">{title}</Typography>
  )
}
