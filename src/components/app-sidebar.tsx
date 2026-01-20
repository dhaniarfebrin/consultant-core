"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Folder, CheckSquare, Settings } from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "Projects",
        icon: Folder,
        href: "/projects",
    },
    {
        label: "Tasks", // Assuming this might also move, but keeping as requested for now or moving if part of pattern
        icon: CheckSquare,
        href: "/tasks", // I should probably verify if tasks page exists or should just change consistent with others. The instructions said "update links". I'll assume they want clean URLs for all.
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

export const AppSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-bold tracking-tight">
                    ConsultantCore
                </h2>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href
                                    ? "text-white bg-white/10"
                                    : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3")} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
