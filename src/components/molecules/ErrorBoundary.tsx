

import { ReactNode } from 'react'
import { FC } from 'react'

export const ErrorBoundary:FC<{children?:ReactNode}> = (props) => {
  return (
    <>{props.children}</>
  )
}