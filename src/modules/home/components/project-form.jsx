"use client";

import { useState } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PROJECT_TEMPLATES = [
  {
    emoji: "🎬",
    title: "Build a Netflix clone",
    prompt:
      "Build a Netflix-style homepage with a hero banner, movie sections, responsive cards, and a modal using mock data.",
  },
  {
    emoji: "📦",
    title: "Admin dashboard",
    prompt:
      "Create an admin dashboard with sidebar, stats cards, charts, and a table with filters.",
  },
  {
    emoji: "📋",
    title: "Kanban board",
    prompt:
      "Build a kanban board with drag-and-drop and task management using local state.",
  },
  {
    emoji: "🗂️",
    title: "File manager",
    prompt:
      "Build a file manager with folder structure, file grid, rename and delete options.",
  },
  {
    emoji: "📺",
    title: "YouTube clone",
    prompt:
      "Build a YouTube homepage with video grid, sidebar, and preview modal.",
  },
  {
    emoji: "🛍️",
    title: "Store page",
    prompt:
      "Build an e-commerce page with filters, product grid, and cart logic.",
  },
  {
    emoji: "🏡",
    title: "Airbnb clone",
    prompt:
      "Build an Airbnb-style listing page with filters and property details modal.",
  },
  {
    emoji: "🎵",
    title: "Spotify clone",
    prompt:
      "Build a music player with playlist sidebar and playback controls.",
  },
];

const ProjectForm = () => {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // 👉 Fill textarea using template
  const handleTemplate = (prompt) => {
    setContent(prompt);
  };

  // 👉 Submit handler (mock for now)
  const onSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Project description is required");
      return;
    }

    console.log("Submitted:", content);

    toast.success("Project created (mock)");

    // reset
    setContent("");
  };

  const isButtonDisabled = !content.trim();

  return (
    <div className="space-y-8">
      {/* 🔹 Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PROJECT_TEMPLATES.map((template, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleTemplate(template.prompt)}
            className="group relative p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all duration-200 text-left hover:shadow-md hover:border-primary/30"
          >
            <div className="flex flex-col gap-2">
              <span className="text-3xl">{template.emoji}</span>
              <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                {template.title}
              </h3>
            </div>

            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        ))}
      </div>

      {/* 🔹 Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or describe your own idea
          </span>
        </div>
      </div>

      {/* 🔹 Form */}
      <form
        onSubmit={onSubmit}
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar transition-all",
          isFocused && "shadow-lg ring-2 ring-primary/20"
        )}
      >
        <TextAreaAutosize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe what you want to create..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          minRows={3}
          maxRows={8}
          className="pt-4 resize-none border-none w-full outline-none bg-transparent"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              onSubmit(e);
            }
          }}
        />

        {/* 🔹 Bottom Bar */}
        <div className="flex gap-x-2 items-end justify-between pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-[10px]">
              ⌘ Enter
            </kbd>{" "}
            to submit
          </div>

          <Button
            type="submit"
            disabled={isButtonDisabled}
            className={cn(
              "size-8 rounded-full",
              isButtonDisabled && "bg-muted-foreground border"
            )}
          >
            <ArrowUpIcon className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;