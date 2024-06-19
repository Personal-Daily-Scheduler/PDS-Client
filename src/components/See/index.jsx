import React, {
  useRef, useState, useCallback, useLayoutEffect, useEffect,
} from "react";
import styled, { css } from "styled-components";
import { v4 as uuidV4 } from "uuid";

import ToastPopup from "../../shared/Toast";
import EmojiPicker from "../EmojiPicker";
import focusContentEditableTextToEnd from "../../utils/focusContentEditable";
import textEditorUtils from "../../utils/textEditor";
import fetchPostDiary from "../../services/diary/fetchPostDiary";

import useCalendarStore from "../../store/calender";
import useDiaryStore from "../../store/diary";

function See() {
  const [toast, setToast] = useState({});
  const [diaryId, setDiaryId] = useState("");
  const [activeBold, setActiveBold] = useState(false);
  const [activeItalic, setActiveItalic] = useState(false);
  const [activeUnderline, setActiveUnderline] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const editorRef = useRef(null);
  const selectionRef = useRef(null);

  const { selectedDate } = useCalendarStore();
  const { diaryByDates, saveDiary } = useDiaryStore();

  const getDiaries = () => {
    const dailyDiary = diaryByDates[selectedDate];

    if (dailyDiary) {
      const [, diaryContent] = Object.entries(dailyDiary)[0];

      return diaryContent;
    }

    return null;
  };

  useEffect(() => {
    if (selectedDate && diaryByDates[selectedDate]) {
      const dairyDiaryObject = getDiaries();

      setDiaryId(dairyDiaryObject.diaryId);
      setText(dairyDiaryObject.styledContent || "");

      return;
    }

    setText("");
    setDiaryId("");
  }, [selectedDate, diaryByDates]);

  useLayoutEffect(() => {
    if (editorRef.current) {
      focusContentEditableTextToEnd(editorRef.current);
    }
  }, [text]);

  const handleEmojiSelect = (emoji) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const emojiNode = document.createTextNode(emoji.native);

    range.insertNode(emojiNode);
    range.setStartAfter(emojiNode);
    range.setEndAfter(emojiNode);

    selection.removeAllRanges();
    selection.addRange(range);

    setText(editorRef.current.innerHTML);
    setShowEmojiPicker(false);
  };

  const handleTextChange = (e) => {
    if (!isComposing) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      if (e.nativeEvent.inputType === "insertText" || e.nativeEvent.inputType === "insertCompositionText") {
        selectionRef.current = {
          startContainer: range.startContainer,
          startOffset: range.startOffset,
          endContainer: range.endContainer,
          endOffset: range.endOffset,
        };
      }

      setText(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const br = document.createElement("br");

      range.deleteContents();
      range.insertNode(br);
      range.setStartAfter(br);
      range.setEndAfter(br);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
    } else if (e.key === "Backspace") {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      const currentNode = range.startContainer;
      const currentOffset = range.startOffset;

      if (currentNode.nodeType === Node.TEXT_NODE && currentOffset === 0) {
        const previousNode = currentNode.previousSibling;

        if (previousNode && previousNode.nodeType === Node.ELEMENT_NODE && previousNode.tagName === "BR") {
          const { parentNode } = previousNode;

          parentNode.removeChild(previousNode);

          const newRange = document.createRange();

          newRange.setStart(currentNode, 0);
          newRange.setEnd(currentNode, 0);

          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    }
  }, []);

  const handleStyleChange = (style, value) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText.length > 0) {
      const { startContainer } = range;
      const { endContainer } = range;

      const startSpan = textEditorUtils.findParentSpan(startContainer, style);
      const endSpan = textEditorUtils.findParentSpan(endContainer, style);

      if (startSpan && endSpan && startSpan === endSpan) {
        const styledText = startSpan.innerHTML;
        const unstyledText = textEditorUtils.removeStyleTags(styledText, style);
        const cleanedText = textEditorUtils.removeEmptySpanTags(unstyledText);
        const newTextNode = document.createTextNode(cleanedText);

        startSpan.parentNode.replaceChild(newTextNode, startSpan);

        const newRange = document.createRange();

        newRange.selectNodeContents(newTextNode);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        const fragment = range.cloneContents();
        const newElement = document.createElement("span");

        if (style === "color" || style === "fontSize") {
          newElement.style[style] = value;

          const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const textNode = node.cloneNode(true);

              newElement.appendChild(textNode);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName === "SPAN") {
                const styledNode = node.cloneNode(true);

                styledNode.style[style] = value;
                newElement.appendChild(styledNode);
              } else {
                Array.from(node.childNodes).forEach(processNode);
              }
            }
          };

          Array.from(fragment.childNodes).forEach(processNode);
        } else {
          const processNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const textNode = node.cloneNode(true);

              let { parentNode } = node;
              const styledNode = newElement;

              while (parentNode && parentNode.tagName === "SPAN") {
                const styles = parentNode.style;

                let isStyleApplied = false;

                for (let i = 0; i < styles.length; i += 1) {
                  const existingStyle = styles[i];

                  if (existingStyle === style) {
                    isStyleApplied = true;

                    break;
                  }

                  styledNode.style[existingStyle] = parentNode.style[existingStyle];
                }

                if (isStyleApplied) {
                  styledNode.appendChild(textNode);

                  return;
                }

                parentNode = parentNode.parentNode;
              }

              if (style === "color" || style === "fontSize") {
                styledNode.style[style] = value;
              } else {
                styledNode.style[style] = textEditorUtils.getStyleValue(style);
              }

              styledNode.appendChild(textNode);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName === "SPAN") {
                const styles = node.style;

                let isStyleApplied = false;

                for (let i = 0; i < styles.length; i += 1) {
                  const existingStyle = styles[i];

                  if (existingStyle === style) {
                    isStyleApplied = true;

                    break;
                  }
                }

                if (isStyleApplied) {
                  if (style === "color" || style === "fontSize") {
                    node.style[style] = value;
                  }

                  newElement.appendChild(node.firstChild);
                } else {
                  const styledNode = node.cloneNode(true);

                  styledNode.style[style] = textEditorUtils.getStyleValue(style);
                  newElement.appendChild(styledNode);
                }
              } else {
                Array.from(node.childNodes).forEach(processNode);
              }
            }
          };

          Array.from(fragment.childNodes).forEach(processNode);
        }

        range.deleteContents();
        range.insertNode(newElement);

        selection.removeAllRanges();
        selection.addRange(range);
      }

      setText(editorRef.current.innerHTML);

      if (style === "fontWeight") {
        setActiveBold(!activeBold);
      } else if (style === "fontStyle") {
        setActiveItalic(!activeItalic);
      } else if (style === "textDecoration") {
        setActiveUnderline(!activeUnderline);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const diaryObjectId = diaryId || uuidV4();

    const diaryObject = {
      diaryId: diaryObjectId,
      selectedDate,
      styledContent: editorRef.current.innerHTML,
    };

    if (editorRef.current.innerText) {
      await saveDiary(diaryObject);

      setToast({ status: true, message: "다이어리가 저장되었습니다." });

      const memberUser = JSON.parse(sessionStorage.getItem("authenticatedUser"));

      if (memberUser) {
        const fetchDiaryData = await fetchPostDiary(diaryObject, memberUser);

        if (!fetchDiaryData.result) {
          setToast({ status: true, message: "저장에 실패했습니다." });
        }
      }

      return;
    }

    setToast({ status: true, message: "작성된 다이어리가 없습니다." });
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e) => {
    setIsComposing(false);
    handleTextChange(e);
  };

  return (
    <>
      <SeeContainer>
        <Title>See</Title>
        <EditorWrapper>
          <EditorContainer>
            <Toolbar>
              <ToolbarButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <Icon>😀</Icon>
              </ToolbarButton>
              <ToolbarButton onClick={() => handleStyleChange("fontWeight")}>
                <Icon>
                  <strong>B</strong>
                </Icon>
              </ToolbarButton>
              <ToolbarButton onClick={() => handleStyleChange("fontStyle")}>
                <Icon>
                  <em>I</em>
                </Icon>
              </ToolbarButton>
              <ToolbarButton onClick={() => handleStyleChange("textDecoration")}>
                <Icon>
                  <u>U</u>
                </Icon>
              </ToolbarButton>
              <FontSizeSelect onChange={(e) => handleStyleChange("fontSize", e.target.value)}>
                <option value="12px">Small</option>
                <option value="26px">Normal</option>
                <option value="32px">Large</option>
              </FontSizeSelect>
              <ColorPicker>
                <ColorOption color="#000000" onClick={() => handleStyleChange("color", "#000000")} />
                <ColorOption color="#FF0000" onClick={() => handleStyleChange("color", "#FF0000")} />
                <ColorOption color="#00FF00" onClick={() => handleStyleChange("color", "#00FF00")} />
                <ColorOption color="#0000FF" onClick={() => handleStyleChange("color", "#0000FF")} />
              </ColorPicker>
              <SubmitButton className="responsive-submit" onClick={handleSubmit}>Submit</SubmitButton>
            </Toolbar>
            <EditorContent
              contentEditable
              ref={editorRef}
              onInput={handleTextChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </EditorContainer>
          <EmojiPicker
            onEmojiSelect={handleEmojiSelect}
            showEmojiPicker={showEmojiPicker}
          />
          <SubmitButton className="normal-submit" onClick={handleSubmit}>Submit</SubmitButton>
        </EditorWrapper>
      </SeeContainer>
      {toast.status && (
        <ToastPopup setToast={setToast} message={toast.message} />
      )}
    </>
  );
}

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 5px auto;
`;

const SeeContainer = styled.div`
  margin: 20px;
  border: none;
  border-radius: 8px;
  width: 280px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  position: relative;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 900px) {
    width: auto;
    max-width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const ColorOption = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
  }

  &:hover {
    transform: scale(1.1);
    &:before {
      width: 150%;
      height: 150%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  background-color: #f5f5f5;

  @media screen and (max-width: 900px) {
    height: calc(30vh - 100px);
    width: 100%;
  }
`;

const EditorContainer = styled.div`
  width: 280px;
  height: 600px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f0f0f0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  @media screen and (max-width: 900px) {
    margin: 0 20px;
    justify-content: space-between;
  }
`;

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: ${(props) => (props.active ? "#e0e0e0" : "transparent")};
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

const EditorContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  font-size: 16px;
  line-height: 1.5;
`;

const FontSizeSelect = styled.select`
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  ${({ className }) => className === "responsive-submit" && css`
    display: none;

    @media screen and (max-width: 900px) {
      display: block;
      margin: 0 0 0 20px;
    }
  `}

  ${({ className }) => className === "normal-submit" && css`
    display: block;

    @media screen and (max-width: 900px) {
      display: none;
    }
  `}

  &:hover {
    background-color: #0056b3;
  }
  
  @media screen and (max-width: 900px) {
    .normal-submit {
      display: none;
    }

    .responsive-submit {
      display: flex;
    }
  }
`;

export default See;
