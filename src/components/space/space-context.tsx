import { ProfileSchemaState } from "@/schemas"
import { createContext } from "react"

interface SpaceUserInfoState {
  showerGuestId: number
  spaceOwnerId: number
  writeMaxMstId: number,
  ownerProfileData: ProfileSchemaState
  guestProfileData: ProfileSchemaState
}
export const SpaceContext = createContext<SpaceUserInfoState>({
  showerGuestId: 0,
  spaceOwnerId: 0,
  writeMaxMstId: 0,
  ownerProfileData: {},
  guestProfileData: {},
})
