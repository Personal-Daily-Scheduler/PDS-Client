import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Github } from '@uiw/react-color';

import useClickOutside from '../../utils/useClickOutside';

export function ColorPicker({ onChange }) {
  const popover = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(popover, close);

  return (
    <Picker>
      <Github onChange={(color) => onChange(color.hex)} />
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

export default ColorPicker;
