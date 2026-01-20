import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Project } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

interface ProjectListProps {
    projects: (Project & { _count: { tasks: number } })[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
    if (projects.length === 0) {
        return (
            <div className="text-center p-10 text-muted-foreground border border-dashed rounded-lg">
                No projects found. Create one to get started!
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
                <Link href={`/projects/${project.id}`} key={project.id}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>{project.name}</span>
                                <span className="text-xs text-muted-foreground font-normal">
                                    {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
                                </span>
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {project.description || "No description"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                Tasks: {project._count.tasks}
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
