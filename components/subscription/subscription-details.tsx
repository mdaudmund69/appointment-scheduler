import { format } from "date-fns"

interface SubscriptionDetailsProps {
  tier: string
  status: string
  endDate: string | null
}

export default function SubscriptionDetails({ tier, status, endDate }: SubscriptionDetailsProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Current Subscription</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Plan:</span>
          <span className="font-semibold text-gray-900 capitalize">{tier}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-semibold capitalize ${status === "active" ? "text-green-600" : "text-red-600"}`}>
            {status}
          </span>
        </div>

        {endDate && (
          <div className="flex justify-between">
            <span className="text-gray-600">Renews on:</span>
            <span className="font-semibold text-gray-900">{format(new Date(endDate), "MMM dd, yyyy")}</span>
          </div>
        )}
      </div>
    </div>
  )
}
