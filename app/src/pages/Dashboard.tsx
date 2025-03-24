import { useState, useEffect } from 'react'
import axios from 'axios'
import SubscriptionForm from '../components/SubscriptionForm'
import SubscriptionList from '../components/SubscriptionList'
import SubscriptionSummary from '../components/SubscriptionSummary'
import { Subscription } from '../types'

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Subscription Tracker</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <SubscriptionForm 
              onAdd={handleAddSubscription}
              onUpdate={handleUpdateSubscription}
              editingSubscription={editingSubscription}
              setEditingSubscription={setEditingSubscription}
            />
            <SubscriptionList 
              subscriptions={subscriptions}
              onEdit={setEditingSubscription}
              onDelete={handleDeleteSubscription}
            />
          </div>
          <div>
            <SubscriptionSummary subscriptions={subscriptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard