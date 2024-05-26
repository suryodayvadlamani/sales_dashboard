import React from 'react';
import { IconContext } from 'react-icons';
import * as IconLibrary from 'react-icons/fa'; // Import all icons from the desired library
import { PiImageBrokenDuotone } from "react-icons/pi";
import { cn } from "../lib/util"

function DynamicIcon({ iconName, className }) {
  // Dynamically get the icon component based on the iconName prop
  const IconComponent = IconLibrary[iconName];

  if (!IconComponent) {
    // If icon not found, render a placeholder or a default icon
    return <PiImageBrokenDuotone />;
  }

  return (
    <IconContext.Provider value={{ size: '2em' }}>

      <IconComponent className={cn(
        "text-sm",
        className
      )} />

    </IconContext.Provider>
  );
}

export default DynamicIcon;
