const findParentSpan = (node, style) => {
  let { parentNode } = node;

  while (parentNode) {
    if (parentNode.tagName === "SPAN" && parentNode.style[style]) {
      return parentNode;
    }
    parentNode = parentNode.parentNode;
  }

  return null;
};

const removeStyleTags = (html, style) => {
  const container = document.createElement("div");
  const elements = container.getElementsByTagName("span");

  container.innerHTML = html;

  for (let i = elements.length - 1; i >= 0; i -= 1) {
    const element = elements[i];

    if (element.style[style]) {
      const parent = element.parentNode;

      if (parent.tagName === "SPAN") {
        const newSpan = document.createElement("span");
        newSpan.innerHTML = element.innerHTML;

        for (let j = 0; j < element.style.length; j += 1) {
          const currentStyle = element.style[j];

          if (currentStyle !== style) {
            newSpan.style[currentStyle] = element.style[currentStyle];
          }
        }
        parent.replaceChild(newSpan, element);
      } else {
        element.style[style] = "";

        if (element.getAttribute("style") === "") {
          element.removeAttribute("style");
        }
      }
    }
  }

  return container.innerHTML;
};

const removeEmptySpanTags = (html) => {
  const container = document.createElement("div");
  const elements = container.getElementsByTagName("span");
  container.innerHTML = html;

  for (let i = elements.length - 1; i >= 0; i -= 1) {
    const element = elements[i];

    if (!element.getAttribute("style")) {
      const parent = element.parentNode;

      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element);
      }

      parent.removeChild(element);
    }
  }

  return container.innerText;
};

const getStyleValue = (style) => {
  if (style === "fontWeight") {
    return "bold";
  } if (style === "fontStyle") {
    return "italic";
  } if (style === "textDecoration") {
    return "underline";
  }

  return "";
};

const saveSelection = () => {
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    return selection.getRangeAt(0);
  }

  return null;
};

export default {
  findParentSpan,
  removeStyleTags,
  removeEmptySpanTags,
  getStyleValue,
  saveSelection,
};
