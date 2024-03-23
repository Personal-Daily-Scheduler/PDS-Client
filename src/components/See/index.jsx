import React, {
  useRef, useState, useCallback, useLayoutEffect, useEffect,
} from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import ToastPopup from '../../shared/Toast';
import focusContentEditableTextToEnd from '../../utils/focusContentEditable';
import textEditorUtils from '../../utils/textEditor';
import fetchPostDiary from '../../services/diary/fetchPostDiary';

import useCalendarStore from '../../store/calender';
import useDiaryStore from '../../store/diary';
import EmojiPicker from '../EmojiPicker';
import Toolbar from '../Toolbar';

function See() {
  const [toast, setToast] = useState({});
  const [diaryId, setDiaryId] = useState('');
  const [activeBold, setActiveBold] = useState(false);
  const [activeItalic, setActiveItalic] = useState(false);
  const [activeUnderline, setActiveUnderline] = useState(false);
  const [activeFontSize, setActiveFontSize] = useState('16px');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const editorRef = useRef(null);

  const { selectedDate } = useCalendarStore();
  const { diaryByDates, saveDiary } = useDiaryStore();

  useEffect(() => {
    if (selectedDate && diaryByDates[selectedDate]) {
      const [diaryObjectId, diaryObject] = Object.entries(diaryByDates[selectedDate])[0];

      setDiaryId(diaryObjectId);
      setText(diaryObject.styledContent || '');

      return;
    }

    setText('');
    setDiaryId('');
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

  const handleTextChange = () => {
    if (!isComposing) {
      setText(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const newLine = document.createElement('div');
      newLine.innerHTML = '<br>';

      range.deleteContents();
      range.insertNode(newLine);
      range.setStartAfter(newLine);
      range.setEndAfter(newLine);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleColorStyle = (value, range) => {
    const fragment = range.extractContents();
    const newElement = document.createElement('span');

    newElement.style.color = value;
    newElement.appendChild(fragment);
    range.insertNode(newElement);
  };

  const handleOtherStyles = (style, startSpan, range, selection) => {
    const styledText = startSpan.innerHTML;
    const unstyledText = textEditorUtils.removeStyleTags(styledText, style);
    const cleanedText = textEditorUtils.removeEmptySpanTags(unstyledText);
    const newTextNode = document.createTextNode(cleanedText);

    startSpan.parentNode.replaceChild(newTextNode, startSpan);

    const newRange = document.createRange();
    newRange.selectNodeContents(newTextNode);

    selection.removeAllRanges();
    selection.addRange(newRange);
  };

  const handleSameSpan = (style, value, startSpan, endSpan, range, selection) => {
    if (startSpan && endSpan && startSpan === endSpan) {
      if (style === 'color') {
        handleColorStyle(value, range);
      } else {
        handleOtherStyles(style, startSpan, range, selection);
      }
    }
  };

  const processSpanNode = (style, value, node, newElement) => {
    const styles = node.style;
    let isStyleApplied = false;

    for (let i = 0; i < styles.length; i += 1) {
      const existingStyle = styles[i];

      if (existingStyle === style) {
        isStyleApplied = true;
        while (node.firstChild) {
          newElement.appendChild(node.firstChild);
        }
        break;
      }
    }

    if (!isStyleApplied) {
      const styledNode = node.cloneNode(true);

      styledNode.style[style] = textEditorUtils.getStyleValue(style);
      newElement.appendChild(styledNode);
    }
  };

  const processNodes = (style, value, nodes, newElement) => {
    Array.from(nodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node.cloneNode(true);

        newElement.appendChild(textNode);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'SPAN') {
          processSpanNode(style, value, node, newElement);
        } else {
          const childNodes = Array.from(node.childNodes);

          if (style === 'fontSize') {
            const styledNode = node.cloneNode(true);

            styledNode.style.fontSize = value;

            newElement.appendChild(styledNode);
            processNodes(style, value, childNodes, styledNode);
          } else {
            processNodes(style, value, childNodes, newElement);
          }
        }
      }
    });
  };

  const handleDifferentSpan = (style, value, startSpan, endSpan, range, selection) => {
    if (!startSpan || !endSpan || startSpan !== endSpan) {
      const fragment = range.cloneContents();
      const newElement = document.createElement('span');

      processNodes(style, value, fragment.childNodes, newElement);

      range.deleteContents();
      range.insertNode(newElement);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const updateActiveStyles = (style, value) => {
    if (style === 'fontWeight') {
      setActiveBold(!activeBold);
    } else if (style === 'fontStyle') {
      setActiveItalic(!activeItalic);
    } else if (style === 'textDecoration') {
      setActiveUnderline(!activeUnderline);
    } else if (style === 'fontSize') {
      setActiveFontSize(value);
    }
  };

  const handleStyleChange = (style, value) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText.length === 0) return;

    const { startContainer } = range;
    const { endContainer } = range;

    const startSpan = textEditorUtils.findParentSpan(startContainer, style);
    const endSpan = textEditorUtils.findParentSpan(endContainer, style);

    handleSameSpan(style, value, startSpan, endSpan, range, selection);
    handleDifferentSpan(style, value, startSpan, endSpan, range, selection);

    setText(editorRef.current.innerHTML);
    updateActiveStyles(style, value);
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

      setToast({ status: true, message: '다이어리가 저장되었습니다.' });

      const memberUser = JSON.parse(sessionStorage.getItem('authenticatedUser'));

      if (memberUser) {
        const fetchDiaryData = await fetchPostDiary(diaryObject, memberUser);

        if (!fetchDiaryData.result) {
          setToast({ status: true, message: '저장에 실패했습니다.' });
        }
      }

      return;
    }

    setToast({ status: true, message: '작성된 다이어리가 없습니다.' });
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
        <h2>See</h2>
        <EditorWrapper>
          <EditorContainer>
            <Toolbar
              showEmojiPicker={showEmojiPicker}
              setShowEmojiPicker={setShowEmojiPicker}
              handleStyleChange={handleStyleChange}
              activeBold={activeBold}
              activeItalic={activeItalic}
              activeUnderline={activeUnderline}
              activeFontSize={activeFontSize}
              setActiveFontSize={setActiveFontSize}
            />
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
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        </EditorWrapper>
      </SeeContainer>
      {toast.status && (
        <ToastPopup setToast={setToast} message={toast.message} />
      )}
    </>
  );
}

const SeeContainer = styled.div`
  margin: 40px;
  border: 2px solid #ccc;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  position: relative;
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  background-color: #f5f5f5;
`;

const EditorContainer = styled.div`
  width: 280px;
  height: 600px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const EditorContent = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  font-size: 16px;
  line-height: 1.5;
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

  &:hover {
    background-color: #0056b3;
  }
`;

export default See;
