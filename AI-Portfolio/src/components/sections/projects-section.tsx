"use client";

import React, { useState } from "react";
import { Project } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight, Heart, Sparkles, X } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  likedProjectIds?: string[];
  onLikeProject?: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  likedProjectIds = [],
  onLikeProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["All", "Full-Stack", "Web Development", "System & Tools"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-6 bg-obsidian border-b border-char">
      <div className="max-w-container mx-auto space-y-12">
        {/* Section Heading & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-bone font-normal leading-[1.05] tracking-[-0.03em]">
              Selected Projects
            </h2>
            <p className="text-[16px] text-slate">
              Real-world systems, coursework implementations, and full-stack software built by Nittaya Pana.
            </p>
          </div>

          {/* Clyde Filter Tab Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[14px] transition-all duration-200 min-h-[38px] ${
                  selectedCategory === cat
                    ? "bg-bone text-obsidian border border-bone font-medium"
                    : "bg-transparent text-bone/70 border border-char hover:border-bone/50 hover:text-bone"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isLiked = likedProjectIds.includes(project.id);
            return (
              <Card
                key={project.id}
                variant="char"
                className="group p-6 flex flex-col justify-between space-y-6 hover:border-bone/50 transition-colors"
              >
                <div className="space-y-4">
                  {/* Category & Like Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-slate font-mono uppercase tracking-wider">
                      {project.category}
                    </span>

                    <button
                      onClick={() => onLikeProject?.(project.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] border transition-colors ${
                        isLiked
                          ? "border-red-500/50 text-red-400 bg-red-500/10"
                          : "border-char text-slate hover:border-bone hover:text-bone"
                      }`}
                      title={isLiked ? "Liked" : "Like this project"}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isLiked ? "fill-red-400 text-red-400" : ""}`}
                      />
                      <span>{project.likesCount + (isLiked ? 1 : 0)}</span>
                    </button>
                  </div>

                  {/* Title & Overview */}
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-bone tracking-tight group-hover:text-bone transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[14px] text-slate leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[12px] font-mono px-2.5 py-0.5 rounded-full bg-char/40 text-bone/70 border border-char"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-char/60 flex items-center justify-between">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-[13px] text-bone hover:underline underline-offset-4 font-medium"
                  >
                    View Details
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-slate hover:text-bone hover:bg-char/50 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] text-bone/80 hover:text-bone"
                        title="Live Demo"
                      >
                        <span>Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate" />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-obsidian border border-char rounded-[16px] p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-char text-slate hover:text-bone hover:border-bone"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[12px] text-slate font-mono uppercase tracking-wider">
                {activeProject.category}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-bone tracking-tight">
                {activeProject.title}
              </h3>
            </div>

            <p className="text-[15px] text-bone/80 leading-relaxed">
              {activeProject.overview}
            </p>

            <div className="space-y-3">
              <h4 className="text-[13px] font-mono uppercase tracking-wider text-slate">
                Key Architecture Highlights
              </h4>
              <ul className="space-y-2">
                {activeProject.highlights.map((h, i) => (
                  <li key={i} className="text-[14px] text-bone/90 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-bone shrink-0 mt-2" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[13px] font-mono uppercase tracking-wider text-slate">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((tag, i) => (
                  <Badge key={i} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-char flex items-center justify-between">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bone text-bone text-[14px] hover:bg-bone hover:text-obsidian transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Source</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <Button variant="ghost" onClick={() => setActiveProject(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
