"use server";

import { db } from "@/lib/db";
import { CreateProjectSchema } from "./schemas";
import * as z from "zod";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const getProjects = async () => {
    const session = await auth();
    if (!session?.user) return []; // Or remove this check if public

    const projects = await db.project.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: { tasks: true }
            }
        }
    });

    return projects;
}

export const createProject = async (values: z.infer<typeof CreateProjectSchema>) => {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    const validated = CreateProjectSchema.safeParse(values);
    if (!validated.success) {
        return { error: "Invalid fields" };
    }

    const { name, description } = validated.data;

    try {
        await db.project.create({
            data: {
                name,
                description,
            }
        });

        revalidatePath("/dashboard");
        return { success: "Project created" };
    } catch {
        return { error: "Failed to create project" };
    }
}
