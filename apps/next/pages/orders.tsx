import { YStack, Text, Separator } from '@my/ui'
import { OrderCard } from '@my/ui'
import { Navbar } from '@my/ui'

const orders = [
  { id: 'ORD-001', address: '123 Main St', status: 'Pending' },
  { id: 'ORD-002', address: '456 Elm St', status: 'Delivered' },
  { id: 'ORD-003', address: '789 Oak St', status: 'In Transit' },
]

export default function OrdersPage() {
  return (
    <YStack>
      <Navbar />

      <YStack p="$4" space="$4">
        <Text fontSize="$8" fontWeight="bold">
          Orders
        </Text>
        <Separator />

        {orders.map((order) => (
          <OrderCard key={order.id} id={order.id} address={order.address} status={order.status} />
        ))}
      </YStack>
    </YStack>
  )
}
