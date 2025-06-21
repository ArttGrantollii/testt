import { YStack, XStack, Text, Button, Separator } from '@my/ui'
import Link from 'next/link'

export default function Home() {
  return (
    <YStack flex={1} p="$4" space="$4">
      <Text fontSize="$9" fontWeight="bold">
        Courier Dashboard
      </Text>

      <Separator />

      <XStack space="$4">
        <Link href="/orders" passHref legacyBehavior>
          <Button theme="blue">View Orders</Button>
        </Link>

        <Link href="/drivers" passHref legacyBehavior>
          <Button>View Drivers</Button>
        </Link>
      </XStack>
    </YStack>
  )
}
