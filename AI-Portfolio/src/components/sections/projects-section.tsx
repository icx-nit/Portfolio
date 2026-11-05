"use client";

import React, { useState } from "react";
import { Project } from "@/types/portfolio";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight, Heart, X } from "lucide-react";
import { useApp } from "@/lib/i18n/context";

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
  const { t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: "All", label: t.projects.filterAll },
    { id: "Full-Stack", label: t.projects.filterFullStack },
    { id: "Web Development", label: t.projects.filterWeb },
    { id: "System & Tools", label: t.projects.filterTools },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-6 bg-transparent border-b border-white/10">
      <div className="max-w-container mx-auto space-y-12">
        {/* Section Heading & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-soft-quartz font-bold leading-[1.14] tracking-[-1.12px]">
              {t.projects.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-ash-lilac">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Wope 999px Filter Tab Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[13px] transition-all duration-200 min-h-[38px] ${
                  selectedCategory === cat.id
                    ? "bg-ultraviolet-core text-white border border-ultraviolet-core font-medium shadow-[0_0_15px_rgba(113,61,255,0.4)]"
                    : "bg-white/[0.04] text-ash-lilac border border-white/10 hover:border-white/25 hover:text-soft-quartz"
                }`}
              >
                {cat.label}
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
                variant="surface"
                className="group p-6 flex flex-col justify-between space-y-6 hover:border-white/30 transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Category & Like Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider">
                      {project.category}
                    </span>

                    <button
                      onClick={() => onLikeProject?.(project.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] border transition-colors ${
                        isLiked
                          ? "border-red-500/50 text-red-400 bg-red-500/10"
                          : "border-white/10 text-ash-lilac hover:border-white/20 hover:text-soft-quartz"
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
                    <h3 className="font-display text-xl sm:text-2xl text-soft-quartz font-bold tracking-tight group-hover:text-lilac-beam transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[14px] text-ash-lilac leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[12px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-ash-lilac border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-[13px] text-soft-quartz hover:text-lilac-beam hover:underline underline-offset-4 font-medium"
                  >
                    {t.projects.viewDetails}
                  </button>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full text-ash-lilac hover:text-soft-quartz hover:bg-white/[0.08] transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] text-soft-quartz hover:text-lilac-beam"
                        title="Live Demo"
                      >
                        <span>Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-ash-lilac" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-violet/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-night-violet border border-white/15 rounded-card p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-ash-lilac hover:text-soft-quartz hover:border-white/30"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[12px] text-lilac-beam font-mono uppercase tracking-wider">
                {activeProject.category}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-soft-quartz font-bold tracking-tight">
                {activeProject.title}
              </h3>
            </div>

            <p className="text-[15px] text-ash-lilac leading-relaxed">
              {activeProject.overview}
            </p>

            <div className="space-y-3">
              <h4 className="text-[13px] font-mono uppercase tracking-wider text-muted-steel">
                {t.projects.keyHighlights}
              </h4>
              <ul className="space-y-2">
                {activeProject.highlights.map((h, i) => (
                  <li key={i} className="text-[14px] text-soft-quartz/90 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-lilac-beam shrink-0 mt-2" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[13px] font-mono uppercase tracking-wider text-muted-steel">
                {t.projects.technologies}
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.map((tag, i) => (
                  <Badge key={i} variant="glass">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-soft-quartz text-[14px] hover:bg-white/[0.08] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{t.projects.githubRepo}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-ash-lilac" />
              </a>

              <Button variant="ghost" onClick={() => setActiveProject(null)}>
                {t.projects.close}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
