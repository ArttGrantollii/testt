'use client'

import { TamaguiProvider, Theme } from 'tamagui'
import { config } from '@my/ui'
import type { ReactNode } from 'react'

export function Provider({
  children,
  disableRootThemeClass,
  defaultTheme = 'light',
}: {
  children: ReactNode
  disableRootThemeClass?: boolean
  defaultTheme?: string
}) {
  return (
    <TamaguiProvider config={config} disableRootThemeClass={disableRootThemeClass}>
      <Theme name={defaultTheme as any}>{children}</Theme>
    </TamaguiProvider>
  )
}
