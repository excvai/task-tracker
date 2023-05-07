import { Box, Button, Typography } from "@mui/material";
import { default as NextLink } from "next/link";

export default function SignIn() {
  return (
    <main>
      <Box>
        <Typography>test text</Typography>
        <Button component={NextLink} href="/" variant="contained">
          back to home page
        </Button>
      </Box>
    </main>
  );
}
