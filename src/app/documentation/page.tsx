import { PageLayout } from "@/app/components/layout/page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import Link from "next/link";

export default function DocumentationHubPage() {
  const documentationSections = [
    {
      id: "chat",
      title: "Chat Documentation",
      description: "Guides for CopilotKit chat components and customization.",
      href: "/documentation/chat",
    },
    {
      id: "agents",
      title: "Agents Documentation",
      description: "Detailed information about all available agents and integration patterns.",
      href: "/documentation/agents",
    },
    {
      id: "memory",
      title: "Memory Documentation",
      description: "Memory systems, data persistence, and vector storage.",
      href: "/documentation/memory",
    },
    {
      id: "networks",
      title: "Networks Documentation",
      description: "Agent networks, orchestration, and workflow building.",
      href: "/documentation/networks",
    },
    {
      id: "settings",
      title: "Settings Documentation",
      description: "System configuration, environment variables, and deployment guides.",
      href: "/documentation/settings",
    },
    {
      id: "tools",
      title: "Tools Documentation",
      description: "Comprehensive information about all available tools and their integration.",
      href: "/documentation/tools",
    },
    {
      id: "workflows",
      title: "Workflows Documentation",
      description: "Workflow creation, execution, and optimization guides.",
      href: "/documentation/workflows",
    },
  ];

  return (
    <PageLayout
      title="Documentation Hub"
      description="Comprehensive guides and references for the CopilotKit Integration System."
    >
      <div className="space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full pl-10"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {/* Search Icon Placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
        </div>

        <Separator />

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentationSections.map((section) => (
            <Link href={section.href} key={section.id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Icon or visual representation can go here */}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
