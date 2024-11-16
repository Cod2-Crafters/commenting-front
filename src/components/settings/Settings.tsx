'use client'

import { Label } from "@/components/ui/label"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/axios.config";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "@/app/auth/authSlice";
import { useNotificationStore } from "@/stores/notifiicationStore";

interface SettingUpdate {
    endpoint: string;
    value: boolean;
}


export default function Settings() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const dispatch = useDispatch();


    // const token = useSelector((state: any) => state.user.token);
    // const email = useSelector((state: any) => state.user.user?.email);

    const { clearEventSource } = useNotificationStore();

    const updateSetting = useMutation({
        mutationFn: ({ endpoint, value }: any) => {
            return axiosClient.put(endpoint, { value })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] })
        }
    }
    )
    const [isAccountOpen, setIsAccountOpen] = useState(false); // 계정 관리 섹션 상태

    const [settings, setSettings] = useState({
        allowAnonymous: false,
        allowGlobalQuestion: false,
        emailNotice: false,
        isSpacePaused: false,
    });

    // 설정 데이터 조회 API 호출
    const { data, isLoading, isError } = useQuery({
        queryKey: ['settings'],
        queryFn: async () => {
            const response = await axiosClient.get('/api/member/setting');
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 데이터 캐싱 시간 설정 (5분)
        refetchOnWindowFocus: false, // 창이 포커스될 때 리패칭하지 않도록 설정
    });

    // 데이터가 로드될 때 설정 값 업데이트
    useEffect(() => {
        if (data) {
            const resData = data.data;
            console.log(resData);
            setSettings({
                allowAnonymous: resData.allowAnonymous,
                allowGlobalQuestion: resData.allowGlobalQuestion,
                emailNotice: resData.emailNotice,
                isSpacePaused: resData.isSpacePaused,
            });
        }
    }, [data]);


    const handleToggle = (key: string, endpoint) => (checked) => {
        setSettings((prev) => ({
            ...prev,
            [key]: checked
        }))
        updateSetting.mutate({ endpoint, value: checked })

    }


    const [enabled, setEnabled] = useState(false);

    // 로그아웃을 위한 useMutation 훅
    const logoutMutation = useMutation({
        mutationFn: () => {
            return axiosClient.post('/api/member/sign-out');
        },
        onSuccess: () => {
            alert("로그아웃 되었습니다.");
            clearEventSource();
            dispatch(clearCredentials());
            router.push('/');
        },
        onError: () => {
            alert("로그아웃에 실패했습니다.");
        }
    });

    // 회원탈퇴를 위한 useMutation 훅
    const unregisterMutation = useMutation({
        mutationFn: () => {
            return axiosClient.post('/api/member/unregister');
        },
        onSuccess: () => {
            alert("회원탈퇴 되었습니다.");
        },
        onError: () => {
            alert("회원탈퇴에 실패했습니다.");
        }
    });

    if (isLoading) {
        return <div className="text-white p-4">로딩 중...</div>;
    }

    if (isError) {
        return <div className="text-white p-4">설정 데이터를 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div className="text-white p-4 max-w-md mx-auto">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">비로그인 질문 제한 설정</h3>
                        <p className="text-sm text-gray-400">로그인 한 사람만 질문 할 수 있어요</p>

                    </div>

                    <Switch
                        checked={settings.allowAnonymous}
                        onCheckedChange={handleToggle('allowAnonymous', '/api/member/setting/allow-anonymous')}
                    />

                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">광역 질문 승인 설정</h3>
                        <p className="text-sm text-gray-400">질문을 승인해 주세요.</p>
                    </div>
                    <Switch
                        checked={settings.allowGlobalQuestion}
                        onCheckedChange={handleToggle('allowGlobalQuestion', '/api/member/setting/allow-global-question')}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">이메일 알림</h3>
                    </div>
                    <Switch
                        checked={settings.emailNotice}
                        onCheckedChange={handleToggle('emailNotice', '/api/member/setting/email-notification')}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">스페이스 일시 중지</h3>
                        <p className="text-sm text-gray-400">사람들로부터 질문을 받지 않아요</p>
                    </div>
                    <Switch
                        checked={settings.isSpacePaused}
                        onCheckedChange={handleToggle('isSpacePaused', '/api/member/setting/space-pause')}
                    />
                </div>




                <div>
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setIsAccountOpen(!isAccountOpen)} // 상태 변경
                    >
                        <Label htmlFor="account" className="text-lg font-semibold">
                            계정 관리
                        </Label>
                        {isAccountOpen ? (
                            <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                        ) : (
                            <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                        )}
                    </div>
                    {isAccountOpen && (
                        <div className="mt-4 space-y-2">
                            <button className="w-full py-2 px-4 rounded bg-gray-700 text-white" onClick={() => logoutMutation.mutate()}
                            >
                                로그아웃
                            </button>
                            <button className="w-full py-2 px-4 rounded bg-red-600 text-white" onClick={() => unregisterMutation.mutate()}
                            >
                                회원탈퇴
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
