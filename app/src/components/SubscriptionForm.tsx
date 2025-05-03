import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { SubscriptionFormProps, SubscriptionStatus } from '../types'

const statusOptions = [
  { value: SubscriptionStatus.ACTIVE, label: 'Active'},
  { value: SubscriptionStatus.PAUSED, label: 'Paused'},
  { value: SubscriptionStatus.CANCELLED, label: 'Cancelled'},
  { value: SubscriptionStatus.EXPIRED, label: 'Expired'},
]

const SubscriptionForm = ({ 
  onAdd, 
  onUpdate,
  editingSubscription, 
  setEditingSubscription,
  handleCloseModal,
}: SubscriptionFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    status: SubscriptionStatus.ACTIVE,
    dueDate: new Date(),
  })

  useEffect(() => {
    if (editingSubscription) {
      setFormData({
        name: editingSubscription.name,
        price: editingSubscription.price.toString(),
        status: editingSubscription.status,
        dueDate: new Date(editingSubscription.dueDate),
      })
    }
  }, [editingSubscription])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleDateChange = (date: Date) => {
    setFormData(prev => ({
      ...prev,
      dueDate: date,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const subscriptionData = {
      name: formData.name,
      price: parseFloat(formData.price),
      status: formData.status,
      dueDate: formData.dueDate,
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
        status: SubscriptionStatus.ACTIVE,
        dueDate: new Date()
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
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <DatePicker 
            selected={formData.dueDate}
            onChange={(date) => date && handleDateChange}
            minDate={new Date()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
              onClick={() => {
                setEditingSubscription(null)
                handleCloseModal()
              }}
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