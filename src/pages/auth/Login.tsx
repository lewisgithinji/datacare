import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2, MessageSquare, Info, Play } from 'lucide-react'
import { DEMO_CREDENTIALS } from '@/data/demo-credentials'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard/inbox'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (error: unknown) {
      console.error('Login error:', error)
      toast.error(error instanceof Error ? error.message : "An error occurred" || 'Failed to sign in. Please check your credentials.')
    } finally {
      setLoading(false)
    }
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
          <p className="text-gray-600">WhatsApp & Chatbot Platform</p>
        </div>

        {/* Demo Card */}
        <div className="mb-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-sm text-blue-900">Try Demo Account</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-blue-800">Explore the platform with full admin access</p>

              <div className="bg-white p-3 rounded border border-blue-200">
                <div className="space-y-1 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{DEMO_CREDENTIALS.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Password:</span>
                    <span className="font-semibold">{DEMO_CREDENTIALS.password}</span>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-blue-300 hover:bg-blue-100"
                disabled={loading}
                onClick={async () => {
                  try {
                    setLoading(true)
                    await signIn(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password)
                    toast.success('Logged in to demo account')
                    navigate(from, { replace: true })
                  } catch (err: unknown) {
                    console.error('Demo login failed:', err)
                    const errorMessage = err instanceof Error ? err.message : 'Demo login failed. Please try again.'
                    toast.error(errorMessage)
                    setLoading(false)
                  }
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Login with Demo Account
                  </>
                )}
              </Button>

              <p className="text-xs text-blue-700">⚡ Full admin access • Pre-loaded data • Safe to explore</p>
            </CardContent>
          </Card>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-1">Sign in to your dashboard</p>
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

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-11 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link to="/signup">
            <Button variant="outline" className="w-full h-11">
              Create Account
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            By signing in, you agree to our{' '}
            <Link to="/terms-of-service" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
