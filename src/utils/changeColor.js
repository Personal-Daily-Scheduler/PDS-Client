const changeColor = (colorString, amount, isLighten = false) => {
  const r = parseInt(colorString.slice(1, 3), 16);
  const g = parseInt(colorString.slice(3, 5), 16);
  const b = parseInt(colorString.slice(5, 7), 16);

  const adjustedR = isLighten ? Math.min(255, r + amount) : Math.max(0, r - amount);
  const adjustedG = isLighten ? Math.min(255, g + amount) : Math.max(0, g - amount);
  const adjustedB = isLighten ? Math.min(255, b + amount) : Math.max(0, b - amount);

  return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
};

export default changeColor;
