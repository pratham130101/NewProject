import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function BackendPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-4xl w-full">
        <Link href="/" className="text-blue-500 hover:underline mb-6 block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6">Backend Improvements</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Smart Contract Upgrades</CardTitle>
            <CardDescription>Improvements to the blockchain contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                The original Giveth DApp used older versions of Solidity. We've upgraded the contracts to Solidity 0.8.x
                to take advantage of newer language features and security improvements.
              </p>

              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DonationContract {
    address public owner;
    mapping(address => uint256) public donations;
    
    event DonationReceived(address donor, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        donations[msg.sender] += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }
    
    // Gas-optimized withdrawal function
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Multi-Chain Support</CardTitle>
            <CardDescription>Added support for additional blockchain networks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We've extended the DApp to support multiple blockchain networks, including Ethereum Mainnet, Polygon, and
              Arbitrum. This reduces gas costs for users and improves transaction speed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-muted p-4 rounded-md text-center">
                <h3 className="font-medium mb-2">Ethereum Mainnet</h3>
                <p className="text-sm">Original network with highest security</p>
              </div>
              <div className="bg-muted p-4 rounded-md text-center">
                <h3 className="font-medium mb-2">Polygon</h3>
                <p className="text-sm">Low gas fees and fast transactions</p>
              </div>
              <div className="bg-muted p-4 rounded-md text-center">
                <h3 className="font-medium mb-2">Arbitrum</h3>
                <p className="text-sm">Ethereum L2 with lower fees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blockchain Interaction</CardTitle>
            <CardDescription>Improved Web3 provider integration</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We've modernized the blockchain interaction layer using ethers.js and Web3Modal for a better wallet
              connection experience.
            </p>

            <div className="bg-muted p-4 rounded-md">
              <pre className="text-sm overflow-x-auto">
                {`// Example of improved blockchain interaction code
import { ethers } from 'ethers';
import DonationABI from '../contracts/DonationContract.json';

export async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      return accounts[0];
    } catch (error) {
      console.error("User denied account access");
      return null;
    }
  } else {
    console.error("No Ethereum provider detected");
    return null;
  }
}

export async function donate(amount) {
  if (!window.ethereum) return { success: false, error: "No wallet detected" };
  
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      DonationABI,
      signer
    );
    
    const tx = await contract.donate({ 
      value: ethers.utils.parseEther(amount.toString()) 
    });
    await tx.wait();
    
    return { success: true, txHash: tx.hash };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
