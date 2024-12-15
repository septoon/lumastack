'use client'
import React from "react";
import Image from 'next/image';
import Resume from "../../settings/resume.json";
import { Tooltip } from "@mui/material";
import { useTheme } from '../Theme/ThemeProvider';

const Logo: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center cursor-pointer `}>
      <Tooltip
      title={Resume.basics.name}
      placement="right"
    >
      <Image
        src="/logo.svg"
        alt="Logo"
        width={36}
        height={36}
        className={theme === 'light' ? 'filter-none' : 'filter invert'}
      />
      </Tooltip>
    </div>
  );
};

export default Logo