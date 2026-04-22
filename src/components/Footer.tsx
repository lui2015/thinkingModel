import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧠</span>
              <span className="text-lg font-bold text-primary">思维模型库</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              整合人类优秀的思维模型与认知框架，<br />
              帮助你提升决策质量和认知水平。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text mb-3">快速导航</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/models" className="text-text-secondary hover:text-primary transition-colors">
                  模型库
                </Link>
              </li>
              <li>
                <Link href="/graph" className="text-text-secondary hover:text-primary transition-colors">
                  模型图谱
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-text mb-3">推荐阅读</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-text-secondary">《穷查理宝典》查理·芒格</li>
              <li className="text-text-secondary">《超级思维》加布里埃尔·温伯格</li>
              <li className="text-text-secondary">《思考，快与慢》丹尼尔·卡尼曼</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-text-light">
          <p>Mental Models Hub &copy; {new Date().getFullYear()} &mdash; 让思维更有力量</p>
        </div>
      </div>
    </footer>
  );
}
