import React from "react";
import { Button, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const MuiTypography = () => {
  return (
    <div>
      <Stack spacing={2} direction={"row"}>
        {" "}
        <Button variant="text">Text</Button>
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
      </Stack>
      <Stack spacing={2} direction={"row"} display={"block"}>
        {" "}
        <Button variant="contained" color="primary" size="medium">
          Primary
        </Button>
        <Button variant="text" color="secondary" size="large">
          secondary
        </Button>
        <Button variant="outlined" color="error" size="small">
          error
        </Button>
        <Button variant="contained" color="warning">
          warning
        </Button>
        <Button variant="contained" color="info">
          info
        </Button>
        <Button variant="contained" color="success">
          success
        </Button>
      </Stack>
      <Stack spacing={2} direction={"row"}>
        <Button
          variant="contained"
          startIcon={<SendIcon></SendIcon>}>
          Send
        </Button>
        <Button variant="contained" endIcon={<SendIcon></SendIcon>}>
          Send
        </Button>
      </Stack>
    </div>
  );
};
