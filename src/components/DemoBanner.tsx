import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { DEMO_CREDENTIALS } from '@/data/demo-credentials'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export function DemoBanner() {
  const { user } = useAuth()

  if (user?.email !== DEMO_CREDENTIALS.email) {
    return null
  }

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-900">Demo Mode Active</AlertTitle>
      <AlertDescription className="text-amber-800">
        You're viewing demo data. Changes are saved but may be reset periodically.
        <Link to="/signup" className="ml-2 underline font-medium hover:text-amber-900">
          Create your account →
        </Link>
      </AlertDescription>
    </Alert>
  )
}

export default DemoBanner
