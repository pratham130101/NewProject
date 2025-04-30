"use client"

import type React from "react"

import { useState } from "react"
import { useWeb3Context } from "@/contexts/Web3Context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function DonationForm() {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { account, donate } = useWeb3Context()

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault()
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsLoading(true)
    try {
      const result = await donate(Number.parseFloat(amount))
      if (result.success) {
        toast({
          title: "Donation successful!",
          description: `Transaction hash: ${result.txHash?.slice(0, 10)}...`,
        })
        setAmount("")
      } else {
        toast({
          title: "Donation failed",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Donation</CardTitle>
        <CardDescription>Support projects you care about</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDonate} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount (ETH)
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
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDonate} disabled={!account || isLoading || !amount} className="w-full">
          {isLoading ? "Processing..." : "Donate Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}
