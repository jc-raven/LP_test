import { useState, useEffect } from "react";
import { fetchLikedFormSubmissions, saveFormSubmission } from '../service/mockServer';

/**
 * hook that handles:
  * loading of the saved submissions
  * saving new submissions 
  * @returns an array of:
    * @var isFetched: the current fetch status 
    * @var likedSubs: an array of saved submissions 
    * @var handleLikeSub: handler for saving new submissions
 */

const RETRY = 300;

export default function useLikedSubmissions () {
  const [isFetched, setisFetched] = useState(false);
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
        setisFetched(true);
        setLikedSubs(response.formSubmissions);
        console.log('successfully fetched submissions', response.formSubmissions);
      }
    }

    if (!isFetched) {
      retrieveSubmissions();
    }
  }, [isFetched]);

  const saveSubmission = async (sub) => {
    const response = await saveFormSubmission(sub).catch(() => {
      console.error(`failed to save submission ${sub.id}, retrying...`)
      setTimeout(saveSubmission, RETRY);
    });
    if (response && response.status === 202) {
      console.log(`successfully saved submission ${sub.id}`);
      // refetch the submissions by updating isfetched state
      setisFetched(false);
    }
  }

  const handleLikeSub = (newSubmission) => {
    console.log('subimssion liked!', newSubmission);
    newSubmission.liked = true;
    saveSubmission(newSubmission);
  }

  return [isFetched, likedSubs, handleLikeSub];
}