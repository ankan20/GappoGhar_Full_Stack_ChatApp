import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import React from "react";
import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max} sx={{
        position:"relative"
      }}>
        <Box height={"3rem"} width={"5rem"}>
          {avatar.map((i, index) => {
            return (
              <Avatar
                src={transformImage(i)}
                alt={`Avatar ${index}`}
                key={Math.random() * 100}
                style={{
                  width: "3rem",
                  height: "3rem",
                  position: "absolute",
                  left: {
                    xs: `${0.5 + index}rem`,
                    sm: `${index}rem`,
                  },
                }}
              />
            );
          })}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
