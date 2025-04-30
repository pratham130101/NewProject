"use client"

import { Button } from "@/components/ui/button"
import { useWeb3Context } from "@/contexts/Web3Context"

export default function ConnectWallet() {
  const { account, connectWallet, disconnect, isConnecting } = useWeb3Context()

  return (
    <div>
      {account ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <Button variant="outline" size="sm" onClick={disconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={connectWallet} disabled={isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  )
}
