import { createContext } from "react"

interface SpaceUserInfoState {
  showerGuestId: number
  spaceOwnerId: number
  conversationsMaxMasterId: number
}
export const SpaceContext = createContext<SpaceUserInfoState>({
  showerGuestId: 0,
  spaceOwnerId: 0,
  conversationsMaxMasterId: 0
})
