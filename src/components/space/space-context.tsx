import { createContext } from 'react'

interface SpaceUserInfoState {
  guestId: number
  ownerId: number
}
export const SpaceContext = createContext<SpaceUserInfoState>({
  guestId: 0,
  ownerId: 0,
})
