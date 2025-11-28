# 🎬 Netflix Clone — Team Groom

React + Vite 기반으로 제작된 **Netflix UI 클론 프로젝트**입니다.  
영화/TV 콘텐츠 리스트, 검색, 상세 페이지, 그리드 UI, 슬라이드 UI, Docker 배포 환경까지  
실제 넷플릭스 서비스 흐름을 최대한 유사하게 구현했습니다.

---

# 🧩 주요 기능 (Features)

### ⭐ 메인 화면(Home)
- 카테고리별 영화/TV 리스트를 **슬라이드(Row)** 형태로 표시
- Trending, Action, Comedy, Horror, Romance 등 자동 로드
- 배너(Banner) 영역에서 랜덤 콘텐츠 표시

### ⭐ 검색(Search)
- 검색창 입력 시 TMDB API 기반 실시간 콘텐츠 로드
- 검색 결과는 **그리드(Grid)** 방식으로 표시
- 반응형 대응(데스크탑/모바일)

### ⭐ 상세 페이지(Detail Page)
- 확장형 상세 레이아웃
- 포스터 / 대표 이미지 / 줄거리 / 장르 / 출연진 / 감독 표시
- 추천 콘텐츠(비슷한 영화) 그리드 형식으로 노출
- 예고편 영상 트레일러 삽입 가능한 구조 구성

### ⭐ 키즈 메뉴(Kids)
- `/kids` 전용 라우트 추가
- 상단 문구:
키즈 전용 콘텐츠
전체관람가 및 12세 이하 관람가 작품을 모아 보여드립니다.

markdown
코드 복사
- "키즈 추천" 섹션 추가 (Grid 기반)
- 네비게이션에서 Kids 메뉴 클릭 시 별도 페이지 이동 및 active 스타일 적용

### ⭐ 네비게이션(Nav)
- 반응형 개선(글자 너무 작아지는 문제 해결)
- 검색창 인터랙션
- Kids 전용 메뉴 추가
- Netflix favicon 변경 (`nficon2016.ico`)

### ⭐ 카테고리 페이지(Category)
- 기존 Row 방식 → **Grid 방식**으로 개편

### ⭐ 도커(Docker) 배포 구성
- Node 빌드 → Nginx 정적 호스팅 이미지 생성
- `docker run` → `localhost:8080`에서 실행 가능

---

# 🛠 기술 스택 (Tech Stack)

- **React (Vite)**
- **React Router**
- **Axios**
- **CSS Modules / Custom CSS**
- **JavaScript (ES6+)**
- **TMDB API**
- **Docker + Nginx**
- **Git & GitHub**
- **Node 18+ / Node 20+ 호환**

---

# 🚀 설치 및 실행 방법 (Development Setup)

```bash
git clone https://github.com/groom-for/netflix.git
cd netflix
npm install
npm run dev

▶ 주요 스크립트
npm run dev	Vite 개발 서버 실행 (기본 포트 5173)
npm run build	프로덕션 빌드(dist/) 생성
npm run preview	빌드 결과 로컬 미리 보기

🐳 Docker 사용법 (Build & Run)

1) 프로덕션 빌드
npm run build
docker build -t netflix-clone .

2) 실행
docker run --rm -p 8080:80 netflix-clone

3) 접속
arduino
http://localhost:8080

📁 프로젝트 구조 (Project Structure)
/public
  └── nficon2016.ico
/src
  /api
  /components
  /pages
  /hooks
  /types
Dockerfile
dockerignore
tsconfig.json
vite.config.js
index.html
