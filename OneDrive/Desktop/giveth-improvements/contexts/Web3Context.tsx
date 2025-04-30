"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"
import { toast } from "@/components/ui/use-toast"

type Web3ContextType = {
  account: string | null
  chainId: number | null
  connectWallet: () => Promise<void>
  disconnect: () => void
  donate: (amount: number, projectId: string) => Promise<{ success: boolean; txHash?: string; error?: string }>
  isConnecting: boolean
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

// Mock contract ABI and address for demonstration
const CONTRACT_ADDRESS = "0x123456789abcdef123456789abcdef123456789"
const CONTRACT_ABI = [
  "function donate(string projectId) public payable",
  "function withdraw() public",
  "event DonationReceived(address donor, uint256 amount, string projectId)",
]

export function Web3Provider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if already connected
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
            window.ethereum.request({ method: "eth_chainId" }).then((chainId: string) => {
              setChainId(Number.parseInt(chainId, 16))
            })
          }
        })
        .catch(console.error)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setAccount(null)
        } else {
          setAccount(accounts[0])
        }
      }

      const handleChainChanged = (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
        // Reload the page when chain changes
        window.location.reload()
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          window.ethereum.removeListener("chainChanged", handleChainChanged)
        }
      }
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast({
        title: "Wallet not found",
        description: "Please install MetaMask or another Ethereum wallet",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      setChainId(Number.parseInt(chainId, 16))

      toast({
        title: "Wallet connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      })
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection failed",
        description: error.message || "Could not connect to wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const donate = async (amount: number, projectId: string) => {
    if (typeof window === "undefined" || !window.ethereum || !account) {
      return { success: false, error: "No wallet connected" }
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // In a real implementation, we would call the actual contract method
      // For demo purposes, we'll simulate a successful transaction

      // Uncomment this for real implementation:
      // const tx = await contract.donate(projectId, {
      //   value: ethers.utils.parseEther(amount.toString()),
      // })
      // await tx.wait()
      // return { success: true, txHash: tx.hash }

      // For demo, simulate a delay and return a fake transaction hash
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return {
        success: true,
        txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      }
    } catch (error: any) {
      console.error("Donation error:", error)
      return { success: false, error: error.message || "Transaction failed" }
    }
  }

  return (
    <Web3Context.Provider
      value={{
        account,
        chainId,
        connectWallet,
        disconnect,
        donate,
        isConnecting,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3Context() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error("useWeb3Context must be used within a Web3Provider")
  }
  return context
}
