import { getProjects } from "@/features/projects/actions";
import { ProjectList } from "@/features/projects/components/project-list";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
    const session = await auth();
    if (!session) redirect("/login");

    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <CreateProjectModal />
            </div>

            <div className="space-y-4">
                <ProjectList projects={projects} />
            </div>
        </div>
    );
}
