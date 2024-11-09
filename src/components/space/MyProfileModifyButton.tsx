import { ProfileSchemaState } from '@/schemas'
import MyProfileInfoDialog from '../common/MyProfileInfoDialog'
import { useState } from 'react'

interface MyProfileModifyButtonProps {
  label: string
  data: ProfileSchemaState
}

const MyProfileModifyButton = ({ label, data }: MyProfileModifyButtonProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
    <MyProfileInfoDialog label={label} loadedProfileData={data} isOpen={isOpen} setIsOpen={setIsOpen} />
    <p>openstatus:{isOpen.toString()}</p>
    </>
 
  )
}

export default MyProfileModifyButton
