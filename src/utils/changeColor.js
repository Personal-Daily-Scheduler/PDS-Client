const changeColor = (colorString, amount, isTransparent = false) => {
  const r = parseInt(colorString.slice(1, 3), 16);
  const g = parseInt(colorString.slice(3, 5), 16);
  const b = parseInt(colorString.slice(5, 7), 16);

  if (isTransparent) {
    const alpha = Math.max(0, 1 - amount / 100);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  const adjustedR = Math.max(0, r - amount);
  const adjustedG = Math.max(0, g - amount);
  const adjustedB = Math.max(0, b - amount);

  return `#${adjustedR.toString(16).padStart(2, "0")}${adjustedG.toString(16).padStart(2, "0")}${adjustedB.toString(16).padStart(2, "0")}`;
};

export default changeColor;
