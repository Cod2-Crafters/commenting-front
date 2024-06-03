import { LabelHTMLAttributes, ReactNode } from 'react'

interface ProfileLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode
}

const ProfileLabel = ({ children, htmlFor, ...props }: ProfileLabelProps) => {
  return (
    <label
      className="font-medium text-base text-white mb-2 inline-block"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export default ProfileLabel
