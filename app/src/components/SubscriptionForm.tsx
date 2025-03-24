import { useState, useEffect } from 'react'
import { SubscriptionFormProps } from '../types'

const SubscriptionForm = ({ 
  onAdd, 
  onUpdate, 
  editingSubscription, 
  setEditingSubscription 
}: SubscriptionFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    isActive: true
  })

  useEffect(() => {
    if (editingSubscription) {
      setFormData({
        name: editingSubscription.name,
        price: editingSubscription.price.toString(),
        isActive: editingSubscription.isActive
      })
    }
  }, [editingSubscription])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const subscriptionData = {
      name: formData.name,
      price: parseFloat(formData.price),
      isActive: formData.isActive
    }

    try {
      if (editingSubscription) {
        await onUpdate(editingSubscription._id, subscriptionData)
      } else {
        await onAdd(subscriptionData)
      }
      
      setFormData({
        name: '',
        price: '',
        isActive: true
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            id="isActive"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Active Subscription
          </label>
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingSubscription ? 'Update' : 'Add'} Subscription
          </button>
          {editingSubscription && (
            <button
              type="button"
              onClick={() => setEditingSubscription(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SubscriptionForm