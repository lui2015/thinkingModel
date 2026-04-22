import Link from "next/link";
import { type MentalModel, getCategoryById, difficultyStars } from "@/lib/models-data";

export default function ModelCard({ model }: { model: MentalModel }) {
  const category = getCategoryById(model.category);

  return (
    <Link href={`/models/${model.slug}`} className="group block">
      <div className="bg-card rounded-2xl border border-border p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-0.5">
        {/* Icon & Difficulty */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{model.icon}</span>
          <span className="text-xs text-text-light">{difficultyStars[model.difficulty]}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-text mb-1 group-hover:text-primary transition-colors">
          {model.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">{model.subtitle}</p>

        {/* Category tag */}
        {category && (
          <span
            className="inline-block text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${category.color}15`,
              color: category.color,
            }}
          >
            {category.icon} {category.name}
          </span>
        )}

        {/* Memory Sentence */}
        <div className="mt-4 pt-4 border-t border-border/60">
          <p className="text-xs text-text-secondary italic leading-relaxed line-clamp-2">
            &ldquo;{model.memorySentence}&rdquo;
          </p>
        </div>
      </div>
    </Link>
  );
}
