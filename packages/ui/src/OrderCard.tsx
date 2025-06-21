import { Card, Text, YStack } from 'tamagui'

type Props = {
  id: string
  address: string
  status: string
}

export function OrderCard({ id, address, status }: Props) {
  return (
    <Card bordered elevate padded m="$2">
      <YStack>
        <Text fontWeight="bold">#{id}</Text>
        <Text>{address}</Text>
        <Text>Status: {status}</Text>
      </YStack>
    </Card>
  )
}
