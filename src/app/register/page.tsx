export default function Register() {
  return (
    <div>
        <form method="POST" action="/api/auth/signup">
          <input name="name" type="text" placeholder="이름을 입력해주세요." /> 
          <input name="email" type="text" placeholder="이메일을 입력해주세요." />
          <input name="password" type="password" placeholder="비밀번호를 입력해주세요." />
          <button type="submit">가입하기</button>
        </form>
    </div>
  )
}