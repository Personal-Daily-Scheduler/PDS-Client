import React, {
  useRef, useState, useCallback, useEffect,
} from 'react';
import styled from 'styled-components';
import { v4 as uuidV4 } from 'uuid';

import IconTextButton from '../../shared/IconButton';
import CommonButton from '../../shared/Button';
import ToastPopup from '../../shared/Toast';

import middleIcon from '../../assets/middle_align_icon.png';
import leftIcon from '../../assets/left_align_icon.png';
import rightIcon from '../../assets/right_align_icon.png';
import underlineIcon from '../../assets/underline_icon.png';
import boldIcon from '../../assets/bold_icon.png';
import italicIcon from '../../assets/italic_icon.png';
import fetchPostDiary from '../../services/diary/fetchPostDiary';

import useCalendarStore from '../../store/calender';
import useDiaryStore from '../../store/diary';

function See() {
  const [content, setContent] = useState('');
  const contentEditableRef = useRef(null);
  const [diaryId, setDiaryId] = useState('');
  const [toast, setToast] = useState({});

  const { selectedDate } = useCalendarStore();
  const { diaryByDates, saveDiary } = useDiaryStore();

  const getDiaries = () => {
    const dailyDiary = diaryByDates[selectedDate];

    if (dailyDiary) {
      const [diaryObjectId, diaryContent] = Object.entries(dailyDiary);

      return { [diaryObjectId]: diaryContent };
    }

    return null;
  };

  useEffect(() => {
    if (selectedDate && diaryByDates[selectedDate]) {
      const dairyDiaryObject = getDiaries();
      const [diaryObjectId, diaryContent] = Object.entries(dairyDiaryObject)[0];

      setDiaryId(diaryObjectId);
      setContent(diaryContent.styledContent || '');

      return;
    }

    setContent('');
    setDiaryId('');
  }, [selectedDate, diaryByDates]);

  const focusEditor = () => {
    contentEditableRef.current.focus({ preventScroll: true });
  };

  const applyStyle = (style) => {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(style, false, null);
    focusEditor();
  };

  const changeColor = (e) => {
    e.preventDefault();

    document.execCommand('foreColor', false, e.currentTarget.value);
    focusEditor();
  };

  const alignText = useCallback((alignment) => {
    document.execCommand(`justify${alignment.charAt(0).toUpperCase()}${alignment.slice(1)}`, false, null);
    focusEditor();
  }, []);

  const handleFontSizeChange = (e) => {
    document.execCommand('fontSize', false, e.currentTarget.value);
    focusEditor();
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const diaryObjectId = diaryId || uuidV4();

    const diaryObject = {
      diaryId: diaryObjectId,
      selectedDate,
      styledContent: contentEditableRef.current.innerHTML,
    };

    if (contentEditableRef.current.innerText) {
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

  return (
    <>
      <SeeContainer>
        <h2>Plan</h2>
        <TextArea>
          <ButtonWrapper>
            <Select onChange={handleFontSizeChange}>
              <Option value="">Size</Option>
              <Option value="1">10px</Option>
              <Option value="2">13px</Option>
              <Option value="3">16px</Option>
              <Option value="4">18px</Option>
              <Option value="5">24px</Option>
              <Option value="6">32px</Option>
              <Option value="7">48px</Option>
            </Select>
            <IconTextButton iconSrc={boldIcon} onClick={() => applyStyle('bold')} />
            <IconTextButton iconSrc={italicIcon} onClick={() => applyStyle('italic')} />
            <IconTextButton iconSrc={underlineIcon} onClick={() => applyStyle('underline')} />
            <IconTextButton iconSrc={leftIcon} onClick={() => alignText('left')} />
            <IconTextButton iconSrc={middleIcon} onClick={() => alignText('center')} />
            <IconTextButton iconSrc={rightIcon} onClick={() => alignText('right')} />
            <ColorButton value="#000000" onClick={changeColor}></ColorButton>
            <ColorButton value="#CCCCCC" onClick={changeColor}></ColorButton>
            <ColorButton value="#F03E3E" onClick={changeColor}></ColorButton>
            <ColorButton value="#1971C2" onClick={changeColor}></ColorButton>
            <ColorButton value="#37B24D" onClick={changeColor}></ColorButton>
          </ButtonWrapper>
          <EditorWrapper>
            <ContentEditable
              contentEditable
              ref={contentEditableRef}
              placeholder="Enter your text here..."
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </EditorWrapper>
          <CommonButton width="235px" height="30px" onClick={handleSubmitForm}>
            {'Save Change >'}
          </CommonButton>
        </TextArea>
      </SeeContainer>
      {toast.status && (
        <ToastPopup setToast={setToast} message={toast.message} />
      )}
    </>
  );
}

const ColorButton = styled.button`
  width: 15px;
  height: 15px;
  padding: 0;
  border: none;
  margin-right: 3px;
  background-color: ${({ value }) => value};
  cursor: pointer;
  border: 1px solid ${(props) => (props.active ? 'white' : 'black')};

  &:hover {
    border: 1px solid #d9d9d9;
  }
`;

const Select = styled.select`
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 3px;
  outline: none;
  cursor: pointer;
`;

const Option = styled.option`
  font-size: 8px;
`;

const EditorWrapper = styled.div`
  border: 1px solid #ccc;
  min-height: 450px;
  width: 260px;
  padding: 10px;
  margin-bottom: 16px;
`;

const ContentEditable = styled.div`
  height: fit-content;
  max-height: 500px;
  overflow-y: scroll;

  &:empty:before {
    content: attr(placeholder);
    color: #999;
  }

  & > div {
    outline: none;
  }
`;

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

const TextArea = styled.div`
  width: 280px;
  border: 1px solid black;
  height: 600px;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  padding: 8px;
  border-radius: 15px;
  background-color: #eeeeee;
`;

export default See;
