import React from 'react';
import styled from 'styled-components';

function Toolbar({
  showEmojiPicker,
  setShowEmojiPicker,
  handleStyleChange,
  activeBold,
  activeItalic,
  activeUnderline,
  activeFontSize,
}) {
  return (
    <ToolbarContainer>
      <ToolbarButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <Icon>😀</Icon>
      </ToolbarButton>
      <ToolbarButton onClick={() => handleStyleChange('fontWeight')} active={activeBold}>
        <Icon>
          <strong>B</strong>
        </Icon>
      </ToolbarButton>
      <ToolbarButton onClick={() => handleStyleChange('fontStyle')} active={activeItalic}>
        <Icon>
          <em>I</em>
        </Icon>
      </ToolbarButton>
      <ToolbarButton onClick={() => handleStyleChange('textDecoration')} active={activeUnderline}>
        <Icon>
          <u>U</u>
        </Icon>
      </ToolbarButton>
      <FontSizeSelect onChange={(e) => handleStyleChange('fontSize', e.target.value)} value={activeFontSize}>
        <option value="12px">Small</option>
        <option value="16px">Normal</option>
        <option value="32px">Large</option>
      </FontSizeSelect>
      <ColorPicker>
        <ColorOption color="#000000" onClick={() => handleStyleChange('color', '#000000')} />
        <ColorOption color="#FF0000" onClick={() => handleStyleChange('color', '#FF0000')} />
        <ColorOption color="#00FF00" onClick={() => handleStyleChange('color', '#00FF00')} />
        <ColorOption color="#0000FF" onClick={() => handleStyleChange('color', '#0000FF')} />
      </ColorPicker>
    </ToolbarContainer>
  );
}

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f0f0f0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: ${(props) => (props.active ? '#e0e0e0' : 'transparent')};
  cursor: pointer;
  margin-right: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  color: #333333;
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const ColorOption = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 4px;
  cursor: pointer;
`;

const FontSizeSelect = styled.select`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 12px;
`;

export default Toolbar;
