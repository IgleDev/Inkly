import { Outlet } from 'react-router-dom'
export default function InfoAppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <Outlet />
      </div>
    </div>
  )
}