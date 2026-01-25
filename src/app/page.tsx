"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Target,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Factory,
  DollarSign,
  Zap,
  Users,
  Package,
  BarChart3,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  productionLines,
  summaryStats,
  recommendedActions,
  calculateGap,
  type ProductionLine,
  type SKUData,
} from "@/lib/sample-data";

export default function GoldStandardPage() {
  const [selectedLine, setSelectedLine] = useState<ProductionLine>(productionLines[0]);
  const [selectedSKU, setSelectedSKU] = useState<SKUData | null>(null);

  const goldStandard = selectedLine.skus.find((sku) => sku.isGoldStandard);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center">
                <Trophy className="w-5 h-5 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-bold gold-gradient-text">CC Gold Standard</h1>
                <p className="text-xs text-muted-foreground">Chris Cosmetics Performance Benchmarking</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Demo Mode</span>
              <div className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                <span className="text-xs font-medium text-primary">Live Data Simulation</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Summary Cards */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Opportunity",
              value: `$${(summaryStats.totalPotentialSavings / 1000).toFixed(0)}K`,
              icon: DollarSign,
              color: "text-primary",
            },
            {
              label: "Avg OEE Gap",
              value: `${(summaryStats.goldStandardAvgOEE - summaryStats.avgOEE).toFixed(1)}%`,
              icon: Target,
              color: "text-warning",
            },
            {
              label: "Lines Analyzed",
              value: summaryStats.totalLines,
              icon: Factory,
              color: "text-gold",
            },
            {
              label: "SKUs Benchmarked",
              value: summaryStats.totalSKUs,
              icon: Package,
              color: "text-accent",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="metric-card rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <div className={`text-2xl font-bold gauge-number ${stat.color}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Line Selector */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Factory className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Production Lines</h2>
            </div>

            <div className="space-y-3">
              {productionLines.map((line) => {
                const lineGoldStandard = line.skus.find((s) => s.isGoldStandard);
                const lineAvgOEE =
                  line.skus.reduce((acc, s) => acc + s.metrics.oee, 0) / line.skus.length;

                return (
                  <motion.button
                    key={line.id}
                    onClick={() => {
                      setSelectedLine(line);
                      setSelectedSKU(null);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedLine.id === line.id
                        ? "border-primary bg-primary/10 glow-gold"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{line.name}</h3>
                        <p className="text-xs text-muted-foreground">{line.plant}</p>
                      </div>
                      {selectedLine.id === line.id && (
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="text-xs">
                        <span className="text-muted-foreground">Gold OEE: </span>
                        <span className="text-primary font-semibold">
                          {lineGoldStandard?.metrics.oee.toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Avg OEE: </span>
                        <span className="text-foreground font-semibold">{lineAvgOEE.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="performance-bar h-2">
                        <div
                          className="performance-fill h-full"
                          style={{ width: `${lineAvgOEE}%` }}
                        />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* SKU Comparison */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gold Standard Highlight */}
            {goldStandard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 via-card to-card glow-gold"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-background" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="gold-badge px-2 py-0.5 rounded text-xs">Gold Standard</span>
                      <span className="text-xs text-muted-foreground">{selectedLine.name}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{goldStandard.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      SKU {goldStandard.id} | {goldStandard.volume.toLocaleString()} units/month
                    </p>

                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: "OEE", value: `${goldStandard.metrics.oee}%`, icon: Gauge },
                        { label: "Scrap", value: `${goldStandard.metrics.scrapRate}%`, icon: Target },
                        { label: "Speed", value: `${goldStandard.metrics.lineSpeed} u/m`, icon: Zap },
                        { label: "Labor Eff.", value: `${goldStandard.metrics.laborEfficiency}`, icon: Users },
                      ].map((metric) => (
                        <div key={metric.label} className="text-center">
                          <metric.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
                          <div className="text-lg font-bold text-foreground gauge-number">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SKU Benchmark Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">SKU Performance vs Gold Standard</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {selectedLine.skus.length} SKUs on this line
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground">SKU</th>
                      <th className="text-center p-3 text-xs font-semibold text-muted-foreground">OEE</th>
                      <th className="text-center p-3 text-xs font-semibold text-muted-foreground">Gap</th>
                      <th className="text-center p-3 text-xs font-semibold text-muted-foreground">Scrap %</th>
                      <th className="text-center p-3 text-xs font-semibold text-muted-foreground">Speed</th>
                      <th className="text-right p-3 text-xs font-semibold text-muted-foreground">Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLine.skus.map((sku) => {
                      const gap = goldStandard ? calculateGap(sku, goldStandard) : null;

                      return (
                        <motion.tr
                          key={sku.id}
                          onClick={() => setSelectedSKU(sku)}
                          whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.05)" }}
                          className={`border-b border-border cursor-pointer transition-colors ${
                            selectedSKU?.id === sku.id ? "bg-primary/10" : ""
                          }`}
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {sku.isGoldStandard && (
                                <Trophy className="w-4 h-4 text-primary" />
                              )}
                              <div>
                                <div className="font-medium text-sm text-foreground">
                                  {sku.name}
                                </div>
                                <div className="text-xs text-muted-foreground">{sku.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`font-semibold gauge-number ${
                                sku.isGoldStandard
                                  ? "text-primary"
                                  : sku.metrics.oee >= 80
                                  ? "text-success"
                                  : sku.metrics.oee >= 70
                                  ? "text-warning"
                                  : "text-danger"
                              }`}
                            >
                              {sku.metrics.oee.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            {sku.isGoldStandard ? (
                              <span className="text-xs text-muted-foreground">Benchmark</span>
                            ) : (
                              <span className="flex items-center justify-center gap-1 text-danger text-sm">
                                <ArrowDown className="w-3 h-3" />
                                {gap?.oeeGap.toFixed(1)}%
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`font-medium gauge-number ${
                                sku.metrics.scrapRate <= 1
                                  ? "text-success"
                                  : sku.metrics.scrapRate <= 3
                                  ? "text-warning"
                                  : "text-danger"
                              }`}
                            >
                              {sku.metrics.scrapRate.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-sm gauge-number">{sku.metrics.lineSpeed}</span>
                              <span className="text-xs text-muted-foreground">
                                /{selectedLine.plateSpeed}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            {sku.potentialSavings ? (
                              <span className="text-primary font-semibold">
                                ${(sku.potentialSavings / 1000).toFixed(0)}K
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">Target</span>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected SKU Detail */}
            <AnimatePresence>
              {selectedSKU && !selectedSKU.isGoldStandard && goldStandard && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  <div className="p-4 border-b border-border bg-danger/10">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-danger" />
                      <h3 className="font-semibold">Gap Analysis: {selectedSKU.name}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Gap Metrics */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          Performance Gaps
                        </h4>
                        {(() => {
                          const gap = calculateGap(selectedSKU, goldStandard);
                          return (
                            <div className="space-y-3">
                              {[
                                { label: "OEE Gap", value: gap.oeeGap, unit: "%", benchmark: goldStandard.metrics.oee },
                                { label: "Excess Scrap", value: gap.scrapGap, unit: "%", benchmark: goldStandard.metrics.scrapRate },
                                { label: "Speed Gap", value: gap.speedGap, unit: " u/m", benchmark: goldStandard.metrics.lineSpeed },
                              ].map((item) => (
                                <div key={item.label} className="gap-indicator p-3 rounded-r-lg">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-foreground">{item.label}</span>
                                    <span className="text-danger font-semibold gauge-number">
                                      {item.value > 0 ? "+" : ""}{item.value.toFixed(1)}{item.unit}
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Gold Standard: {item.benchmark}{item.unit}
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                      {/* Potential Impact */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          Closing the Gap
                        </h4>
                        <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                          <div className="flex items-center gap-3 mb-3">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-foreground">
                              If this SKU matched Gold Standard:
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Annual Savings Potential</span>
                              <span className="text-primary font-bold text-lg">
                                ${((selectedSKU.potentialSavings || 0) / 1000).toFixed(0)}K
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Additional Units/Month</span>
                              <span className="text-foreground font-semibold">
                                +{Math.round(
                                  selectedSKU.volume *
                                    ((goldStandard.metrics.oee - selectedSKU.metrics.oee) / 100)
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Scrap Reduction</span>
                              <span className="text-success font-semibold">
                                -{(selectedSKU.metrics.scrapRate - goldStandard.metrics.scrapRate).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Items Section */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Recommended Actions</h2>
            <span className="text-xs text-muted-foreground ml-2">
              {recommendedActions.length} improvement initiatives
            </span>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left p-3 text-xs font-semibold text-muted-foreground">SKU</th>
                    <th className="text-left p-3 text-xs font-semibold text-muted-foreground">Action</th>
                    <th className="text-center p-3 text-xs font-semibold text-muted-foreground">Owner</th>
                    <th className="text-center p-3 text-xs font-semibold text-muted-foreground">Impact</th>
                    <th className="text-right p-3 text-xs font-semibold text-muted-foreground">Est. Savings</th>
                    <th className="text-center p-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendedActions.map((action) => (
                    <tr key={action.id} className="border-b border-border">
                      <td className="p-3 text-sm text-muted-foreground font-mono">{action.sku}</td>
                      <td className="p-3 text-sm text-foreground">{action.action}</td>
                      <td className="p-3 text-center text-sm text-muted-foreground">{action.owner}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            action.impact === "High"
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {action.impact}
                        </span>
                      </td>
                      <td className="p-3 text-right text-sm text-primary font-semibold">
                        ${(action.savings / 1000).toFixed(0)}K
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            action.status === "Completed"
                              ? "bg-success/20 text-success"
                              : action.status === "In Progress"
                              ? "bg-warning/20 text-warning"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {action.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center">
                <Trophy className="w-4 h-4 text-background" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">CC Gold Standard</p>
                <p className="text-xs text-muted-foreground">
                  Demo built by Chris Ullmann | Manufacturing Performance Benchmarking
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Sample data for demonstration purposes only
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
