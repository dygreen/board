# BOARD

> [개인 프로젝트] 2023.10 ~  <br/> 
>
> : 게시판 서비스 ( Client / Serverless API 구현 )
>
> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.Js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> 

## _Refactoring_
[2024.08 ~ ]
- API App Router 방식으로 변경
- 프로젝트 기능 추가

<br/>

## _Service Info_
- 게시글 리스트
  - 조회
  - 등록 (`middleware` 활용해 로그인한 사용자만 등록할 수 있도록 컨트롤)
  - 수정 (`updateOne`) : 관리자 or 작성자만 가능
  - 삭제 (`deleteOne`, URL query string 활용) : 관리자 or 작성자만 가능
  - 북마크 (`updateOne`) : 관리자 or 작성자만 가능
- 게시글 상세 페이지 (`Dynamic Routes`)
- 로그인 기능 (`next-auth`)
  - Github 소셜 로그인
  - next-auth JWT 로그인
- 회왼가입 기능
  - 정규식 검사 : `formik`, `Yup` 라이브러리 사용