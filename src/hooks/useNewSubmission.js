import { useState } from 'react';
import { onMessage } from '../service/mockServer';

/**
 * simple state manager for new submissions
 */
export default function useNewSubmission() {
  const [newSubmission, setNewSubmission] = useState(null);

  onMessage((newSub) => setNewSubmission(newSub));

  return newSubmission;
}