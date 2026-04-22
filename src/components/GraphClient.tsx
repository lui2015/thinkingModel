"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { models, categories, getCategoryById } from "@/lib/models-data";

interface GraphNode {
  id: string;
  slug: string;
  title: string;
  icon: string;
  category: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface GraphEdge {
  source: string;
  target: string;
}

export default function GraphClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const nodesRef = useRef<GraphNode[]>([]);
  const edgesRef = useRef<GraphEdge[]>([]);
  const animRef = useRef<number>(0);
  const dragRef = useRef<{ node: GraphNode | null; offsetX: number; offsetY: number }>({
    node: null, offsetX: 0, offsetY: 0,
  });
  const panRef = useRef({ x: 0, y: 0, scale: 1 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const initGraph = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const cx = w / 2;
    const cy = h / 2;

    // Create nodes
    nodesRef.current = models.map((m, i) => {
      const cat = getCategoryById(m.category);
      const angle = (i / models.length) * Math.PI * 2;
      const radius = 150 + Math.random() * 100;
      return {
        id: m.id,
        slug: m.slug,
        title: m.title,
        icon: m.icon,
        category: m.category,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        color: cat?.color || "#6C5CE7",
      };
    });

    // Create edges from relatedModels
    const edgeSet = new Set<string>();
    edgesRef.current = [];
    models.forEach((m) => {
      m.relatedModels.forEach((rel) => {
        const targetModel = models.find((mm) => mm.slug === rel);
        if (targetModel) {
          const key = [m.id, targetModel.id].sort().join("-");
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
            edgesRef.current.push({ source: m.id, target: targetModel.id });
          }
        }
      });
    });

    panRef.current = { x: 0, y: 0, scale: 1 };
  }, []);

  const simulate = useCallback(() => {
    const nodes = nodesRef.current;
    const edges = edgesRef.current;
    const canvas = canvasRef.current;
    if (!canvas || nodes.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;
    const cx = w / 2;
    const cy = h / 2;

    // Force simulation
    // Repulsion between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = 800 / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        nodes[i].vx -= fx;
        nodes[i].vy -= fy;
        nodes[j].vx += fx;
        nodes[j].vy += fy;
      }
    }

    // Attraction along edges
    edges.forEach((e) => {
      const source = nodes.find((n) => n.id === e.source);
      const target = nodes.find((n) => n.id === e.target);
      if (!source || !target) return;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = (dist - 120) * 0.005;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      source.vx += fx;
      source.vy += fy;
      target.vx -= fx;
      target.vy -= fy;
    });

    // Center gravity
    nodes.forEach((n) => {
      n.vx += (cx - n.x) * 0.001;
      n.vy += (cy - n.y) * 0.001;
    });

    // Update positions
    nodes.forEach((n) => {
      if (dragRef.current.node?.id === n.id) return;
      n.vx *= 0.85;
      n.vy *= 0.85;
      n.x += n.vx;
      n.y += n.vy;
      n.x = Math.max(30, Math.min(w - 30, n.x));
      n.y = Math.max(30, Math.min(h - 30, n.y));
    });

    // Read theme colors from CSS variables
    const rootStyles = getComputedStyle(document.documentElement);
    const textColor = rootStyles.getPropertyValue("--color-text").trim() || "#2D3436";
    const textLightColor = rootStyles.getPropertyValue("--color-text-light").trim() || "#B2BEC3";
    const primaryColor = rootStyles.getPropertyValue("--color-primary").trim() || "#6C5CE7";
    const borderColor = rootStyles.getPropertyValue("--color-border").trim() || "#E0E0E8";

    // Draw
    ctx.save();
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.clearRect(0, 0, w, h);

    const { scale } = panRef.current;
    ctx.translate(panRef.current.x, panRef.current.y);

    const isFiltered = selectedCategory !== "";

    // Draw edges
    edges.forEach((e) => {
      const source = nodes.find((n) => n.id === e.source);
      const target = nodes.find((n) => n.id === e.target);
      if (!source || !target) return;

      const bothMatch = !isFiltered || (source.category === selectedCategory && target.category === selectedCategory);
      
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = bothMatch ? `${primaryColor}26` : `${borderColor}20`;
      ctx.lineWidth = bothMatch ? 1.5 : 0.5;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach((n) => {
      const isMatch = !isFiltered || n.category === selectedCategory;
      const isHovered = hoveredNode?.id === n.id;
      const radius = isHovered ? 28 : 22;
      const alpha = isMatch ? 1 : 0.2;

      // Node circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isHovered
        ? n.color
        : isMatch
        ? `${n.color}22`
        : `${borderColor}18`;
      ctx.fill();
      ctx.strokeStyle = isMatch ? `${n.color}${isHovered ? "ff" : "88"}` : `${borderColor}33`;
      ctx.lineWidth = isHovered ? 2.5 : 1.5;
      ctx.stroke();

      // Icon
      ctx.font = `${isHovered ? 18 : 14}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.globalAlpha = alpha;
      ctx.fillText(n.icon, n.x, n.y);
      ctx.globalAlpha = 1;

      // Label
      if (isHovered || (isMatch && scale >= 0.8)) {
        ctx.font = `${isHovered ? "bold " : ""}11px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = isMatch ? textColor : `${textLightColor}4D`;
        ctx.fillText(n.title, n.x, n.y + radius + 14);
      }
    });

    ctx.restore();
    animRef.current = requestAnimationFrame(simulate);
  }, [hoveredNode, selectedCategory]);

  useEffect(() => {
    initGraph();
    animRef.current = requestAnimationFrame(simulate);

    const handleResize = () => {
      initGraph();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initGraph, simulate]);

  const getNodeAtPosition = (x: number, y: number): GraphNode | null => {
    const px = x - panRef.current.x;
    const py = y - panRef.current.y;
    for (const n of nodesRef.current) {
      const dx = n.x - px;
      const dy = n.y - py;
      if (Math.sqrt(dx * dx + dy * dy) < 24) return n;
    }
    return null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };

    if (dragRef.current.node) {
      dragRef.current.node.x = x - panRef.current.x;
      dragRef.current.node.y = y - panRef.current.y;
      dragRef.current.node.vx = 0;
      dragRef.current.node.vy = 0;
      return;
    }

    const node = getNodeAtPosition(x, y);
    setHoveredNode(node);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = node ? "pointer" : "default";
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const node = getNodeAtPosition(x, y);
    if (node) {
      dragRef.current = { node, offsetX: 0, offsetY: 0 };
    }
  };

  const handleMouseUp = () => {
    if (dragRef.current.node) {
      dragRef.current = { node: null, offsetX: 0, offsetY: 0 };
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const node = getNodeAtPosition(x, y);
    if (node) {
      window.location.href = `/models/${node.slug}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-text">模型图谱</h1>
        <p className="text-text-secondary mt-2">
          可视化探索 {models.length} 个思维模型之间的关联关系，点击节点查看详情
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!selectedCategory ? "bg-primary text-white" : "bg-surface-alt text-text-secondary hover:text-text"}`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.id ? "text-white" : "bg-surface-alt text-text-secondary hover:text-text"}`}
            style={selectedCategory === cat.id ? { backgroundColor: cat.color } : undefined}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="relative w-full bg-card rounded-2xl border border-border overflow-hidden" style={{ height: "70vh" }}>
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
          className="block w-full h-full"
        />

        {/* Hover tooltip */}
        {hoveredNode && (
          <div
            className="absolute pointer-events-none bg-card rounded-xl shadow-lg border border-border p-4 max-w-xs z-10"
            style={{
              left: Math.min(mouseRef.current.x + 16, (containerRef.current?.clientWidth || 600) - 220),
              top: mouseRef.current.y + 16,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{hoveredNode.icon}</span>
              <span className="font-bold text-text">{hoveredNode.title}</span>
            </div>
            <p className="text-xs text-text-secondary">
              {getCategoryById(hoveredNode.category)?.name} · 点击查看详情
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 text-xs text-text-secondary border border-border">
          <p>🖱️ 拖拽节点 · 点击跳转详情</p>
        </div>
      </div>
    </div>
  );
}
