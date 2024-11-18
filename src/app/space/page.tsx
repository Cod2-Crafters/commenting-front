'use server'
import { getSession } from '@/lib/login';
import { RootState } from '@/store';
import { redirect, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const SpacePage = async () => {

    const session = await getSession();

    if (!session) {
        redirect('/auth/login');
    }
    else {
        redirect(`/space/${session.user.userid}`);
    }
    // 컴포넌트는 리디렉션을 위해 실제로 렌더링되지 않습니다.
    return null;
};

export default SpacePage;