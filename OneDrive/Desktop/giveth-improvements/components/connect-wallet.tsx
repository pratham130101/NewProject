"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWeb3Context } from "@/contexts/Web3Context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, LogOut, Copy, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function ConnectWallet() {
  const { account, connectWallet, disconnect, chainId, isConnecting } = useWeb3Context()
  const [isOpen, setIsOpen] = useState(false)

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
      toast({
        description: "Address copied to clipboard",
      })
    }
  }

  const getNetworkName = (chainId: number | null) => {
    if (!chainId) return "Unknown Network"

    switch (chainId) {
      case 1:
        return "Ethereum Mainnet"
      case 137:
        return "Polygon"
      case 42161:
        return "Arbitrum One"
      default:
        return `Chain ID: ${chainId}`
    }
  }

  const openEtherscan = () => {
    if (!account) return

    let baseUrl = "https://etherscan.io/address/"
    if (chainId === 137) {
      baseUrl = "https://polygonscan.com/address/"
    } else if (chainId === 42161) {
      baseUrl = "https://arbiscan.io/address/"
    }

    window.open(`${baseUrl}${account}`, "_blank")
  }

  if (!account) {
    return (
      <Button onClick={connectWallet} disabled={isConnecting}>
        {isConnecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Connect Wallet"
        )}
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {account.slice(0, 6)}...{account.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">
          <span className="text-muted-foreground">Network</span>
          <span>{getNetworkName(chainId)}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openEtherscan}>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View on Explorer</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
