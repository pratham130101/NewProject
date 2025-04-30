import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image: string
    category: string
    raised: number
    goal: number
    creator: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const percentFunded = (project.raised / project.goal) * 100

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="aspect-video relative">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <Badge className="absolute top-2 right-2">{project.category}</Badge>
        </div>
        <CardHeader className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{project.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{project.raised} ETH raised</span>
              <span className="text-muted-foreground">of {project.goal} ETH</span>
            </div>
            <Progress value={percentFunded} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
            <span>{percentFunded.toFixed(0)}% funded</span>
            <span>
              Creator: {project.creator.substring(0, 6)}...{project.creator.substring(project.creator.length - 4)}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
