import MyProfileInfoDialog from '../common/MyProfileInfoDialog'

interface MyProfileModifyButtonProps {
  label: string
}

const MyProfileModifyButton = ({ label }: MyProfileModifyButtonProps) => {
  return <MyProfileInfoDialog label={label} />
}

export default MyProfileModifyButton
