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
  ChevronDown,
  Sparkles,
  Factory,
  DollarSign,
  Zap,
  Users,
  Package,
  BarChart3,
  ArrowDown,
  Clock,
  FileSearch,
  Clipboard,
  Settings,
  Database,
  Award,
  Info,
  ArrowLeft,
} from "lucide-react";
import {
  productionLines,
  summaryStats,
  goldStandardMethodology,
  calculateGap,
  getGoldStandardReasoning,
  rcaData,
  getRCASummaryTable,
  type ProductionLine,
  type SKUData,
} from "@/lib/sample-data";
import TechnicalInsights from "@/components/TechnicalInsights";

export default function GoldStandardPage() {
  const [selectedLine, setSelectedLine] = useState<ProductionLine>(productionLines[0]);
  const [selectedSKU, setSelectedSKU] = useState<SKUData | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const goldStandard = selectedLine.skus.find((sku) => sku.isGoldStandard);
  const goldReasons = goldStandard ? getGoldStandardReasoning(goldStandard, selectedLine.skus) : [];

  // Format OEE as percentage from decimal
  const formatOEE = (oee: number) => `${(oee * 100).toFixed(1)}%`;
  const formatOEEDecimal = (oee: number) => `${oee.toFixed(3)} (${(oee * 100).toFixed(1)}%)`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          {/* Back Button - closes tab to return to portfolio */}
          <button
            onClick={() => window.close()}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-border rounded-lg transition-all group text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Portfolio</span>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center">
                <Trophy className="w-5 h-5 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-bold gold-gradient-text">CC Gold Standard</h1>
                <p className="text-xs text-muted-foreground">Chris Cosmetics Performance Benchmarking Engine</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowInsights(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted border border-border rounded-lg transition-colors text-sm"
              >
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">Technical Insights</span>
              </button>
              <div className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30">
                <span className="text-xs font-medium text-primary">Sample Data</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Methodology Section (Collapsible) */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="w-full flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Clipboard className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <h2 className="font-semibold text-foreground">Gold Standard Methodology</h2>
              <p className="text-xs text-muted-foreground">The 6-step process for identifying Golden SKUs</p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-primary transition-transform ${showMethodology ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {showMethodology && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {goldStandardMethodology.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl border border-border bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-primary">{step.step}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{step.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                        <p className="text-xs text-primary/80 mt-2 font-mono">{step.action}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Summary Cards */}
      <section className="max-w-7xl mx-auto px-6 py-6">
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
              value: `${((summaryStats.goldStandardAvgOEE - summaryStats.avgOEE) * 100).toFixed(1)}%`,
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
                        <p className="text-xs text-muted-foreground font-mono">{line.resourceCode}</p>
                      </div>
                      {selectedLine.id === line.id && (
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{line.productCategory}</p>

                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="text-xs">
                        <span className="text-muted-foreground">Gold OEE: </span>
                        <span className="text-primary font-semibold font-mono">
                          {lineGoldStandard ? formatOEE(lineGoldStandard.metrics.oee) : "N/A"}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">Avg OEE: </span>
                        <span className="text-foreground font-semibold font-mono">{formatOEE(lineAvgOEE)}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="performance-bar h-2">
                        <div
                          className="performance-fill h-full"
                          style={{ width: `${lineAvgOEE * 100}%` }}
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
                      <span className="gold-badge px-2 py-0.5 rounded text-xs">Golden Standard</span>
                      <span className="text-xs text-muted-foreground">{selectedLine.name} ({selectedLine.resourceCode})</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{goldStandard.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono mb-3">
                      Material: {goldStandard.id} | {goldStandard.units.toLocaleString()} units
                    </p>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-background/50 rounded-lg p-3 text-center">
                        <Gauge className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <div className="text-lg font-bold text-foreground gauge-number">
                          {formatOEE(goldStandard.metrics.oee)}
                        </div>
                        <div className="text-xs text-muted-foreground">OEE</div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3 text-center">
                        <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <div className="text-lg font-bold text-foreground gauge-number">
                          {goldStandard.metrics.laborPer1000.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">Labor hr/1000</div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3 text-center">
                        <DollarSign className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <div className="text-lg font-bold text-foreground gauge-number">
                          ${goldStandard.metrics.scrapCost.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Scrap Cost</div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3 text-center">
                        <Zap className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <div className="text-lg font-bold text-foreground gauge-number">
                          {goldStandard.metrics.cycleSpeed}/{selectedLine.plateSpeed}
                        </div>
                        <div className="text-xs text-muted-foreground">Speed/Plate</div>
                      </div>
                    </div>

                    {/* Why This Is Golden Standard */}
                    {goldReasons.length > 0 && (
                      <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-primary" />
                          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            Why This Is Golden Standard
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {goldReasons.map((reason, i) => (
                            <li key={i} className="text-xs text-foreground flex items-center gap-2">
                              <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SKU Benchmark Table (Matching GPT Output Format) */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">SKU Performance Ranking</h3>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {selectedLine.skus.length} SKUs | Resource: {selectedLine.resourceCode}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground">Material</th>
                      <th className="text-left p-3 text-xs font-semibold text-muted-foreground">Description</th>
                      <th className="text-right p-3 text-xs font-semibold text-muted-foreground">Units</th>
                      <th className="text-right p-3 text-xs font-semibold text-muted-foreground">OEE</th>
                      <th className="text-right p-3 text-xs font-semibold text-muted-foreground">Labor hr/1000</th>
                      <th className="text-right p-3 text-xs font-semibold text-muted-foreground">Scrap $</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLine.skus
                      .sort((a, b) => b.units - a.units) // Sort by volume
                      .map((sku) => {
                        const gap = goldStandard ? calculateGap(sku, goldStandard) : null;

                        return (
                          <motion.tr
                            key={sku.id}
                            onClick={() => setSelectedSKU(sku)}
                            whileHover={{ backgroundColor: "rgba(212, 175, 55, 0.05)" }}
                            className={`border-b border-border cursor-pointer transition-colors ${
                              selectedSKU?.id === sku.id ? "bg-primary/10" : ""
                            } ${sku.isGoldStandard ? "bg-primary/5" : ""}`}
                          >
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                {sku.isGoldStandard && (
                                  <Trophy className="w-4 h-4 text-primary" />
                                )}
                                <span className="font-mono text-sm text-foreground">{sku.id}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-foreground">{sku.name}</span>
                            </td>
                            <td className="p-3 text-right">
                              <span className="font-mono text-sm">{sku.units.toLocaleString()}</span>
                            </td>
                            <td className="p-3 text-right">
                              <span
                                className={`font-mono text-sm font-semibold ${
                                  sku.isGoldStandard
                                    ? "text-primary"
                                    : sku.metrics.oee >= 0.4
                                    ? "text-success"
                                    : sku.metrics.oee >= 0.3
                                    ? "text-warning"
                                    : "text-danger"
                                }`}
                              >
                                {sku.metrics.oee.toFixed(3)}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <span
                                className={`font-mono text-sm ${
                                  sku.isGoldStandard
                                    ? "text-primary font-semibold"
                                    : gap && gap.laborGap > 2
                                    ? "text-danger"
                                    : gap && gap.laborGap > 1
                                    ? "text-warning"
                                    : "text-foreground"
                                }`}
                              >
                                {sku.metrics.laborPer1000.toFixed(2)}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <span
                                className={`font-mono text-sm ${
                                  sku.isGoldStandard
                                    ? "text-primary font-semibold"
                                    : sku.metrics.scrapCost > 15000
                                    ? "text-danger"
                                    : sku.metrics.scrapCost > 8000
                                    ? "text-warning"
                                    : "text-foreground"
                                }`}
                              >
                                ${sku.metrics.scrapCost.toLocaleString()}
                              </span>
                            </td>
                          </motion.tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-muted/20 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <Info className="w-3 h-3 inline mr-1" />
                  OEE shown as decimal (0.456 = 45.6%). Click any row for gap analysis.
                </p>
              </div>
            </div>

            {/* Selected SKU Detail / RCA */}
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
                      <h3 className="font-semibold">Gap Analysis: {selectedSKU.id}</h3>
                      <span className="text-xs text-muted-foreground ml-2">{selectedSKU.name}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Gap Metrics */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Performance Gaps vs Golden Standard
                        </h4>
                        {(() => {
                          const gap = calculateGap(selectedSKU, goldStandard);
                          return (
                            <div className="space-y-3">
                              <div className="gap-indicator p-3 rounded-lg bg-muted/30 border-l-4 border-danger">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-foreground">OEE Gap</span>
                                  <span className="text-danger font-semibold font-mono">
                                    -{(gap.oeeGap * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Golden: {formatOEE(goldStandard.metrics.oee)} | This: {formatOEE(selectedSKU.metrics.oee)}
                                </div>
                              </div>
                              <div className="gap-indicator p-3 rounded-lg bg-muted/30 border-l-4 border-warning">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-foreground">Excess Labor</span>
                                  <span className="text-warning font-semibold font-mono">
                                    +{gap.laborGap.toFixed(2)} hr/1000
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Golden: {goldStandard.metrics.laborPer1000.toFixed(2)} | This: {selectedSKU.metrics.laborPer1000.toFixed(2)}
                                </div>
                              </div>
                              <div className="gap-indicator p-3 rounded-lg bg-muted/30 border-l-4 border-danger">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-foreground">Excess Scrap Cost</span>
                                  <span className="text-danger font-semibold font-mono">
                                    +${gap.scrapGap.toLocaleString()}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Golden: ${goldStandard.metrics.scrapCost.toLocaleString()} | This: ${selectedSKU.metrics.scrapCost.toLocaleString()}
                                </div>
                              </div>
                              <div className="gap-indicator p-3 rounded-lg bg-muted/30 border-l-4 border-warning">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-foreground">Setup Time Ratio</span>
                                  <span className="text-warning font-semibold font-mono">
                                    {(gap.setupRatio * 100).toFixed(0)}% vs {(gap.goldSetupRatio * 100).toFixed(0)}%
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Setup h: {selectedSKU.metrics.setupHours.toFixed(1)} | Run h: {selectedSKU.metrics.runHours.toFixed(1)}
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* RCA Summary Table */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                          <FileSearch className="w-4 h-4" />
                          RCA Summary Table
                        </h4>
                        {(() => {
                          const rcaSummary = getRCASummaryTable(selectedSKU.id);
                          if (rcaSummary.length === 0) {
                            return (
                              <div className="p-4 rounded-lg bg-muted/30 text-center">
                                <p className="text-sm text-muted-foreground">No RCA data available for this SKU</p>
                              </div>
                            );
                          }
                          return (
                            <div className="rounded-lg border border-border overflow-hidden">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-muted/50">
                                    <th className="text-left p-2 text-xs font-semibold text-muted-foreground">Root Cause</th>
                                    <th className="text-left p-2 text-xs font-semibold text-muted-foreground">Evidence</th>
                                    <th className="text-left p-2 text-xs font-semibold text-muted-foreground">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {rcaSummary.map((row, i) => (
                                    <tr key={i} className="border-t border-border">
                                      <td className="p-2 font-medium text-foreground">{row.category}</td>
                                      <td className="p-2 text-muted-foreground text-xs">{row.evidence}</td>
                                      <td className="p-2 text-primary text-xs">{row.action}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        })()}

                        {/* Potential Impact */}
                        {selectedSKU.potentialSavings && (
                          <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                            <div className="flex items-center gap-3 mb-2">
                              <Sparkles className="w-5 h-5 text-primary" />
                              <span className="font-semibold text-foreground text-sm">
                                If matched to Golden Standard:
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              ${(selectedSKU.potentialSavings / 1000).toFixed(0)}K
                              <span className="text-sm font-normal text-muted-foreground ml-2">annual savings potential</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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

      {/* Technical Insights Modal */}
      <TechnicalInsights isOpen={showInsights} onClose={() => setShowInsights(false)} />
    </div>
  );
}
