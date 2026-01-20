
import { Card, CardContent } from "@/components/ui/card";
import { Task } from "@prisma/client";
import { CheckCircle2, Circle } from "lucide-react";

interface TaskListProps {
    tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
                <p className="text-muted-foreground">No tasks in this project yet.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {tasks.map((task) => (
                <Card key={task.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                        {task.status === "DONE" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                            <h3 className="font-medium">{task.title}</h3>
                            {task.description && (
                                <p className="text-sm text-muted-foreground truncate">{task.description}</p>
                            )}
                        </div>
                        <div className="text-sm text-muted-foreground capitalize">
                            {task.priority.toLowerCase()}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};
