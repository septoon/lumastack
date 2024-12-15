'use client';
import React from "react";
import { Link, Tooltip, IconButton, Zoom } from "@mui/material";
import Resume from "../../settings/resume.json";
import GoogleIcon from '@mui/icons-material/Google';

const SocialIcons: React.FC = () => {
  const socialItems = Resume.basics.profiles.map((socialItem: any) => (
    <Link
      href={socialItem.url}
      key={socialItem.network.toLowerCase()}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      color="inherit"
      style={{ display: "block", marginBottom: "1rem" }}
    >
      <Tooltip title={socialItem.username} placement="left" TransitionComponent={Zoom}>
        <IconButton
          color="inherit"
          aria-label={socialItem.network}
          sx={{
            width: "2.5rem",
            height: "2.5rem",
            "& i": {
              fontSize: "1.25rem",
            },
          }}
        >
          <i className={socialItem.x_icon}></i>
        </IconButton>
      </Tooltip>
    </Link>
  ));

  return (
    <div
    >
      {socialItems}
    </div>
  );
};

export default SocialIcons;