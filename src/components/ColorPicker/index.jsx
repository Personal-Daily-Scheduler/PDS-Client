import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import styled from 'styled-components';

import useClickOutside from '../../utils/useClickOutside';

export function ColorPicker({ color, onChange }) {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);

  useClickOutside(popover, close);

  const handleColor = (e) => {
    onChange(e.target.value);
  };

  return (
    <Picker>
      <Swatch
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      <Input value={color} onChange={handleColor} />

      {isOpen && (
        <PopupPalette ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </PopupPalette>
      )}
    </Picker>
  );
}

const Picker = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const Swatch = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 3px solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const PopupPalette = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  z-index: 5;
`;

const Input = styled.input`
  margin-left: 8px;
  width: 180px;
  height: 32px;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 8px;
  border: #d9d9d9 solid 1px;
`;

export default ColorPicker;
