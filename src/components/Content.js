import { Box, List, ListItem, ListItemText } from "@mui/material";
import ContentTitle from './ContentTitle';
import Notification from "./Notification";
import useLikedSubmissions from "../hooks/useLikedSubmissions";

export default function Content() {
  const [isLoading, isSaving, likedSubs, handleLikeSub] = useLikedSubmissions();

  // calls the api save handler then closes the notification
  const handleClickLike = (submission) => {
    handleLikeSub(submission);
  }

  return (
    <Box sx={{ marginTop: 3 }}>
      <ContentTitle isSaving={isSaving} isLoading={isLoading} />
      {/* render the liked submissions */}
      <List sx={{ marginTop: 1 }}>
        {!isLoading
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
      {/* render the notification */}
      <Notification handleAction={handleClickLike} isSaving={isSaving} />
    </Box>
  );
}
