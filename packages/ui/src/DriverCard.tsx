import { Card, Text, XStack, YStack, Theme, Switch } from 'tamagui'

type Props = {
  name: string
  available: boolean
  onToggleAvailability: () => void
}

export function DriverCard({ name, available, onToggleAvailability }: Props) {
  return (
    <Theme name={available ? 'green' : 'red'}>
      <Card padding="$4" bordered elevate margin="$2">
        <XStack
          flex={1}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <YStack>
            <Text fontWeight="bold">{name}</Text>
            <Text>Driver</Text>
          </YStack>

          <YStack
            style={{
              alignItems: 'center',
              paddingTop: 8, // or token-based padding
            }}
          >
            <Text>{available ? '✅ Available' : '❌ Offline'}</Text>
            <Switch checked={available} onCheckedChange={onToggleAvailability}>
              <Switch.Thumb />
            </Switch>
          </YStack>
        </XStack>
      </Card>
    </Theme>
  )
}
