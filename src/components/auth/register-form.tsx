"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import { useState, useTransition } from "react";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            id: "",
            email: "",
            emailAuth: "",
            password: "",
            passwordConfirm: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        })
    }

    return (
        <div className="w-[580px] mt-10 ">
            <h1 className="text-[25px] font-semibold text-center text-white pb-[20px]">코멘팅 회원가입</h1>
            <hr className="border-primary" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-10 space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        아이디
                                    </FormLabel>
                                    <div className="flex space-x-2">
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="아이디 입력"
                                                className="bg-surface h-[60px]"
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            className="bg-black text-white h-[60px] border border-white w-[200px]"
                                            onClick={() => console.log('아이디 중복 확인')}
                                        >
                                            중복 확인
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        비밀번호
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)"
                                            type="password"
                                            className="bg-surface h-[60px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        비밀번호
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)"
                                            type="password"
                                            className="bg-surface h-[60px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        이름
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder="이름 입력"
                                            className="bg-surface h-[60px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        이메일
                                    </FormLabel>
                                    <div className="flex space-x-2">
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                type="email"
                                                className="bg-surface h-[60px]"
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            className="bg-black text-white h-[60px] border border-white w-[200px]"
                                            onClick={() => console.log('인증요청')}
                                        >
                                            인증요청
                                        </Button>
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="emailAuth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        이메일 인증번호 입력
                                    </FormLabel>
                                    <div className="flex space-x-2">
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                className="bg-surface h-[60px]"
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            className="bg-black text-white h-[60px] border border-white w-[200px]"
                                            onClick={() => console.log('인증확인')}
                                        >
                                            인증확인
                                        </Button>
                                    </div>
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
                        className="w-full h-[60px] text-black text-[18px]"
                    >
                        회원가입
                    </Button>
                </form>
            </Form>
        </div>
    )
}