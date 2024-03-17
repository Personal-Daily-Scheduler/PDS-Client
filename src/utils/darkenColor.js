const darkenColor = (colorString, amount) => {
  const r = parseInt(colorString.slice(1, 3), 16);
  const g = parseInt(colorString.slice(3, 5), 16);
  const b = parseInt(colorString.slice(5, 7), 16);

  const darkenedR = Math.max(0, r - amount);
  const darkenedG = Math.max(0, g - amount);
  const darkenedB = Math.max(0, b - amount);

  return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
};

export default darkenColor;
