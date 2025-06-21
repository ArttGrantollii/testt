'use client'

import { useState } from 'react'
import { Button, Card, Input, Text, XStack, YStack, H1, H3, Paragraph } from 'tamagui'

interface Doctor {
  id: string
  name: string
  email: string
  phone: string
  specialization: string
  address: string
  status: 'active' | 'inactive'
  joinDate: string
  totalOrders: number
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Cardiology',
    address: '123 Medical Center Dr, City, State 12345',
    status: 'active',
    joinDate: '2023-01-15',
    totalOrders: 45,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@clinic.com',
    phone: '+1 (555) 987-6543',
    specialization: 'Pediatrics',
    address: '456 Healthcare Ave, City, State 12345',
    status: 'active',
    joinDate: '2023-03-22',
    totalOrders: 32,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@medical.com',
    phone: '+1 (555) 456-7890',
    specialization: 'Dermatology',
    address: '789 Wellness Blvd, City, State 12345',
    status: 'inactive',
    joinDate: '2022-11-08',
    totalOrders: 28,
  },
]

export default function DoctorDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    address: '',
    status: 'active' as 'active' | 'inactive',
  })

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      address: '',
      status: 'active',
    })
    setShowAddForm(false)
    setEditingDoctor(null)
  }

  // CREATE - Add new doctor
  const handleCreateDoctor = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.specialization) {
      alert('Please fill in all required fields')
      return
    }

    const newDoctor: Doctor = {
      id: Date.now().toString(), // Better ID generation
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
    }

    setDoctors([...doctors, newDoctor])
    resetForm()
    alert('Doctor added successfully!')
  }

  // READ - Get doctor by ID (for editing)
  const getDoctorById = (id: string): Doctor | undefined => {
    return doctors.find((doctor) => doctor.id === id)
  }

  // UPDATE - Edit existing doctor
  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      address: doctor.address,
      status: doctor.status,
    })
    setShowAddForm(true)
  }

  const handleUpdateDoctor = () => {
    if (!editingDoctor) return

    if (!formData.name || !formData.email || !formData.phone || !formData.specialization) {
      alert('Please fill in all required fields')
      return
    }

    const updatedDoctor: Doctor = {
      ...editingDoctor,
      ...formData,
    }

    setDoctors(doctors.map((doctor) => (doctor.id === editingDoctor.id ? updatedDoctor : doctor)))
    resetForm()
    alert('Doctor updated successfully!')
  }

  // DELETE - Remove doctor
  const handleDeleteDoctor = (id: string) => {
    const doctor = getDoctorById(id)
    if (!doctor) return

    if (confirm(`Are you sure you want to delete ${doctor.name}?`)) {
      setDoctors(doctors.filter((doctor) => doctor.id !== id))
      alert('Doctor deleted successfully!')
    }
  }

  // Toggle doctor status (mini update)
  const toggleDoctorStatus = (id: string) => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === id
          ? { ...doctor, status: doctor.status === 'active' ? 'inactive' : 'active' }
          : doctor
      )
    )
  }

  // VIEW - Get doctor details (for future detail view)
  const viewDoctorDetails = (doctor: Doctor) => {
    alert(`
Doctor Details:
Name: ${doctor.name}
Email: ${doctor.email}
Phone: ${doctor.phone}
Specialization: ${doctor.specialization}
Address: ${doctor.address}
Status: ${doctor.status}
Join Date: ${new Date(doctor.joinDate).toLocaleDateString()}
Total Orders: ${doctor.totalOrders}
    `)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <YStack style={{ padding: 20, maxWidth: 1200, margin: '0 auto', gap: 20 }}>
        {/* Header */}
        <XStack
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <YStack style={{ gap: 8 }}>
            <H1>Doctor Management - CRUD Operations</H1>
            <Paragraph>Create, Read, Update, Delete doctors in your courier network</Paragraph>
          </YStack>
          <Button
            onPress={() => {
              if (showAddForm) {
                resetForm()
              } else {
                setShowAddForm(true)
              }
            }}
            style={{ backgroundColor: '#007AFF', color: 'white' }}
          >
            {showAddForm ? 'Cancel' : '➕ Add Doctor'}
          </Button>
        </XStack>

        {/* CREATE/UPDATE Form */}
        {showAddForm && (
          <Card
            style={{
              padding: 20,
              borderWidth: 2,
              borderColor: editingDoctor ? '#FF9500' : '#007AFF',
            }}
          >
            <YStack style={{ gap: 16 }}>
              <XStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <H3>{editingDoctor ? '✏️ Edit Doctor' : '➕ Add New Doctor'}</H3>
                {editingDoctor && (
                  <Text style={{ color: '#FF9500', fontSize: 14, fontWeight: 'bold' }}>
                    Editing: {editingDoctor.name}
                  </Text>
                )}
              </XStack>

              <YStack style={{ gap: 12 }}>
                <YStack style={{ gap: 4 }}>
                  <Text style={{ fontWeight: 'bold' }}>Full Name *</Text>
                  <Input
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    placeholder="Dr. John Doe"
                    style={{ borderColor: !formData.name ? '#FF3B30' : '#E5E5E7' }}
                  />
                </YStack>

                <YStack style={{ gap: 4 }}>
                  <Text style={{ fontWeight: 'bold' }}>Email *</Text>
                  <Input
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    placeholder="john.doe@hospital.com"
                    style={{ borderColor: !formData.email ? '#FF3B30' : '#E5E5E7' }}
                  />
                </YStack>

                <YStack style={{ gap: 4 }}>
                  <Text style={{ fontWeight: 'bold' }}>Phone *</Text>
                  <Input
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    placeholder="+1 (555) 123-4567"
                    style={{ borderColor: !formData.phone ? '#FF3B30' : '#E5E5E7' }}
                  />
                </YStack>

                <YStack style={{ gap: 4 }}>
                  <Text style={{ fontWeight: 'bold' }}>Specialization *</Text>
                  <Input
                    value={formData.specialization}
                    onChangeText={(text) => setFormData({ ...formData, specialization: text })}
                    placeholder="e.g., Cardiology, Pediatrics"
                    style={{ borderColor: !formData.specialization ? '#FF3B30' : '#E5E5E7' }}
                  />
                </YStack>

                <YStack style={{ gap: 4 }}>
                  <Text style={{ fontWeight: 'bold' }}>Address</Text>
                  <Input
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                    placeholder="123 Medical Center Dr, City, State 12345"
                  />
                </YStack>

                <YStack style={{ gap: 8 }}>
                  <Text style={{ fontWeight: 'bold' }}>Status</Text>
                  <XStack style={{ gap: 12 }}>
                    <Button
                      onPress={() => setFormData({ ...formData, status: 'active' })}
                      style={{
                        backgroundColor: formData.status === 'active' ? '#34C759' : '#E5E5E7',
                        color: formData.status === 'active' ? 'white' : '#666',
                      }}
                    >
                      ✅ Active
                    </Button>
                    <Button
                      onPress={() => setFormData({ ...formData, status: 'inactive' })}
                      style={{
                        backgroundColor: formData.status === 'inactive' ? '#FF3B30' : '#E5E5E7',
                        color: formData.status === 'inactive' ? 'white' : '#666',
                      }}
                    >
                      ❌ Inactive
                    </Button>
                  </XStack>
                </YStack>
              </YStack>

              <XStack style={{ gap: 12, justifyContent: 'flex-end' }}>
                <Button onPress={resetForm} style={{ backgroundColor: '#E5E5E7', color: '#666' }}>
                  Cancel
                </Button>
                <Button
                  onPress={editingDoctor ? handleUpdateDoctor : handleCreateDoctor}
                  style={{
                    backgroundColor: editingDoctor ? '#FF9500' : '#007AFF',
                    color: 'white',
                  }}
                >
                  {editingDoctor ? '💾 Update Doctor' : '➕ Create Doctor'}
                </Button>
              </XStack>
            </YStack>
          </Card>
        )}

        {/* Stats Cards - READ Operations */}
        <XStack style={{ gap: 16, flexWrap: 'wrap' }}>
          <Card style={{ flex: 1, minWidth: 200, padding: 16 }}>
            <YStack style={{ gap: 4 }}>
              <Text style={{ fontSize: 14, color: '#666' }}>📊 Total Doctors</Text>
              <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{doctors.length}</Text>
            </YStack>
          </Card>

          <Card style={{ flex: 1, minWidth: 200, padding: 16 }}>
            <YStack style={{ gap: 4 }}>
              <Text style={{ fontSize: 14, color: '#666' }}>✅ Active Doctors</Text>
              <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                {doctors.filter((d) => d.status === 'active').length}
              </Text>
            </YStack>
          </Card>

          <Card style={{ flex: 1, minWidth: 200, padding: 16 }}>
            <YStack style={{ gap: 4 }}>
              <Text style={{ fontSize: 14, color: '#666' }}>📦 Total Orders</Text>
              <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                {doctors.reduce((sum, doctor) => sum + doctor.totalOrders, 0)}
              </Text>
            </YStack>
          </Card>

          <Card style={{ flex: 1, minWidth: 200, padding: 16 }}>
            <YStack style={{ gap: 4 }}>
              <Text style={{ fontSize: 14, color: '#666' }}>📈 Avg Orders/Doctor</Text>
              <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                {doctors.length > 0
                  ? Math.round(
                      doctors.reduce((sum, doctor) => sum + doctor.totalOrders, 0) / doctors.length
                    )
                  : 0}
              </Text>
            </YStack>
          </Card>
        </XStack>

        {/* READ - Doctors List with CRUD Actions */}
        <Card style={{ padding: 20 }}>
          <YStack style={{ gap: 16 }}>
            <YStack style={{ gap: 8 }}>
              <H3>📋 Doctors List - CRUD Operations</H3>
              <Paragraph>
                View, Edit, and Delete doctors. Click on actions to perform CRUD operations.
              </Paragraph>
            </YStack>

            <Input
              placeholder="🔍 Search doctors by name, email, or specialization..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />

            {/* Doctors List */}
            <YStack style={{ gap: 12 }}>
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  style={{ padding: 16, borderWidth: 1, borderColor: '#e0e0e0' }}
                >
                  <XStack
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: 16,
                    }}
                  >
                    <YStack style={{ gap: 8, flex: 1, minWidth: 250 }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>👨‍⚕️ {doctor.name}</Text>
                      <Text style={{ fontSize: 14, color: '#666' }}>📧 {doctor.email}</Text>
                      <Text style={{ fontSize: 14, color: '#666' }}>📞 {doctor.phone}</Text>
                      {doctor.address && (
                        <Text style={{ fontSize: 14, color: '#666' }}>📍 {doctor.address}</Text>
                      )}
                      <Text style={{ fontSize: 12, color: '#999' }}>ID: {doctor.id}</Text>
                    </YStack>

                    <YStack style={{ gap: 8, alignItems: 'flex-end' }}>
                      <XStack style={{ gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Button
                          size="$2"
                          disabled
                          style={{ backgroundColor: '#007AFF', color: 'white' }}
                        >
                          🏥 {doctor.specialization}
                        </Button>
                        <Button
                          size="$2"
                          onPress={() => toggleDoctorStatus(doctor.id)}
                          style={{
                            backgroundColor: doctor.status === 'active' ? '#34C759' : '#8E8E93',
                            color: 'white',
                          }}
                        >
                          {doctor.status === 'active' ? '✅' : '❌'} {doctor.status}
                        </Button>
                      </XStack>
                      <Text style={{ fontSize: 12, color: '#666' }}>
                        📦 Orders: {doctor.totalOrders}
                      </Text>
                      <Text style={{ fontSize: 12, color: '#666' }}>
                        📅 Joined: {new Date(doctor.joinDate).toLocaleDateString()}
                      </Text>

                      {/* CRUD Action Buttons */}
                      <XStack style={{ gap: 8 }}>
                        <Button
                          size="$2"
                          style={{ backgroundColor: '#5AC8FA', color: 'white' }}
                          onPress={() => viewDoctorDetails(doctor)}
                        >
                          👁️ View
                        </Button>
                        <Button
                          size="$2"
                          style={{ backgroundColor: '#FF9500', color: 'white' }}
                          onPress={() => handleEditDoctor(doctor)}
                        >
                          ✏️ Edit
                        </Button>
                        <Button
                          size="$2"
                          onPress={() => handleDeleteDoctor(doctor.id)}
                          style={{ backgroundColor: '#FF3B30', color: 'white' }}
                        >
                          🗑️ Delete
                        </Button>
                      </XStack>
                    </YStack>
                  </XStack>
                </Card>
              ))}
            </YStack>

            {filteredDoctors.length === 0 && (
              <YStack style={{ padding: 32, alignItems: 'center' }}>
                <Text style={{ color: '#666', fontSize: 16 }}>
                  {searchTerm
                    ? '🔍 No doctors found matching your search.'
                    : '📝 No doctors available. Add your first doctor!'}
                </Text>
              </YStack>
            )}
          </YStack>
        </Card>

        {/* CRUD Operations Summary */}
        <Card style={{ padding: 16, backgroundColor: '#F0F9FF', borderColor: '#007AFF' }}>
          <YStack style={{ gap: 8 }}>
            <H3 style={{ color: '#007AFF' }}>🔧 CRUD Operations Available:</H3>
            <XStack style={{ gap: 16, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 14 }}>
                ✅ <strong>CREATE:</strong> Add new doctors
              </Text>
              <Text style={{ fontSize: 14 }}>
                👁️ <strong>READ:</strong> View doctor details
              </Text>
              <Text style={{ fontSize: 14 }}>
                ✏️ <strong>UPDATE:</strong> Edit doctor information
              </Text>
              <Text style={{ fontSize: 14 }}>
                🗑️ <strong>DELETE:</strong> Remove doctors
              </Text>
            </XStack>
          </YStack>
        </Card>
      </YStack>
    </div>
  )
}
