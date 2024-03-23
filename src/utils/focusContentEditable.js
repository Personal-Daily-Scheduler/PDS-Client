const focusContentEditableTextToEnd = (element) => {
  if (element.innerText.length === 0) {
    element.focus();
    return;
  }

  const selection = window.getSelection();
  const newRange = document.createRange();

  newRange.selectNodeContents(element);
  newRange.collapse(false);

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
};

export default focusContentEditableTextToEnd;
