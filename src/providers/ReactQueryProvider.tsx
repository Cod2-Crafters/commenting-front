'use client'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


interface ReactQueryProviderProps {
    children: ReactNode
}

const ReactQueryProvider = ({children, ...props}: ReactQueryProviderProps) => {

const [client] = useState(new QueryClient({
    defaultOptions: {
        queries: {
            //   staleTime: Infinity,
            // ...
        },
      },
}));

//const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider