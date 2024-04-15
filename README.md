# PDS Diary

![transparent](https://capsule-render.vercel.app/api?type=transparent&fontColor=ffffff&text=P.D.S%20Diary&height=220&fontSize=80&desc=Plan.%20Do.%20See.&descAlignY=75&descAlign=65)

### 🔗 Depoly URL : https://www.pdsdiary.com

<br />

## Content
- ### 🚀 Stacks
- ### 💡 Motivation
- ### ⚒️ Feature
- ### 🔥 Challenges
- ### ✍️ Memoir

<br />

## 🚀 Stacks

### FrontEnd
<div style="display:flex;">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">&nbsp;
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">&nbsp;
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/zustand-black?style=for-the-badge&logo=&logoColor=white">&nbsp;
</div>

### BackEnd

<div style="display:flex;">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/mongo DB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=Express&logoColor=white">&nbsp;
  <img src="https://img.shields.io/badge/mongoose-880000?style=for-the-badge&logo=Mongoose&logoColor=white">
</div>

<br />

## 💡 Motivation

하루 시간관리를 위해 사용했던 다이어리를 웹으로 구현하고자 했습니다. <br />
다이어리를 웹으로 구현하면서 차별점을 두고자 했던 부분은 다음과 같습니다. <br />

### 1) 간편한 UI/UX
일일히 일정을 손으로 기록할때보다 웹에서는 조금더 편리하게 사용할 수 있도록
자연스러운 사용자 경험에 초점을 두었습니다.<br />

일정 연동, 복사 기능을 통해서 일정에 변경 사항이 생겼을때, 동기화하여서
간편하게 일정 관리 할수 있도록 하였습니다.<br />

<br />

## ⚒️ Feature

### 1) 스케줄 복사 기능

<img src="src/assets/readme/schedule_copy.gif" height="500" alt="스케쥴 복사 기능"/>

→ 사용자가 추가한 스타일과 일정을 특정 시간에 붙여넣기 할 수 있습니다.<br />
> 클립보드에 복사된 이벤트가 있으면 붙여넣기 할수있는 버튼이 렌더됩니다.<br />
> 추가하려는 시간에 기존 이벤트가 존재하면 에러 토스트가 렌더링됩니다.
<br />

### 2) 일정 연동 기능

<img src="src/assets/readme/schedule_sync_delete.gif" width="700" alt="일정 연동 기능"/>

→ 사용자가 Plan 섹션에서 일정 추가시 연동 버튼을 누르면 Do 섹션의 동일한 시간에 이벤트가 추가되고 일정이 변경되는 경우 동기화되어서 적용됩니다.<br />
> 빨간색 테두리는 이전 버전과 대비하여 이후버전에서 변경사항이 생긴 요소 입니다. <br />
> 초록색 테두리는 이전 버전에는 존재하지 않았으나, 이후 버전에서 새롭게 추가된 요소입니다.

각각의 테두리에 마우스를 hover할 시 디테일한 변경사항을 표시해줍니다.

<br />

### 3) 일정 삭제 기능

<img src="src/assets/readme/schedule_delete.gif" height="500" alt="일정 삭제 기능"/>

→ Do 섹션에서 일정 삭제시 해당 일정에 해당하는 모든 시간 셀이 선택되고 일정을 삭제하거나 수정할수 있습니다. <br />
> 일정 선택시 작업을 선택할수 있는 모달창이 렌더 됩니다. <br />
> 기존에 복사된 일정이 있더라도 복사된 일정을 덮어쓰기 할 수 있습니다. <br />

## 🔥 Challenge

### 1. 어떻게 일정이 포함된 시간셀을 선택하게 할 수 있을까?

사용자가 10분단위로 일정을 추가하기 위해서 Do섹션에 렌더되어있는 각각의 셀들을 드래그 해서 일정을 추가하는 기능을 구현해야 했습니다. <br />

각각의 셀에는 이벤트가 존재 여부에 따라서 다른 작업을 선택할수 있도록 이벤트 정보와 시간셀의 정보를 가지고 있어야 했습니다. <br />

그래서 24시간을 10분단위로 나누어 144개의 인덱스에 시간정보와 이벤트 정보를 담고있는 Map 자료 구조를 전역상태로 관리하므로 사용자가 선택한 날짜에 해당하는 일정에 따라서 전역상태를 업데이트하여서 렌더링 되도록 하였습니다.

### 1-1. 셀의 드래그를 어떻게 구현 할 수 있을까?

사용자가 드래그한 시간을 시각적으로 확인할수 있도록 드래그한 영역의 스타일이 변경되도록 구현했어야 했습니다. <br /> 각각의 셀마다 dragEnd, mouseEnter, mouseDown 이벤트 핸들러를 만들어 처음 클릭한 셀과 드래그가 종료되었을 때의 셀의 인덱스 차를 계산하여서 드래그한 셀의 범위를 계산할수 있었습니다.


### 1-2. 드래그의 방향은 어떻게 판별 할수 있을까?
사용자가 역방향으로 드래그를 할 수도 있고 정방향으로 드래그를 할 수도 있기 때문에 드래그하는 경우에 따라서 현재 드래그 하고있는 셀의 범위를 다르게 설정 했어야 했습니다. <br />

처음 클릭한 셀의 인덱스가 드래그를 마쳤을때의 셀의 인덱스보다 작다면 역방향 드래그 <br />
처음 클릭한 셀의 인덱스가 드래그를 마쳤을때의 셀의 인덱스보다 크다면 정방향 드래그 <br />
여러가지 드래그 경우에 따라 다르게 로직을 적용하였습니다.

```javascript
const isForwardSelection = timeCell.index > startIndex && timeCell.index > endIndex;

if (isForwardSelection) {
    if (startCell > endCell) {
        return Array.from({
        length: timeCell.index - startCell.index + 1,
        }, (_, index) => index + startCell.index);
    }

    return Array.from({
        length: timeCell.index - startIndex + 1,
    }, (_, index) => index + startIndex);
}

const isBackwardSelection = timeCell.index < startIndex && timeCell.index < endIndex;

if (isBackwardSelection) {
    return Array.from({
        length: startCell.index - timeCell.index + 1,
    }, (_, index) => index + timeCell.index);
}
```

### 2. textEditor 어떻게 구현 할 수 있을까?

서비스 메인 페이지에서 하루 일정을 회고할수 있는 See 섹션에서 텍스트 작성을 위해서 사용자가 간단히 스타일을 적용할 수 있는 Text editor를 구현해야 했습니다. <br />

처음에는 execCommand() 를 사용해서 사용자가 입력한 텍스트를 직접 스타일을 적용해서 Dom을 수정하려고 했으나 react에서는 직접적으로 dom을 조작하기 보다 상태 변경을 통해 Virtual DOM을 업데이트하고, 리렌더링 함으로서 실제 DOM을 업데이트해서 UI를 렌더링하는 것을 권장하기 때문에 사용자가 적용하는 스타일을 상태로 관리하여서 적용하도록 했습니다. <br />


## 🗓️ 일정 
프로젝트 기간: 2024.03.04(월) ~ 2024.03.27(수) <br />
<br />
1 주차: 아이디어 선정, POC, 목업 및 API 명세서, DB 스키마 설계 <br />
2 주차: 클라이언트 구현 및 서버 구현 <br />
3주차: 클라이언트, 서버 배포 및 CI/CD 배포 자동화 설정 <br />

## ✍️ 회고

<details><summary>고경준</summary>
팀 프로젝트와 다르게 개인 프로젝트는 기획부터 배포 운영까지 모두 혼자서 책임져야 했었기 때문에 기획했던 일정에 차질이 생기지 않도록 개인적인 시간관리에 중요성에 대해서 배우게 되었습니다. <br />

하나의 기능을 구현할때 발생하는 버그를 모두 고치고 다음 기능을 구현해야 할지 고민 하는 과정이 많앟고 기한내에 프로젝트를 구현하기 위해서 서비스 플로우에 큰 영향을 끼지 않는 버그사항은 따로 기록해서 배포 후에 수정하는 과정을 가지게 되었습니다.  <br />

평소에 당연하게 사용했었던 texteditor 기능과 셀 드래그 기능을 직접 구현해 보면서 간단해보이는 기능안에도 수많은 기능들이 들어가있고 자연스러운 사용자 경험을 위해서는 사소한 경우까지 모두 고려해야 한다는것을 배우게 되는 경험이었습니다. <br />
<br />


</details>
