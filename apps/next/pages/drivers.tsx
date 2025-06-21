import { useState } from 'react'
import { YStack, XStack, Text, Switch, ScrollView } from 'tamagui'
import { DriverCard } from '@my/ui'
import { Navbar } from '@my/ui'

const mockDrivers = [
  { name: 'Alice', available: true },
  { name: 'Bob', available: false },
  { name: 'Carlos', available: true },
]

export default function DriversScreen() {
  const [drivers, setDrivers] = useState(mockDrivers)
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)

  const toggleAvailability = (index: number) => {
    const updated = [...drivers]
    updated[index].available = !updated[index].available
    setDrivers(updated)
  }

  const filteredDrivers = showOnlyAvailable ? drivers.filter((d) => d.available) : drivers

  return (
    <>
      <Navbar />
      <YStack p="$4" space="$4">
        <XStack
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text fontSize="$6" fontWeight="bold">
            Drivers
          </Text>

          <XStack
            space="$2"
            style={{
              alignItems: 'center',
            }}
          >
            <Text>Only Available</Text>
            <Switch checked={showOnlyAvailable} onCheckedChange={setShowOnlyAvailable}>
              <Switch.Thumb />
            </Switch>
          </XStack>
        </XStack>

        <ScrollView>
          {filteredDrivers.map((driver, idx) => (
            <DriverCard
              key={idx}
              name={driver.name}
              available={driver.available}
              onToggleAvailability={() => toggleAvailability(idx)}
            />
          ))}
        </ScrollView>
      </YStack>
    </>
  )
}
