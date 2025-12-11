import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, MessageSquare, ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await resetPassword(email)
      setSubmitted(true)
      toast.success('Password reset email sent! Please check your inbox.')
    } catch (error: unknown) {
      console.error('Reset password error:', error)
      toast.error(error instanceof Error ? error.message : "An error occurred" || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              The link will expire in 1 hour. If you don't see the email, check your spam folder.
            </p>
            <Link to="/login">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">DataCare</h1>
          </div>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-gray-600 mt-1">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="h-11"
                autoComplete="email"
                autoFocus
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
