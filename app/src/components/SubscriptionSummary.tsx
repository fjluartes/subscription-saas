import { SubscriptionSummaryProps } from '../types'

const SubscriptionSummary = ({ subscriptions }: SubscriptionSummaryProps) => {
  const activeSubscriptions = subscriptions.filter(sub => sub.isActive)
  const totalMonthlyCost = activeSubscriptions.reduce((sum, sub) => sum + sub.price, 0)
  const totalYearlyCost = totalMonthlyCost * 12

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Summary</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Total Active Subscriptions</h3>
          <p className="text-3xl font-semibold text-gray-900">{activeSubscriptions.length}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Monthly Cost</h3>
          <p className="text-3xl font-semibold text-gray-900">${totalMonthlyCost.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Yearly Cost</h3>
          <p className="text-3xl font-semibold text-gray-900">${totalYearlyCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionSummary