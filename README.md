# 앤텔레콤 BP센터 통합 검색

앤텔레콤 BP센터의 위치를 쉽고 빠르게 찾을 수 있는 위치 정보 서비스입니다.

## 주요 기능

- 🔍 지역구 또는 동 단위 실시간 검색
- 🤖 Gemini AI 기반 인접 지역 지능형 검색
- 🗺️ 네이버/구글 지도 연동
- 📱 반응형 모바일 최적화 UI

## 로컬 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 `.env.local`로 복사하고 Gemini API 키를 입력하세요.

```bash
cp .env.example .env.local
```

API 키는 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 발급받을 수 있습니다.

### 3. 개발 서버 실행
```bash
npm run dev
```

## Vercel 배포

### 1. GitHub에 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Vercel에서 Import
1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 레포지토리 선택
4. **Environment Variables** 설정:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `your_gemini_api_key`
5. Deploy 클릭

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI API

## 라이선스

MIT License
