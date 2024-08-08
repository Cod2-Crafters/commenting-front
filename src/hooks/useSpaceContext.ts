import { SpaceContext } from "@/components/space/space-context";
import { useContext } from "react";

export const useSpaceContext = () => {
    const context = useContext(SpaceContext);
    if (!context) {
      throw new Error('useSpaceContext must be used within an');
    }
    return context;
  };
  