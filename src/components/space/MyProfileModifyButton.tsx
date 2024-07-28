import { ProfileSchemaState } from '@/schemas'
import MyProfileInfoDialog from '../common/MyProfileInfoDialog'

interface MyProfileModifyButtonProps {
  label: string
  data: ProfileSchemaState
}

const MyProfileModifyButton = ({ label, data }: MyProfileModifyButtonProps) => {
  return <MyProfileInfoDialog label={label} profileData={data} />
}

export default MyProfileModifyButton
