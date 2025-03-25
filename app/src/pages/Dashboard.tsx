import { useState, useEffect } from 'react'
import axios from 'axios'
import SubscriptionForm from '../components/SubscriptionForm'
import SubscriptionList from '../components/SubscriptionList'
import SubscriptionSummary from '../components/SubscriptionSummary'
import { Subscription } from '../types'

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userId = '1' // In a real app, this would come from auth

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get<Subscription[]>(
        `${import.meta.env.VITE_API_URL_DEV}/subscriptions`
      )
      setSubscriptions(response.data)
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    }
  }

  const handleAddSubscription = async (subscription: Omit<Subscription, '_id' | 'userId' | 'createdAt'>) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL_DEV}/subscriptions`, {
        ...subscription,
        userId
      })
      fetchSubscriptions()
    } catch (error) {
      console.error('Error adding subscription:', error)
    }
  }

  const handleUpdateSubscription = async (id: string, updatedData: Partial<Subscription>) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL_DEV}/subscriptions/${id}`, updatedData)
      fetchSubscriptions()
      setEditingSubscription(null)
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  const handleDeleteSubscription = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL_DEV}/subscriptions/${id}`)
      fetchSubscriptions()
    } catch (error) {
      console.error('Error deleting subscription:', error)
    }
  }

  const handleOpenModal = (subscription?: Subscription) => {
    if (subscription) {
      setEditingSubscription(subscription)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSubscription(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Tracker</h1>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary"
          >
            Add Subscription
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <SubscriptionList 
              subscriptions={subscriptions}
              onEdit={handleOpenModal}
              onDelete={handleDeleteSubscription}
            />
          </div>
          <div>
            <SubscriptionSummary subscriptions={subscriptions} />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingSubscription ? 'Edit' : 'Add'} Subscription
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SubscriptionForm 
                onAdd={async (data) => {
                  await handleAddSubscription(data)
                  handleCloseModal()
                }}
                onUpdate={async (id, data) => {
                  await handleUpdateSubscription(id, data)
                  handleCloseModal()
                }}
                editingSubscription={editingSubscription}
                setEditingSubscription={setEditingSubscription}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard