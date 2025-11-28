# Netflix Clone 프로젝트 🎬

이 저장소는 React 기반으로 만든 **넷플릭스(Netflix) UI 클론 프로젝트**입니다.  
영화/TV 콘텐츠 리스트, 슬라이드 UI, 간단한 API 연동 등을 통해 실제 넷플릭스와 비슷한 경험을 구현했습니다.

---

## 🧩 기능  
- 메인 화면에서 영화/TV 콘텐츠 목록 슬라이드 방식으로 표시  
- 검색 기능 (사용자가 키워드 입력 시 관련 콘텐츠 표시)  
- 상세 페이지 (각 콘텐츠 클릭 시 상세 정보 보기 가능)  
- 반응형 디자인 적용 (데스크탑, 모바일 모두 대응)  
- 간단한 API 연동 (예: TMDB 등 외부 영화 API 사용)  
- 개인 브랜치(“madelily”) 기반 작업 완료 후 `main` 브랜치에 병합 및 동기화

---

## 🛠 사용 기술 스택  
- React  
- React Router  
- Axios (API 요청)  
- Styled-Components 또는 CSS 모듈 (스타일링)  
- JavaScript (ES6+)  
- Git & GitHub (브랜치 전략: `madelily` → `main`)  

---

## 🚀 설치 및 실행 방법  
다음 명령을 로컬 저장소 클론 후 프로젝트 폴더에서 실행하면 됩니다:

```bash
git clone https://github.com/groom-for/netflix.git
cd netflix
npm install
npm run dev
```

### 주요 스크립트
- `npm run dev`: Vite 개발 서버 실행 (기본 포트 5173)  
- `npm run build`: 프로덕션 빌드 생성 (`dist/`)  
- `npm run preview`: 로컬에서 빌드 결과 미리보기  

프로덕션 배포 시에는 `npm run build`로 생성된 정적 파일을 원하는 호스팅 서비스에 업로드하면 됩니다.
