import React, { useState } from 'react';
import { getThemeVar } from '../styles/themeManager.js';
import { parseHeaderColor, getContrastColor } from '../utils/colorUtils.js';

const TableGroupNode = ({ data, selected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { tableGroup, tables } = data;

  if (!tableGroup) {
    return null;
  }

  // Determine group colors
  const customGroupColor = parseHeaderColor(tableGroup.color);
  const groupBackgroundColor = customGroupColor || getThemeVar('buttonBackground');
  const groupTextColor = customGroupColor
    ? getContrastColor(customGroupColor)
    : getThemeVar('buttonForeground');

  const groupStyle = {
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: selected
      ? `color-mix(in srgb, ${groupBackgroundColor} 20%, transparent)`
      : isHovered
        ? `color-mix(in srgb, ${groupBackgroundColor} 15%, transparent)`
        : `color-mix(in srgb, ${groupBackgroundColor} 10%, transparent)`,
    border: `2px solid ${groupBackgroundColor}`,
    borderRadius: '8px',
    zIndex: -1,
    transition: 'all 0.2s ease-in-out',
    cursor: 'move',
  };

  const titleStyle = {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    transform: 'translate(0, -120%)',
    backgroundColor: groupBackgroundColor,
    color: groupTextColor,
    padding: '16px 12px',
    border: `2px solid ${groupBackgroundColor}`,
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    width: '100%',
  };

  const noteStyle = {
    boxSizing: 'border-box',
    color: groupTextColor,
    marginTop: '10px',
    fontSize: '9px',
    fontStyle: 'italic',
    fontWeight: 'normal',
    border: 'none',
    overflow: 'hidden',
  };

  return (
    <div
      style={groupStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={titleStyle}>
        {tableGroup.name}
        {tableGroup.note && (
          <div style={noteStyle}>
            {tableGroup.note}
          </div>
        )}
      </div>

    </div>
  );
};

export default TableGroupNode;