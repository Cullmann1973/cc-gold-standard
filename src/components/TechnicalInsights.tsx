"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lightbulb, Target, Wrench, TrendingUp, Users, Trophy } from "lucide-react";

interface TechnicalInsightsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TechnicalInsights({ isOpen, onClose }: TechnicalInsightsProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-background border border-border rounded-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-gold-light/20 to-transparent">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-gold-light" />
                <div>
                  <h2 className="text-xl font-bold text-foreground">Technical Insights</h2>
                  <p className="text-sm text-muted-foreground">How this AI assistant was conceived and built</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* The Origin Story */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-gold-light" />
                  <h3 className="font-semibold text-foreground">The Origin Story</h3>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    In manufacturing, everyone asks the same question: "Why isn't this line hitting its numbers?"
                    The usual answer involves comparing to budget, which is just a guess made months ago. I wanted
                    a better benchmark: what's actually achievable on this exact equipment, right now?
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    The insight came from watching a production line run three different SKUs. Same equipment,
                    same operators, wildly different OEE results. The best-performing SKU wasn't magic; it was
                    proof of what that line could do. If we could hit 0.82 OEE on SKU-A, why were we accepting
                    0.65 on SKU-B?
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    That's the Gold Standard method: find your best performer, understand why it's winning,
                    and use it as the benchmark for everything else. No more arbitrary targets. No more budget
                    comparisons. Real, demonstrated capability.
                  </p>
                </div>
              </section>

              {/* The Build Process */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-gold-light" />
                  <h3 className="font-semibold text-foreground">The Build Process</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-background flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                    <div>
                      <div className="font-medium text-foreground">Defined the Golden SKU Criteria</div>
                      <p className="text-sm text-muted-foreground">Created a 6-step methodology: filter for volume significance, rank by OEE, validate consistency, check for anomalies, confirm repeatability, document the "why." The Gold Standard isn't the highest single run; it's the highest sustainable performance.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-background flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                    <div>
                      <div className="font-medium text-foreground">Built the Gap Analysis</div>
                      <p className="text-sm text-muted-foreground">For every non-Gold SKU, the tool calculates the gap to Gold Standard and breaks it down: availability gap, performance gap, quality gap. Each gap gets a root cause hypothesis based on the data patterns.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-background flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                    <div>
                      <div className="font-medium text-foreground">Added Prioritization Logic</div>
                      <p className="text-sm text-muted-foreground">Not all gaps are equal. The tool ranks improvement opportunities by volume impact: closing a 5% gap on a high-runner beats closing a 20% gap on a low-volume SKU. Focus where it matters.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-background flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                    <div>
                      <div className="font-medium text-foreground">Created Actionable Recommendations</div>
                      <p className="text-sm text-muted-foreground">The AI doesn't just identify problems; it suggests investigations. "SKU-B has a 15% availability gap vs Gold Standard. Recommend investigating changeover time (18 min vs Gold's 12 min) and unplanned stops (3.2/shift vs Gold's 1.1)."</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Impact */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-gold-light" />
                  <h3 className="font-semibold text-foreground">The Impact</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-bold gold-gradient-text">77+</div>
                    <div className="text-xs text-muted-foreground">Active Chats</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-bold gold-gradient-text">6 Steps</div>
                    <div className="text-xs text-muted-foreground">Methodology</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-bold gold-gradient-text">Instant</div>
                    <div className="text-xs text-muted-foreground">Gap Analysis</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 border border-border text-center">
                    <div className="text-2xl font-bold gold-gradient-text">Ranked</div>
                    <div className="text-xs text-muted-foreground">Opportunities</div>
                  </div>
                </div>
              </section>

              {/* Who Uses It */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-gold-light" />
                  <h3 className="font-semibold text-foreground">Who Uses Gold Standard</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Production Managers",
                    "Continuous Improvement",
                    "Operations Directors",
                    "Line Supervisors",
                    "Process Engineers",
                    "Plant Leadership"
                  ].map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1.5 bg-muted/50 border border-border rounded-full text-sm text-foreground"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
