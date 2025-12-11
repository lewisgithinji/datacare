import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Banner that appears when user is logged in as demo account.
 * Shows at the top of the dashboard to indicate demo mode.
 */
export function DemoModeBanner() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Only show for demo user
    if (user?.email !== 'demo@datacare.co.ke') {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200 dark:from-amber-950/20 dark:to-yellow-950/20 dark:border-amber-800">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <span className="font-semibold text-amber-900 dark:text-amber-100">
                                Demo Mode
                            </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                            <AlertCircle className="w-4 h-4" />
                            <span>Data resets every hour • Explore all features risk-free</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate('/signup')}
                            className="bg-white hover:bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950 dark:hover:bg-amber-900 dark:border-amber-700 dark:text-amber-100"
                        >
                            Create Free Account →
                        </Button>
                    </div>
                </div>

                {/* Mobile-only message */}
                <div className="sm:hidden mt-2 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Data resets hourly</span>
                </div>
            </div>
        </div>
    );
}
