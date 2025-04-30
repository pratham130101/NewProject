import { render, screen, fireEvent } from "@testing-library/react"
import DonationForm from "@/components/DonationForm"

// Mock the Web3Context
jest.mock("@/contexts/Web3Context", () => ({
  useWeb3Context: () => ({
    account: "0x1234567890abcdef1234567890abcdef12345678",
    donate: jest.fn().mockResolvedValue({ success: true, txHash: "0xabcdef" }),
    isConnecting: false,
  }),
  Web3Provider: ({ children }) => <div>{children}</div>,
}))

// Mock the toast component
jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}))

describe("DonationForm", () => {
  it("renders the donation form", () => {
    render(<DonationForm />)

    expect(screen.getByText("Make a Donation")).toBeInTheDocument()
    expect(screen.getByLabelText("Amount (ETH)")).toBeInTheDocument()
    expect(screen.getByText("Donate Now")).toBeInTheDocument()
  })

  it("allows entering an amount", () => {
    render(<DonationForm />)

    const input = screen.getByLabelText("Amount (ETH)")
    fireEvent.change(input, { target: { value: "0.1" } })

    expect(input.value).toBe("0.1")
  })

  // Add more tests for form submission, error handling, etc.
})
