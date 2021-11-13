import { useState, useEffect } from "react";
import { fetchLikedFormSubmissions, saveFormSubmission } from '../service/mockServer';

/**
 * hook that handles:
  * loading of the saved submissions
  * saving new submissions 
  * @returns an array of:
    * @var isLoading: status to indicate liked subs are being fetched
    * @var isSaving: a submission has been liked
    * @var likedSubs: an array of saved submissions 
    * @var handleLikeSub: handler for saving new submissions
 */

const RETRY = 300;

export default function useLikedSubmissions () {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving]   = useState(false);
  const [likedSubs, setLikedSubs] = useState([]);

  // poll the server until saved submissions are sucessfully retrieved
  useEffect(() => {
    let fetchAttempts = 0;

    const retrieveSubmissions = async () => {
      const response = await fetchLikedFormSubmissions().catch(() => {
        fetchAttempts ++;
        console.error(`failed to fetch submission on attempt ${fetchAttempts}, retrying...`);
        setTimeout(retrieveSubmissions, RETRY);
      }); 
      if (response && response.status === 200) {
        setIsLoading(false);
        setLikedSubs(response.formSubmissions);
        console.log('successfully fetched submissions', response.formSubmissions);
      }
    }

    if (isLoading) {
      retrieveSubmissions();
    }
  }, [isLoading]);

  const saveSubmission = async (sub) => {
    const response = await saveFormSubmission(sub).catch(() => {
      console.error(`failed to save submission ${sub.id}, retrying...`)
      setTimeout(saveSubmission, RETRY);
    });
    if (response && response.status === 202) {
      console.log(`successfully saved submission ${sub.id}`);
      // refetch the submissions by updating isfetched state
      setIsSaving(false);
      setIsLoading(true);
    }
  }

  /**
   * the exposed save handler:
    * updates the liked prop of @param newSubmission
    * calls the async handler to save the liked submission
   */
  const handleLikeSub = (newSubmission) => {
    if (!(newSubmission && newSubmission.data)) {
      return;
    }
    newSubmission.liked = true;
    setIsSaving(true);
    saveSubmission(newSubmission);
  }

  return [isLoading, isSaving, likedSubs, handleLikeSub];
}