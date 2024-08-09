'use client'
import * as z from 'zod'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ChangeEvent, useContext } from 'react'
import ProfileLabel from '../profile/ProfileLabel'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ProfileSchema, ProfileSchemaState } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'

import AddPhotoIcon from '/public/assets/add-photo.svg'
import LinkLineIcon from '/public/assets/link-line.svg'

import axiosClient from '@/axios.config'
import { RootState } from '@/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { SpaceContext } from '../space/space-context'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import InstagramIcon from '/public/assets/insta.svg'

interface MyProfileInfoDialogProps {
  label: string
  profileData: ProfileSchemaState
}

const MyProfileInfoDialog = ({ label, profileData }: MyProfileInfoDialogProps) => {
  const { spaceOwnerId: ownerId } = useContext(SpaceContext)

  // const [newAvatarPath, setNewAvatarPath] = useState(profileData.avatarPath)
  console.log('profileData', profileData)

  let auth = useSelector((state: RootState) => state.auth)

  const router = useRouter()

  const formData = new FormData()

  const onProfileImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files || event.currentTarget.files.length == 0) {
      return
    }

    const uploadFile = event.currentTarget.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        if (e.target?.result) {
          alert(`image upload base64 data: ${e.target.result}`)
          formData.append('avatar', uploadFile)

          modifyProfileFormData.setValue('avatarPath', e.target.result.toString())
          //setNewAvatarPath(e.target.result.toString())
        }
      }
    }
    reader.readAsDataURL(uploadFile)
  }
  const modifyProfileFormData = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      ...profileData,
    },
  })
  // useEffect(() => {
  //   // 첫번째 렌더링에서 이후 default value는 빈값으로 나오게 됨.. 이후 다시 렌더링을 타게 되는데 이때 reset api를 통해 profile의 defaultValues로 초기화
  // }, [profileData])

  // useEffect(() => {
  //   // 첫번째 렌더링에서 이후 default value는 빈값으로 나오게 됨.. 이후 다시 렌더링을 타게 되는데 이때 reset api를 통해 profile의 defaultValues로 초기화
  //   modifyProfileFormData.reset({
  //     ...profileData,
  //   })
  // }, [profileData])

  // token =
  //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaXNzIjoiY29kZWNyYWZ0ZXIiLCJpYXQiOjE3MjAyNDIzODEsImV4cCI6MTcyMDMyODc4MX0.fM0-1Owjm13x5Vwn815nUo9l7msyBpHjiG0P4cSNpeYjad_Tn-g2vUlefBqY9R5YBbwBVsHXWTMt62kQVe51TA'

  const imageUpload = async () => {
    const response = await axiosClient.post(`/api/profile/${ownerId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token || ''}`,
      },
    })
    return response.data
  }

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // data base64
    //alert('check' + JSON.stringify(values))
    // values.nickname = values.nickname === null ? '' : values.nickname
    //location.reload()

    alert('dd')
  }

  return (
    <>
      <Dialog>
        {/* button of button solution asChilid=true */}
        <DialogTrigger asChild>
          <Button
            className="w-full"
            variant={'outline'}
            asChild={false}
            onClick={() => {
              modifyProfileFormData.reset()
            }}
          >
            {label}
          </Button>
          {/* <>
              <p className="max-w-[600px] p-4 text-wrap">
                AUTH1: {JSON.stringify(auth)}
              </p>
            </> */}
        </DialogTrigger>
        <DialogContent className="max-w-[600px] min-h-[100px] p-4" aria-describedby={undefined}>
          <Form {...modifyProfileFormData}>
            <form onSubmit={modifyProfileFormData.handleSubmit(onSubmit)}>
              <div className="w-full -mt-2 text-right py-2 min-h-8">
                <Button type="submit" variant={'primary'} size={'lg'} className="text-right">
                  저장
                </Button>
              </div>

              <div className="text-white ">
                <DialogHeader className="text-white">
                  <VisuallyHidden.Root asChild>
                    <DialogTitle>프로필 편집</DialogTitle>
                    {/* <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription> */}
                  </VisuallyHidden.Root>
                </DialogHeader>
                <ScrollArea className="p-4">
                  <div className="flex flex-col space-y-4 max-h-[420px]">
                    <div className="flex-shrink-0">
                      <label htmlFor="file-profile" className="group/file-profile w-32 h-32 bg-red-300 rounded-full m-auto cursor-pointer block relative">
                        <FormField
                          control={modifyProfileFormData.control}
                          name="avatarPath"
                          render={({ field }) => {
                            // console.log(field)
                            return (
                              <>
                                <FormControl>
                                  <>
                                    <Input id="file-profile" type="file" className="invisible file:border-0 cursor-pointer" accept="image/png, image/jpeg" {...field} value={undefined} onChange={onProfileImageUpload} />
                                  </>
                                </FormControl>

                                {/* avatar */}
                                <Avatar className="absolute top-0 w-full h-full">
                                  <AvatarImage className="rounded-full absolute top-0 border-0" src={field.value} alt="profile" width={256} height={256} />
                                  <AvatarFallback>
                                    <Image className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-1 border-white absolute w-full h-full" src="/assets/no-user.png" alt="user" width={256} height={256} />
                                  </AvatarFallback>
                                </Avatar>
                              </>
                            )
                          }}
                        />

                        {/* 
                  <Image
                    className="rounded-full bg-gradient-to-tl to-orange-200 from-stone-100 border-1 border-white absolute top-0"
                    src="/assets/user.png"
                    alt="user"
                    width={256}
                    height={256}
                  /> */}

                        <div className="w-16 h-16 rounded-full bg-black/50 m-auto group-hover/file-profile:flex hidden items-center justify-center absolute top-1/2 translate-y-[-50%] left-0 translate-x-[50%]">
                          <AddPhotoIcon className="scale-150" width={17} height={17} />
                        </div>
                      </label>
                      <div>
                        <FormField
                          control={modifyProfileFormData.control}
                          name="nickname"
                          render={({ field }) => {
                            return (
                              <FormItem>
                                <FormLabel>
                                  <ProfileLabel htmlFor="input-nickname">닉네임</ProfileLabel>
                                </FormLabel>

                                <FormControl>
                                  <>
                                    <Input
                                      {...field}
                                      type="text"
                                      id="input-nickname"
                                      sizeType={'lg'}
                                      placeholder="닉네임"
                                      maxLength={20}
                                      // defaultValue={profileData?.nickname}
                                      {...field}
                                    />
                                  </>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex-shrink-0 space-y-4">
                      <section>
                        <FormField
                          control={modifyProfileFormData.control}
                          name="introduce"
                          render={({ field }) => {
                            // console.log('nickname field', field)
                            return (
                              <FormItem>
                                <FormLabel>
                                  <ProfileLabel htmlFor="input-mydesc">자기소개</ProfileLabel>
                                </FormLabel>

                                <FormControl>
                                  <Textarea className="min-h-28 resize-none placeholder:text-base" placeholder={'자신을 소개해주세요'} maxLength={200} {...field} value={field.value || ''}></Textarea>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )
                          }}
                        />
                      </section>

                      <section className="flex flex-col space-y-3">
                        {/* items */}
                        <FormField
                          control={modifyProfileFormData.control}
                          name="link1"
                          render={({ field }) => {
                            // console.log('link1 field', field)
                            return (
                              <FormItem>
                                <div className="flex flex-row justify-between items-center space-x-2">
                                  <FormLabel>
                                    <InstagramIcon width={24} height={24} />
                                  </FormLabel>

                                  <FormControl>
                                    <Input id="input-link1" sizeType={'lg'} placeholder="인스타그램 아이디" {...field} value={field.value || ''} />
                                  </FormControl>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )
                          }}
                        />

                        <FormField
                          control={modifyProfileFormData.control}
                          name="link2"
                          render={({ field }) => {
                            // console.log('link2 field', field)
                            return (
                              <FormItem>
                                <div className="flex flex-row justify-between items-center space-x-2">
                                  <FormLabel>
                                    <LinkLineIcon width={24} height={24} />
                                  </FormLabel>

                                  <FormControl>
                                    <Input id="input-nickname" sizeType={'lg'} placeholder={`링크1`} {...field} value={field.value || ''} />
                                  </FormControl>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )
                          }}
                        />

                        <FormField
                          control={modifyProfileFormData.control}
                          name="link3"
                          render={({ field }) => {
                            // console.log('link2 field', field)
                            return (
                              <FormItem>
                                <div className="flex flex-row justify-between items-center space-x-2">
                                  <FormLabel>
                                    <LinkLineIcon width={24} height={24} />
                                  </FormLabel>

                                  <FormControl>
                                    <Input id="input-nickname" sizeType={'lg'} placeholder={`링크2`} {...field} value={field.value || ''} />
                                  </FormControl>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )
                          }}
                        />
                      </section>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MyProfileInfoDialog
