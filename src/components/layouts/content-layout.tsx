import React, { ReactNode } from 'react'

interface ContentLayoutProps {
  children?: ReactNode
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="flex flex-row justify-center min-h-screen bg-background">
      <div className="flex flex-col max-w-[574px] bg-background text-white pt-8 space-y-6 sm:px-2 w-full">{children}</div>
    </div>
  )
}

export default ContentLayout
