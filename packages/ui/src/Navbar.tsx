'use client'

import { XStack, Text, Button } from 'tamagui'
import Link from 'next/link'

export function Navbar() {
  return (
    <XStack
      bg="$background"
      p="$4"
      borderBottomWidth={1}
      borderColor="#ccc"
      position="relative"
      top={0}
      zIndex={100}
      {...({
        justifyContent: 'space-between',
        alignItems: 'center',
      } as any)}
    >
      <Text fontSize="$6" fontWeight="bold">
        CourierApp
      </Text>
      <XStack space="$4">
        <Link href="/" passHref legacyBehavior>
          <Button>Home</Button>
        </Link>
        <Link href="/orders" passHref legacyBehavior>
          <Button>Orders</Button>
        </Link>
        <Link href="/drivers" passHref legacyBehavior>
          <Button>Drivers</Button>
        </Link>
      </XStack>
    </XStack>
  )
}
