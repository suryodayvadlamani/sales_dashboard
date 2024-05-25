import React from 'react';
import { IconContext } from 'react-icons';
import * as IconLibrary from 'react-icons/fa'; // Import all icons from the desired library

function DynamicIcon({ iconName }) {
  // Dynamically get the icon component based on the iconName prop
  const IconComponent = IconLibrary[iconName];

  if (!IconComponent) {
    // If icon not found, render a placeholder or a default icon
    return <div>No Icon Found</div>;
  }

  return (
    <IconContext.Provider value={{ size: '2em'}}>
      <div>
        <IconComponent />
      </div>
    </IconContext.Provider>
  );
}

export default DynamicIcon;
