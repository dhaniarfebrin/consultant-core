
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { MoreHorizontal, Plus } from "lucide-react";

interface ProjectHeaderProps {
    project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                    <p className="text-muted-foreground mt-1">
                        {project.description || "No description provided"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                    </Button>
                </div>
            </div>
        </div>
    );
};
