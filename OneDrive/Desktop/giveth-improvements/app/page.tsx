import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  // Sample project data
  const featuredProjects = [
    {
      id: "1",
      title: "Clean Water Initiative",
      description: "Providing clean water solutions to communities in need",
      image: "/placeholder.svg?key=unwk3",
      category: "Environment",
      raised: 2.45,
      goal: 5,
      creator: "0x1234...5678",
    },
    {
      id: "2",
      title: "Education for All",
      description: "Supporting education in underserved communities",
      image: "/collaborative-learning-space.png",
      category: "Education",
      raised: 1.8,
      goal: 3,
      creator: "0x8765...4321",
    },
    {
      id: "3",
      title: "Wildlife Conservation",
      description: "Protecting endangered species and their habitats",
      image: "/interconnected-conservation.png",
      category: "Environment",
      raised: 3.2,
      goal: 4,
      creator: "0x5678...1234",
    },
    {
      id: "4",
      title: "Community Garden",
      description: "Creating sustainable food sources in urban areas",
      image: "/vibrant-urban-garden.png",
      category: "Community",
      raised: 0.9,
      goal: 2,
      creator: "0x4321...8765",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container py-12 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
            <p className="text-muted-foreground">Support these verified projects making a difference</p>
          </div>
          <Link href="/projects">
            <Button variant="outline">View All Projects</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-12">
        <div className="container space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground mt-2">
              Giveth uses blockchain technology to create transparent and direct giving
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Create or Find a Project</h3>
              <p className="text-muted-foreground">Browse verified projects or create your own to start fundraising</p>
            </div>

            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground">Use MetaMask, WalletConnect, or other Ethereum wallets</p>
            </div>

            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Donate Directly</h3>
              <p className="text-muted-foreground">Your donation goes directly to the project with full transparency</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
