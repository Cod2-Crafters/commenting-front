import NewNotificationList from "@/components/alarm/NewNotificationList";
import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/login";
import Link from "next/link";
import { redirect } from "next/navigation";




const NotificationPages = async () => {
    const session = await getSession();
    console.log(session)

    return (
        <>
            {session?.user && session?.user?.id ? <NewNotificationList guestId={session.user.id} /> : redirect('/auth/login')}
        </>
    )
}


export default NotificationPages;