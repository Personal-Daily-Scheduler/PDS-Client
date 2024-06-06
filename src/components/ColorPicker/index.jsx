import React from "react";
import styled from "styled-components";

import { Github } from "@uiw/react-color";

function ColorPicker({ onChange }) {
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
