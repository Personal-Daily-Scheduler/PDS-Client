# PDS Diary

![transparent](https://capsule-render.vercel.app/api?type=transparent&fontColor=ffffff&text=P.D.S%20Diary&height=220&fontSize=80&desc=Plan.%20Do.%20See.&descAlignY=75&descAlign=65)

### 🔗 Depoly URL : https://www.pdsdiary.com

<br />

## 💼 목차
- ### [🚀 기술 스택](#🚀-기술-스택)
- ### [💡 기획 동기](#💡-기획-동기)
- ### [⚒️ 기능 소개](#⚒️-기능-소개)
- ### [🔥 기술 챌린지](#🔥-기술-챌린지)
  - [1. ⏱️ 시간 셀 렌더링](#1-⏱️-시간-셀-렌더링)
  - [2. ⇱ 시간 셀의 드래그 기능](#2-⇱-시간-셀의-드래그-기능)
  - [3. 시간 셀의 일정 관리는 어떻게 해야할까?](#3-시간-셀의-일정-관리는-어떻게-해야할까)
  - [4. 📝 textEditor 어떻게 구현 할 수 있을까?](#4-📝-texteditor-어떻게-구현-할-수-있을까)

- ### [✍️ 회고](#✍️-회고)

<br />

## 🚀 기술 스택

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

## 💡 기획 동기

하루 시간관리를 위해 사용했던 다이어리를 웹으로 구현하고자 했습니다. <br />
다이어리를 웹으로 구현하면서 차별점을 두고자 했던 부분은 다음과 같습니다. <br />

### 1) 간편한 UI/UX
웹에서 일정 관리를 할때는 손으로 기록할 때보다 편리해야 한다고 생각했습니다.<br />
그래서 일정을 추가하거나 삭제할때 자연스러운 사용자 경험에 초점을 두었습니다.

### 2) 효율적인 일정 관리
일정 복사 기능을 통해서 이미 추가된 일정을 재사용 할수 있게 하였습니다. <br />
일정 연동 기능을 통해서 변경 사항이 생겼을때 간편하게 수정할 수 있도록 했습니다.<br />


<br />

## ⚒️ 기능 소개

### 1) 스케줄 복사 기능
<details>
  <summary>🎥 시연 영상</summary>
  <p>
    <img src="src/assets/readme/schedule_copy.gif" height="500" alt="스케쥴 복사 기능"/>
  </p>
</details>

→ 사용자가 추가한 스타일과 일정을 특정 시간에 붙여넣기 할 수 있습니다.<br />
> 클립보드에 복사된 이벤트가 있으면 붙여넣기 할수있는 버튼이 렌더됩니다.<br />
> 추가하려는 시간에 기존 이벤트가 존재하면 에러 토스트가 렌더링됩니다.
<br />

### 2) 일정 연동 기능

<details>
  <summary>🎥 시연 영상</summary>
  <p>
    <img src="src/assets/readme/schedule_sync_delete.gif" width="700" alt="일정 연동 기능"/>
  </p>
</details>

→ 사용자가 Plan 섹션에서 일정 추가시 연동 버튼을 누르면 Do 섹션의 동일한 시간에 이벤트가 추가되고 일정이 변경되는 경우 동기화되어서 적용됩니다.<br />
> 빨간색 테두리는 이전 버전과 대비하여 이후버전에서 변경사항이 생긴 요소 입니다. <br />
> 초록색 테두리는 이전 버전에는 존재하지 않았으나, 이후 버전에서 새롭게 추가된 요소입니다.

<br />

### 3) 일정 삭제 기능

<details>
  <summary>🎥 시연 영상</summary>
  <p>
    <img src="src/assets/readme/schedule_delete.gif" height="500" alt="일정 삭제 기능"/>
  </p>
</details>

→ Do 섹션에서 일정 삭제시 해당 일정에 해당하는 모든 시간 셀이 선택되고 일정을 삭제하거나 수정할수 있습니다. <br />
> 일정 선택시 작업을 선택할수 있는 모달창이 렌더 됩니다. <br />
> 기존에 복사된 일정이 있더라도 복사된 일정을 덮어쓰기 할 수 있습니다. <br />

### 4) 텍스트 편집 기능

<details>
  <summary>🎥 시연 영상</summary>
  <p>
    <img src="src/assets/readme/text_editor.gif" height="500" alt="일정 삭제 기능"/>
  </p>
</details>

→ See 섹션에서 사용자가 하루 일정에 대한 리뷰를 작성 할 수 있습니다.<br />
> 사용자가 선택한 글자의 영역에 스타일이 적용됩니다.<br />
> 기존에 복사된 일정이 있더라도 복사된 일정을 덮어쓰기 할 수 있습니다. <br />


## 🔥 기술 챌린지

### 1. ⏱️ 시간 셀 렌더링
10분 단위의 시간정보를 가진 Map 데이터를 시간 셀로 렌더링 하기까지 시간 셀 데이터가 바뀌는 과정을 정리해 보았습니다.

> 1️⃣ 1시간을 6칸으로 나눠서 세로로 24번 반복 렌더링 하기

처음에는 6 * 24 의 표 형태로 렌더링 하기 위해서 렌더링 되는 구조만을 고려해서 1시간씩 10분 단위로 시간 정보를 가지고 있는 24시간의 배열 데이터를 반복 렌더링 했습니다.

```js
const time = [
  {01:00 : [0,10,20,30,40,50]},
  {01:00 : [0,10,20,30,40,50]},
  ...
]
```

🚫 문제 발생 :
  - 시간마다 데이터를 반복 렌더링 할때마다 공통으로 사용되는 이벤트 핸들러를 Prop으로 추가 해주어야 하기 때문에 코드의 가독성이 낮아진다고 판단했습니다.
  - 연속적인 드래그 기능을 구현하기 위해서 사용자가 드래그 한 시간이 다음 행의 시간으로 넘어가는 경우에 사용자가 드래그한 시간을 특정 짓기 위해서 다시 시간 데이터를 순회하는 추가 로직이 필요했습니다.


> 2️⃣ 24시간을 10분으로 나눈 144개의 인덱스를 반복 렌더링 하기

24시간을 10분으로 나누어서 144개의 키값을 가지는 데이터를 만들어서 객체를 순회하면서 6 * 24 개의 형태로 렌더링 하였습니다.

```js
const time = {
  "00:00" : {time: "00:00", event: null},
  "00:10" : {time: "00:10", event: null},
  ...
}
```

- 하나의 행에는 6칸이 넘어가는 경우 다음 행으로 줄바꿈 되어서 시간 셀이 렌더링 되게 하기 위해서 하나의 행에 width 값을 지정해서 `flex-wrap: wrap` CSS 속성을 추가해서 한 행의 가로 길이를 넘어가면 다음줄로 줄바꿈 되서 렌더링 되도록 하였습니다.

> 3️⃣ Object는 생성된 순서를 보장하지 않아요

🚫 문제 발생 :
  - Object는 인덱스가 없으므로 특정 시간을 가진 키값의 데이터에 접근하기 위해서 반복문을 통해서 데이터에 접근해야 했습니다.
  
  - 이는 특정 시간의 이벤트에 변동사항이 생기는 경우 객체의 키값을 재할당후 렌더링 할때 시간의 연속성을 보장되지 않는 문제가 발생했습니다.

✅ 문제 해결 :
  - 시간 데이터를 Map 구조로 변경해 인덱스마다 시간셀의 정보를 가지게 하여서 목록 렌더링시 시간의 연속성을 보장 할 수도 있고 Object의 특성을 사용 해서 특정 인덱스의 시간에 빠르게 접근할 수 있었습니다.

### 2. ⇱ 시간 셀의 드래그 기능
사용자가 드래그한 시간 셀의 영역 만큼 시간을 특정지어서 일정을 추가할수 있게 하기 위해서 드래그 기능을 구현 하면서 아래와 같은 사고 과정을 거쳤습니다.

> 1️⃣ 어떻게 연속된 드래그를 구현 할 수 있을까?

사용자가 인식하는 드래그의 기능은 드래그 하는만큼 UI가 바뀌어야 했음을 의미합니다.

  - 브라우저에서는 다양한 드래그 이벤트를 지원하고 있습니다. 드래그 핸들링을 작성 해서 드래그 된 영역에 스타일을 다르게 적용해서 드래그 된 영역을 알 수 있게 했습니다.
  - 드래그를 시작했을때 선택된 인덱스 정보를 `useRef` 를 사용해서 저장하게 하였고 드래그를 마쳤을때 인덱스 차를 구해서 사용자가 드래그 한 시간을 특정 지을 수 있었습니다.

> 2️⃣ 드래그의 방향을 어떻게 판별 할 수 있을까?
 
 사용자는 드래그를 뒤에서 앞으로 역방향으로 할 수도 있고 앞에서 뒤로 정방향으로 할수도 있는데 이에 따라 시간을 특정짓는 로직을 다르게 적용해야 했습니다.
 

```javascript
// 정방향 드래그 로직
const isForwardSelection = timeCell.index > startIndex && timeCell.index > endIndex;

...


// 역방향 드래그 로직
const isBackwardSelection = timeCell.index < startIndex && timeCell.index < endIndex;

...
```

  - 드래그를 처음 시작한 인덱스를 기준으로 드래그를 마쳤을때 인덱스의 크기를 비교해서 역방향인지 정방향인지 판단하였습니다.

    - 드래그 시작 인덱스 < 드래그를 마쳤을때 인덱스 => ⬅️ 역방향 드래그 <br />
    - 드래그 시작 인덱스 > 드래그를 마쳤을때 인덱스 => ➡️ 정방향 드래그 <br />

### 3. 시간 셀의 일정 관리는 어떻게 해야할까?

144개의 인덱스를 가진 시간정보 Map 데이터를 전역상태로 관리하여서 각각의 셀의 인덱스마다 이벤트 정보와 시간셀의 정보를 가지고 있어서 이벤트가 존재 여부에 따라서 다른 작업을 선택할수 있도록 하였습니다.<br />

|이벤트가 존재하는 경우|이벤트가 존재하지 않는 경우|
| ---- | ---- |
|![image](https://github.com/Figci/Figci-Client/assets/95596243/e488f6d6-4fa8-4d33-94a5-55290740e9b6)|![image](https://github.com/Figci/Figci-Client/assets/95596243/46a8634d-62ba-49f7-a8f7-3023ff0c1461)|

- **이벤트 변동시** <br />
 특정 시간 셀의 이벤트 변동시 전역상태로 관리하고있는 시간정보 Map 데이터를 업데이트 하여서 리렌더링 되어서 변경된 일정이 적용됩니다.
 
- **이벤트 선택시** <br />
  이벤트가 존재하는 시간셀을 선택했을때 이벤트의 시작시간 인덱스와 종료시간의 인덱스의 차이를 구해서 해당 인덱스에 해당하는 시간셀의 스타일을 다르게 적용해서 이벤트가 전체 선택되는 UI를 구현했습니다.

### 4. 📝 textEditor 어떻게 구현 할 수 있을까?

서비스 메인 페이지에서 하루 일정을 회고할수 있는 See 섹션에서 텍스트 작성을 위해서 사용자가 간단히 스타일을 적용할 수 있는 Text editor를 구현해야 했습니다. <br />

처음에는 execCommand() 를 사용해서 사용자가 입력한 텍스트를 직접 스타일을 적용해서 Dom을 수정하려고 했으나 react에서는 직접적으로 dom을 조작하기 보다 상태 변경을 통해 Virtual DOM을 업데이트하고, 리렌더링 함으로서 실제 DOM을 업데이트해서 UI를 렌더링하는 것을 권장하기 때문에 사용자가 적용하는 스타일을 상태로 관리하여서 적용하도록 했습니다. <br />


## 🗓️ 개발 일정
프로젝트 기간: 2024.03.04(월) ~ 2024.03.27(수) (3주) <br />
<br />
1주차 : 아이디어 선정, POC, API 명세서, DB 스키마 설계 <br />
2주차 : 클라이언트 구현 및 서버 구현 <br />
3주차 : 클라이언트, 서버 배포 및 CI/CD 배포 자동화 설정 <br />

## ✍️ 회고

<details><summary>고경준</summary>
개인 프로젝트는 기획부터 배포 운영까지 모두 혼자서 책임져야 했었기 때문에 기획했던 일정에 차질이 생기지 않도록 시간관리에 중요성에 대해서 배우게 되었습니다.
<br />

기한 내에 프로젝트를 구현하기 위해서 기능 구현을 우선순위로 정하고 서비스 플로우에 큰 영향을 끼지 않는 UX 개선사항은 따로 기록해서 배포 후에 수정하는 과정을 가지게 되었습니다.  <br />

평소에 당연하게 사용했었던 텍스트 에디터와 드래그 앤 드랍 기능을 직접 구현해 보면서 간단해보이는 기능안에도 자연스러운 사용자 경험을 구현하기 위해서 사소한 경우까지 모두 고려해야 한다는 점을 배우게 되었습니다.
<br />
<br />

</details>