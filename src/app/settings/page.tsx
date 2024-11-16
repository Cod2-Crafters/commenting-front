import Settings from "@/components/settings/Settings";
import { Suspense } from "react";



const SettingPage = async () => {


    return (
        <>
            <Suspense fallback={<div>로딩중..</div>}>
                <Settings />
            </Suspense>
        </>
    )
}

export default SettingPage;