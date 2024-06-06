import React from 'react';
import styled from 'styled-components';

import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

function EmojiPicker({ onEmojiSelect, showEmojiPicker }) {
  return showEmojiPicker && (
    <EmojiPickerContainer>
      <Picker data={data} onEmojiSelect={onEmojiSelect} />
    </EmojiPickerContainer>
  );
}

const EmojiPickerContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 1;
`;

export default EmojiPicker;
