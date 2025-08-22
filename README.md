# 📚 세종말싸미 프론트엔드 📚

<!-- 수정하지마세요 자동으로 동기화 됩니다 -->
## 최신 버전 : v0.1.8 (2025-08-22)
[전체 버전 기록 보기](CHANGELOG.md)

**세종말싸미**는 세종대학교 학생들을 위한 최적의 **학업증진 플랫폼**으로, 학생들이 자신이 공부한 자료를 자유롭게 공유하고 열람할 수 있는 웹 서비스입니다. **세종말싸미**라는 이름은 세종대왕님의 **훈민정음 해례본 나랏말싸미 듕귁에 달아**에서 영감을 받아, 세종대학교 학생들의 지식과 언어를 함께 나누는 공간을 의미합니다. 이 프론트엔드 레포지토리는 **세종말싸미**의 사용자 인터페이스를 담당하며, 직관적이고 편리한 사용자 경험을 제공하는 것을 목표로 하고 있습니다.

## 📝 주요 기능

### **자료 공유 및 다운로드**

학생들이 직접 업로드한 다양한 학습 자료를 손쉽게 찾아보고 다운로드할 수 있습니다. **세종말싸미**는 자료의 등급 시스템을 도입하여, 모든 자료는 **천민**, **중인**, **양반**, **왕**의 4단계로 분류됩니다. 자료는 좋아요 수에 따라 등급이 상승하며, 관리자가 임의로 등급을 조정할 수 있습니다. 이를 통해 질 높은 자료를 쉽게 찾을 수 있습니다.

### **질문 & 답변 커뮤니티**

학업 관련 궁금한 점을 질문하고, 다른 학생들의 답변을 통해 함께 성장하세요. 질문을 올리기 위해서는 **엽전**이 필요하며, 답변이 채택되면 **엽전**을 보상으로 받을 수 있습니다. 또한, 질문 시 엽전 현상금을 걸어 더 많은 관심과 답변을 유도할 수 있습니다. **엽전**은 **포인트** 개념으로, 활동에 따라 적립하고 다양한 기능을 활용하는 데 사용됩니다.

### **엽전 시스템**

**엽전**은 **세종말싸미**의 핵심 포인트 시스템으로, 다양한 활동을 통해 엽전을 적립하고 사용할 수 있습니다. 엽전을 얻는 방법은 다음과 같습니다:

- **매일 첫 로그인 보너스**: 매일 첫 로그인을 통해 엽전을 보상으로 받습니다.
- **좋아요 받기**: 업로드한 자료나 작성한 답변이 좋아요를 받을 때마다 엽전을 적립합니다.
- **답변 채택**: 다른 학생의 질문에 유익한 답변을 채택하면 엽전을 획득할 수 있습니다.

엽전을 사용하여 질문을 올리거나, 다양한 학습 자료를 구매할 수 있습니다. 이는 학업 활동을 더욱 적극적으로 참여하게 만들며, 학습 효율을 높이는 데 기여합니다.

### **실시간 알림**

웹소켓을 이용한 **실시간 알림** 기능으로 중요한 소식을 즉시 받아볼 수 있습니다. 새로운 답변, 좋아요, 엽전 적립 등 다양한 활동에 대한 알림을 실시간으로 받아보세요.

### **사용자 인증 및 권한 관리**

**JWT**와 **Spring Security**를 활용한 안전한 인증 및 권한 관리 시스템을 제공합니다. **Refresh Token**은 쿠키에 저장되고, **Access Token**은 요청의 본문(body)에 포함되어 전송됩니다. 이를 통해 사용자 데이터의 보안을 강화하고, 원활한 인증 절차를 보장합니다.

### **경험치 및 뱃지 시스템**

회원들은 **경험치**를 쌓아 다양한 **뱃지**를 획득할 수 있습니다. 경험치는 조선시대 관리직 등급을 모티브로 한 **18가지 등급**으로 구성되어 있으며, 사용자는 자신의 경험치와 뱃지를 마이페이지에서 확인하고 자랑할 수 있습니다. 경험치 등급은 활동에 따라 상승하며, 이는 사용자 간의 경쟁과 참여를 촉진합니다.

### **마이페이지**

마이페이지에서는 사용자의 **엽전 사용 내역**, **구매한 자료 내역**, **경험치 및 뱃지** 등을 한눈에 확인할 수 있습니다. 이를 통해 사용자는 자신의 활동을 관리하고, 필요한 정보를 쉽게 접근할 수 있습니다.

### **자료 구매 시스템**

자료게시판에서는 다양한 학습 자료를 **엽전**을 사용하여 구매할 수 있습니다. 각 자료는 등급이 부여되어 있어, 높은 등급의 자료일수록 더 많은 엽전이 필요하지만, 그만큼 유용한 정보를 제공합니다. 이를 통해 사용자는 필요한 자료를 효율적으로 관리하고 활용할 수 있습니다.

**세종말싸미**는 이러한 다양한 기능들을 통해 세종대학교 학생들의 학업을 지원하고, 지식 공유의 장을 제공하고자 합니다. 지속적인 업데이트와 개선을 통해 더욱 편리하고 유용한 플랫폼으로 발전해 나가겠습니다.

<br/>

> <p style="color:gray; font-weight:bold;">개발기간: 2024.09.04 ~ 현재 </p>

## 🙋🏻‍♀️ 팀원 소개

<table>
    <tr>
        <td align="center">이유진</td>
        <td align="center">손재호</td>
        <td align="center">서새찬</td>
        <td align="center">백지훈</td>
        <td align="center">백민홍</td>
        <td align="center">김성림</td>
        <td align="center">이예진</td>
        <td align="center">지희</td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/newjinlee">@newjinlee</a></td>
        <td align="center"><a href="https://github.com/thswogh">@thswogh</a></td>
        <td align="center"><a href="https://github.com/Cassiiopeia">@Cassiiopeia</a></td>
        <td align="center"><a href="https://github.com/Chuseok22">@Chuseok22</a></td>
        <td align="center"><a href="https://github.com/minhong620">@minhong620</a></td>
        <td align="center"><a href="https://github.com/seonglim">@seonglim</a></td>
        <td align="center"><a href="https://github.com/Vhime">@Vhime</a></td>
        <td align="center"><a href="https://github.com/jihee127">@jihee127</a></td>
    </tr>
    <tr>
        <td>프론트엔드 개발 담당</td>
        <td>프론트엔드 개발 담당</td>
        <td>서버 개발 담당</td>
        <td>서버 개발 담당</td>
        <td>서버 개발 담당</td>
        <td>디자인 담당</td>
        <td>디자인 담당</td>
        <td>디자인 담당</td>
    </tr>
</table>

## 💻 기술 스택

**프론트엔드 개발에는 다음과 같은 기술을 사용했습니다**

<div align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
</div>
<div align="left">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" alt="Prettier" />
</div>

## 🚀 설치 및 실행

### [임시 배포 사이트](https://test.sejong-malsami.co.kr)

**가짜회원 로그인 정보**

아이디: 99999999  
비밀번호: 99999999
