"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonationForm } from "@/components/donation-form"
import { ArrowLeft, Heart, Share2, Flag } from "lucide-react"

// Mock project data - in a real app, this would come from an API or blockchain
const projects = {
  "1": {
    id: "1",
    title: "Clean Water Initiative",
    description:
      "Providing clean water solutions to communities in need across developing regions. This project focuses on building sustainable water infrastructure and educating communities about water conservation and hygiene practices.",
    longDescription: `
      <p>Access to clean water is a fundamental human right, yet millions of people around the world still lack this basic necessity. Our Clean Water Initiative aims to address this critical issue by implementing sustainable solutions in communities facing water scarcity and contamination.</p>
      
      <p>Through this project, we will:</p>
      <ul>
        <li>Install water filtration systems in 10 villages</li>
        <li>Dig wells and create sustainable water access points</li>
        <li>Provide education on water conservation and hygiene</li>
        <li>Train local technicians to maintain the water systems</li>
      </ul>
      
      <p>Your donation will directly fund these activities and help bring clean, safe water to thousands of people. All transactions are recorded on the blockchain, ensuring complete transparency in how funds are used.</p>
    `,
    image: "/placeholder.svg?key=fv6uw",
    category: "Environment",
    raised: 2.45,
    goal: 5,
    creator: "0x1234...5678",
    creatorName: "Water for All Foundation",
    updates: [
      {
        date: "2023-04-15",
        title: "First village installation complete",
        content:
          "We've successfully installed the first water filtration system in Village A, providing clean water to 500 residents.",
      },
      {
        date: "2023-03-01",
        title: "Project launch",
        content: "We're excited to announce the launch of our Clean Water Initiative on Giveth!",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Education for All",
    description:
      "Supporting education in underserved communities by providing resources, training teachers, and building infrastructure.",
    longDescription: `
      <p>Education is the key to breaking the cycle of poverty and creating opportunities for future generations. Our Education for All project aims to improve access to quality education in underserved communities.</p>
      
      <p>This project will focus on:</p>
      <ul>
        <li>Building and renovating classroom facilities</li>
        <li>Providing educational materials and technology</li>
        <li>Training and supporting teachers</li>
        <li>Creating scholarship programs for students in need</li>
      </ul>
      
      <p>Your contribution will help create educational opportunities for children who otherwise might not have access to quality learning environments.</p>
    `,
    image: "/collaborative-learning-space.png",
    category: "Education",
    raised: 1.8,
    goal: 3,
    creator: "0x8765...4321",
    creatorName: "Global Education Network",
    updates: [
      {
        date: "2023-05-10",
        title: "School supplies delivered",
        content: "We've delivered school supplies to 5 schools, benefiting over 1,000 students.",
      },
      {
        date: "2023-02-15",
        title: "Project launch",
        content: "We're excited to announce our Education for All initiative on Giveth!",
      },
    ],
  },
  // Additional projects would be defined here
}

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = projects[projectId]

  if (!project) {
    return <div className="container py-12">Project not found</div>
  }

  const percentFunded = (project.raised / project.goal) * 100

  return (
    <div className="container py-8">
      <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to projects
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground mt-2">{project.description}</p>

            <div className="flex items-center mt-4 text-sm">
              <span className="text-muted-foreground">Created by</span>
              <span className="font-medium ml-2">{project.creatorName}</span>
              <span className="text-xs text-muted-foreground ml-2">({project.creator})</span>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4">
              <div dangerouslySetInnerHTML={{ __html: project.longDescription }} />
            </TabsContent>
            <TabsContent value="updates">
              <div className="space-y-4">
                {project.updates.map((update, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{update.title}</h3>
                        <p className="text-sm text-muted-foreground">{update.date}</p>
                      </div>
                    </div>
                    <p className="mt-2">{update.content}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{project.raised} ETH raised</span>
                  <span className="text-muted-foreground">of {project.goal} ETH goal</span>
                </div>
                <Progress value={percentFunded} className="h-2" />
              </div>

              <div className="flex justify-between text-sm">
                <span>{percentFunded.toFixed(0)}% funded</span>
                <span>on Ethereum</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <DonationForm projectId={project.id} projectTitle={project.title} />
        </div>
      </div>
    </div>
  )
}
