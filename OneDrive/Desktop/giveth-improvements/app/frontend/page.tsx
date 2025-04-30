"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function FrontendPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl w-full">
        <Link href="/" className="text-blue-500 hover:underline mb-6 block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6">Frontend Improvements</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Modern React Patterns</CardTitle>
            <CardDescription>Updated component architecture and state management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We've refactored the frontend to use modern React patterns including hooks, context API, and functional
              components. This improves code readability and maintainability.
            </p>

            <div className="bg-muted p-4 rounded-md">
              <pre className="text-sm overflow-x-auto">
                {`// Example of modern React component with hooks
import { useState, useEffect } from 'react';
import { useWeb3Context } from '@/contexts/Web3Context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DonationForm() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { account, donate } = useWeb3Context();
  
  async function handleDonate(e) {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    try {
      const result = await donate(parseFloat(amount));
      if (result.success) {
        // Show success message
        setAmount('');
      } else {
        // Show error message
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <form onSubmit={handleDonate} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium">
          Donation Amount (ETH)
        </label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.1"
          required
        />
      </div>
      <Button 
        type="submit" 
        disabled={!account || isLoading}
        className="w-full"
      >
        {isLoading ? 'Processing...' : 'Donate'}
      </Button>
    </form>
  );
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Web3Modal Integration</CardTitle>
            <CardDescription>Improved wallet connection experience</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We've integrated Web3Modal to provide a better wallet connection experience with support for multiple
              wallet providers including MetaMask, WalletConnect, and Coinbase Wallet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-muted p-4 rounded-md text-center">
                <h3 className="font-medium mb-2">MetaMask</h3>
                <p className="text-sm">Browser extension wallet</p>
              </div>
              <div className="bg-muted p-4 rounded-md text-center">
                <h3 className="font-medium mb-2">WalletConnect</h3>
                <p className="text-sm">Mobile wallet connection</p>
              </div>
              <div className="bg-muted p-4 rounded-md text-center">
                <h3 className="font-medium mb-2">Coinbase Wallet</h3>
                <p className="text-sm">Custodial wallet option</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Responsive Design</CardTitle>
            <CardDescription>Mobile-first approach with Tailwind CSS</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We've implemented a fully responsive design using Tailwind CSS to ensure the application works well on all
              device sizes from mobile to desktop.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Before</h3>
                <p className="text-sm">Limited mobile support with fixed layouts</p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">After</h3>
                <p className="text-sm">Fully responsive with adaptive components</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
