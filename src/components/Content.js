import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import Notification from "./Notification";
import useLikedSubmissions from "../hooks/useLikedSubmissions";
import useNewSubmission from "../hooks/useNewSubmission";

export default function Content() {
  const newSubmission = useNewSubmission();
  const [isFetched, likedSubs, handleLikeSub] = useLikedSubmissions();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (newSubmission) {
      setShowNotification(o => !o);
    }
  }, [newSubmission]);

  // calls the api save handler then closes the notification
  const handleClickLike = () => {
    handleLikeSub(newSubmission);
    setShowNotification(false);
  }

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions {!isFetched ? '(Loading...)' : ''}</Typography>
      <List sx={{ marginTop: 1 }}>
        {isFetched
          ? likedSubs.map((s) => {
            const { data, id } = s;
            return (
              <ListItem key={id}>
                <ListItemText primary={`${data.firstName} ${data.lastName}`} secondary={`Email: ${data.email}`}/>
              </ListItem>
              )
          })
          : null}
      </List>
      {newSubmission ? (
        <Notification
          open={showNotification}
          handleClose={() => setShowNotification(false)}
          handleAction={handleClickLike}
          submission={newSubmission}
        />
      ) : null}
    </Box>
  );
}
