"use client"

import type React from "react"

import { useState } from "react"
import { useWeb3Context } from "@/contexts/Web3Context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface DonationFormProps {
  projectId: string
  projectTitle: string
}

export function DonationForm({ projectId, projectTitle }: DonationFormProps) {
  const [amount, setAmount] = useState("")
  const [network, setNetwork] = useState("ethereum")
  const [isLoading, setIsLoading] = useState(false)
  const { account, donate } = useWeb3Context()

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault()
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsLoading(true)
    try {
      const result = await donate(Number.parseFloat(amount), projectId)
      if (result.success) {
        toast({
          title: "Donation successful!",
          description: `You donated ${amount} ETH to ${projectTitle}. Transaction hash: ${result.txHash?.slice(0, 10)}...`,
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
        <CardTitle>Donate to this project</CardTitle>
        <CardDescription>Your donation goes directly to the project creator</CardDescription>
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
              min="0.001"
              step="0.001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.1"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="network" className="text-sm font-medium">
              Network
            </label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger id="network">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="arbitrum">Arbitrum</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {!account ? (
          <Button disabled className="w-full">
            Connect wallet to donate
          </Button>
        ) : (
          <Button onClick={handleDonate} disabled={isLoading || !amount} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Donate ${amount ? amount : "0"} ETH`
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
