import Fuse from "fuse.js";
import { models, type MentalModel } from "./models-data";

const fuse = new Fuse(models, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "subtitle", weight: 0.2 },
    { name: "tags", weight: 0.2 },
    { name: "introduction", weight: 0.1 },
    { name: "memorySentence", weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export function searchModels(query: string): MentalModel[] {
  if (!query.trim()) return models;
  const results = fuse.search(query);
  return results.map((r) => r.item);
}

export function filterModels({
  category,
  difficulty,
  query,
  sort,
}: {
  category?: string;
  difficulty?: number;
  query?: string;
  sort?: string;
}): MentalModel[] {
  let results = query ? searchModels(query) : [...models];

  if (category) {
    results = results.filter((m) => m.category === category);
  }

  if (difficulty) {
    results = results.filter((m) => m.difficulty === difficulty);
  }

  switch (sort) {
    case "latest":
      results.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      break;
    case "difficulty-asc":
      results.sort((a, b) => a.difficulty - b.difficulty);
      break;
    case "difficulty-desc":
      results.sort((a, b) => b.difficulty - a.difficulty);
      break;
    default:
      break;
  }

  return results;
}
