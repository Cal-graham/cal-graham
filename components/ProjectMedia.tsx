import React, { useState } from 'react';
import { ProjectItem } from '../types';

// --- Helper for Image Fallback ---
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, title: string) => {
  const target = e.currentTarget;
  // Debug log to help identifying path issues
  console.warn(`[Image Load Fail] Project: "${title}" | Tried path: ${target.src}`);

  target.onerror = null; // Prevent infinite loop
  // Use a professional placeholder service if local image fails
  target.src = `https://placehold.co/800x600/1e293b/0ea5e9?text=${encodeURIComponent(title)}`;
};

// Shows the project's video when it has one (photo as the poster frame), otherwise the photo.
// Video autoplays muted on loop, unless the visitor prefers reduced motion.
const ProjectMedia: React.FC<{ project: ProjectItem; alt: string; controls?: boolean }> = ({ project, alt, controls = false }) => {
  const [videoFailed, setVideoFailed] = useState(false);
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (project.videoUrl && !videoFailed) {
    return (
      <video
        src={project.videoUrl}
        poster={project.imageUrl}
        aria-label={alt || undefined}
        className="w-full h-full object-cover"
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        controls={controls || reducedMotion}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  return (
    <img
      src={project.imageUrl}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover"
      onError={(e) => handleImageError(e, project.title)}
    />
  );
};

export default ProjectMedia;
