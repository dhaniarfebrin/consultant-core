
import { auth } from "@/auth";
import { getProject } from "@/features/projects/actions";
import { ProjectHeader } from "@/features/projects/components/project-header";
import { TaskList } from "@/features/projects/components/task-list";
import { notFound, redirect } from "next/navigation";

interface ProjectDetailPageProps {
    params: Promise<{
        projectId: string;
    }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
    const session = await auth();
    if (!session) redirect("/login");

    const resolvedParams = await params;
    const project = await getProject(resolvedParams.projectId);

    if (!project) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <ProjectHeader project={project} />
            
            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">Tasks</h2>
                <TaskList tasks={project.tasks} />
            </div>
        </div>
    );
}
