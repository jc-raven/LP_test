import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Notification from "./Notification";
import useNewSubmission from "../hooks/useNewSubmission";

export default function Content() {
  const newSubmission = useNewSubmission();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (newSubmission) {
      setShowNotification(o => !o);
    }
  }, [newSubmission]);

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{ fontStyle: "italic", marginTop: 1 }}>
        TODO: List of liked submissions here (delete this line)
      </Typography>
      {newSubmission ? (
        <Notification
          open={showNotification}
          handleClose={() => setShowNotification(false)}
          handleAction={null}
          submission={newSubmission}
        />
      ) : null}
    </Box>
  );
}
