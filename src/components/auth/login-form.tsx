"use client"


import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"


import { CardWrapper } from "@/components/auth/card-wrapper"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import Link from 'next/link'
import Image from "next/image";


export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            id: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        })
    }

    const handleOAuthLogin = (event: React.MouseEvent<HTMLButtonElement>, provider: string) => {
        event.preventDefault();
        console.log(provider);
    }

    return (
        <div>
            <h1 className="text-[25px] font-semibold text-center text-white pb-[20px]">코멘팅 로그인</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="아이디"
                                            // type="email"
                                            className="bg-surface w-[462px] h-[62.35px] rounded-md"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="비밀번호"
                                            type="password"
                                            className="bg-surface w-[462px] h-[62.35px] rounded-md"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-[462px] h-[62.35px] rounded-md text-black text-[18px]"
                    >
                        로그인
                    </Button>
                    <div className="flex flex-row justify-center mt-4 space-x-10">
                        <Link href="/find-id-pw" className="text-white">ID/PW찾기</Link>
                        <Link href="/auth/register" className="text-white">회원가입</Link>
                    </div>
                    <div className="flex justify-center mt-10 space-x-20">
                        <button
                            onClick={(e) => handleOAuthLogin(e, 'naver')}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                        >
                            <Image src="/icons/naver.png" alt="네이버 로그인" width={50} height={50} />
                        </button>
                        <button
                            onClick={(e) => handleOAuthLogin(e, 'kakao')}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                        >
                            <Image src="/icons/kakao.png" alt="카카오톡 로그인" width={50} height={50} />
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    )
}