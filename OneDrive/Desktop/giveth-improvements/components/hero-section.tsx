import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Give directly to projects you care about
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Giveth is a community-focused platform for projects that make the world a better place, built on
                blockchain technology for full transparency.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/projects">
                <Button size="lg">Explore Projects</Button>
              </Link>
              <Link href="/create">
                <Button size="lg" variant="outline">
                  Create a Project
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-[url('/neighborhood-cleanup.png')] bg-cover bg-center opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg max-w-[80%] text-center">
                    <p className="text-lg font-medium">Over 1,000 projects funded</p>
                    <p className="text-sm text-muted-foreground mt-2">Join the community making a difference</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
