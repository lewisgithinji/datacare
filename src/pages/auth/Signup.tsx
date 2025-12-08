import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2, MessageSquare, Check, X } from 'lucide-react'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  // Password validation
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const passwordValid = Object.values(passwordRequirements).every((req) => req)
  const passwordsMatch = password === confirmPassword && password.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!fullName.trim()) {
      toast.error('Please enter your full name')
      return
    }

    if (!passwordValid) {
      toast.error('Password does not meet requirements')
      return
    }

    if (!passwordsMatch) {
      toast.error('Passwords do not match')
      return
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the Terms of Service')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, fullName)
      toast.success('Account created! Please check your email to verify your account.')
      navigate('/login')
    } catch (error: unknown) {
      console.error('Signup error:', error)

      // Handle specific error cases
      if (error instanceof Error ? error.message : "An error occurred"?.includes('already registered')) {
        toast.error('This email is already registered. Please sign in instead.')
      } else {
        toast.error(error instanceof Error ? error.message : "An error occurred" || 'Failed to create account. Please try again.')
      }
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
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
            <p className="text-gray-600 mt-1">Start managing conversations today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="John Doe"
                className="h-11"
                autoComplete="name"
                autoFocus
              />
            </div>

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
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-11 pr-10"
                  autoComplete="new-password"
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

              {/* Password Requirements */}
              {password && (
                <div className="mt-2 space-y-1 text-xs">
                  <PasswordRequirement
                    met={passwordRequirements.minLength}
                    text="At least 8 characters"
                  />
                  <PasswordRequirement
                    met={passwordRequirements.hasUppercase}
                    text="One uppercase letter"
                  />
                  <PasswordRequirement
                    met={passwordRequirements.hasLowercase}
                    text="One lowercase letter"
                  />
                  <PasswordRequirement
                    met={passwordRequirements.hasNumber}
                    text="One number"
                  />
                  <PasswordRequirement
                    met={passwordRequirements.hasSpecial}
                    text="One special character"
                  />
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="h-11"
                autoComplete="new-password"
              />
              {confirmPassword && (
                <p
                  className={`text-xs flex items-center gap-1 ${
                    passwordsMatch ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {passwordsMatch ? (
                    <>
                      <Check className="h-3 w-3" /> Passwords match
                    </>
                  ) : (
                    <>
                      <X className="h-3 w-3" /> Passwords do not match
                    </>
                  )}
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-tight cursor-pointer"
              >
                I agree to the{' '}
                <Link to="/terms-of-service" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11"
              disabled={loading || !agreedToTerms}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
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
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <Link to="/login">
            <Button variant="outline" className="w-full h-11">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Helper component for password requirements
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-1 ${met ? 'text-green-600' : 'text-gray-400'}`}>
      {met ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      <span>{text}</span>
    </div>
  )
}
