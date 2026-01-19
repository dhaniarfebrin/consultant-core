"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateProjectSchema } from "@/features/projects/schemas";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createProject } from "@/features/projects/actions";
import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldInput } from "@/components/form/field-input";

export const CreateProjectModal = () => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof CreateProjectSchema>>({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CreateProjectSchema>) => {
        startTransition(() => {
            createProject(values).then((data) => {
                if (data?.success) {
                    setOpen(false);
                    form.reset();
                    // Router refresh usually handled by action revalidatePath, but safe to add
                    router.refresh();
                }
            });
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Create a new project to start tracking tasks.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FieldInput
                            control={form.control}
                            name="name"
                            label="Project Name"
                            placeholder="My Awesome Project"
                            disabled={isPending}
                        />
                        <FieldInput
                            control={form.control}
                            name="description"
                            label="Description"
                            placeholder="Optional description"
                            disabled={isPending}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating..." : "Create Project"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
