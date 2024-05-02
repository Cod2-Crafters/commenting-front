import Image from 'next/image'

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span className='text-blue-500'>
        <h1>홈 페이지</h1>
        <h2>인증 없이 못보는 화면</h2>
        <form
        // action={async () => {
        // // 추후에 추가될 로그아웃 메소드
        // 'use server';
        //  await signOut();
        // }}
        >
          <button>
            로그아웃
          </button>
        </form>
      </span>
    </main >
  )
}
