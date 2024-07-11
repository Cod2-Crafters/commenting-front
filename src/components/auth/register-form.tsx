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
import { useRouter } from 'next/navigation'


export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [emailError, setEmailError] = useState<string | undefined>("");
    const [emailSuccess, setEmailSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            id: "",
            email: "",
            password: "",
            passwordConfirm: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            fetch("http://43.202.121.141:8080/api/member/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: values.email,
                    provider: "BASE",
                    password: values.password
                })
            })
                .then(async (response) => {
                    const data = await response.json();
                    if (response.ok) {
                        setSuccess("회원가입이 성공적으로 완료되었습니다.");
                        router.push('/auth/login');
                    } else {
                        setError(data.message || "회원가입에 실패했습니다.");
                    }
                })
                .catch(() => {
                    setError("네트워크 오류가 발생했습니다.");
                });
        });
    }

    const checkEmail = () => {
        const email = form.getValues("email");
        const emailValidation = RegisterSchema.shape.email.safeParse(email);

        setEmailError("");
        setEmailSuccess("");
        if (!emailValidation.success) {
            setEmailError("유효한 이메일을 입력하세요.");
            return;
        }

        fetch(`http://43.202.121.141:8080/api/member/check-email?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.status === 409) {
                    setEmailError(data.message || "이미 사용중인 이메일입니다.");
                } else if (response.ok) {
                    setEmailSuccess("사용 가능한 이메일입니다.");
                }
            })
            .catch(() => {
                setEmailError("이메일 확인 중 오류가 발생했습니다.");
            });
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
                                        {/* <Button
                                            type="button"
                                            className="bg-black text-white h-[60px] border border-white w-[200px]"
                                            onClick={() => checkEmail(field.value)}
                                        >
                                            중복 확인
                                        </Button> */}
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
                                            onClick={() => checkEmail()}
                                        >
                                            중복확인
                                        </Button>
                                    </div>
                                    {emailError && (
                                        <p className="text-red-500 mt-2">
                                            {emailError}
                                        </p>
                                    )}
                                    {emailSuccess && (
                                        <p className="text-green-500 mt-2">
                                            {emailSuccess}
                                        </p>
                                    )}

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