'use client'
import { FormError } from '@/components/form-error'
import ProfileCard from '@/components/profile-card'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogFooter, DialogTrigger, Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { FormField, FormItem, FormControl } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { getImageUrl } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { propagateServerField } from 'next/dist/server/lib/render-server'
import React, { Dispatch, ReactNode, useState } from 'react'
import { content } from 'tailwindcss/defaultTheme'
import ConversationQuestionHeader from './ConversationQuestionHeader'
import ConversationQuestionDialogContent from './ConversationDialogContent'

interface ConversationDialogMainProps {
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
  children?: ReactNode
  trigger?: ReactNode
}

const ConversationQuestionDialogMain = ({ isOpen, setIsOpen, children, trigger }: ConversationDialogMainProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
      {trigger && (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      )}
      <DialogContent className="w-[600px] min-h-[100px] p-4" aria-describedby={undefined}>
        <DialogHeader className="text-white">
          <VisuallyHidden asChild>
            <DialogTitle>1</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        <React.Fragment>{children}</React.Fragment>
      </DialogContent>
    </Dialog>
  )
}

// export default ConversationDialogMain

export const ConversationQuestionDialog = Object.assign(ConversationQuestionDialogMain, {
  Header: ConversationQuestionHeader,
  Content: ConversationQuestionDialogContent,
})
