// Sample data for Chris Cosmetics Gold Standard Demo
// Modeled after real Gold Nugget GPT methodology
// All data is fictional for demonstration purposes

export interface SKUData {
  id: string; // Material code (e.g., SX17010000)
  name: string; // Material description
  isGoldStandard: boolean;
  metrics: {
    oee: number; // Decimal format (0.456 = 45.6%)
    laborPer1000: number; // Labor hr/1000 units
    scrapCost: number; // Total scrap $ for period
    scrapEvents: number; // Number of scrap events
    cycleSpeed: number; // Achieved cycle speed
    setupHours: number; // Total setup hours
    runHours: number; // Total run hours
  };
  units: number; // Total units produced (period)
  potentialSavings?: number;
}

export interface ProductionLine {
  id: string;
  resourceCode: string; // e.g., M1007000
  name: string;
  plant: string;
  productCategory: string;
  plateSpeed: number; // Design/target speed
  standardCrew: number;
  skus: SKUData[];
}

// Root Cause Analysis data structure
export interface RCAEntry {
  skuId: string;
  rootCauses: {
    category: string;
    evidence: string;
    action: string;
    status: "Open" | "In Progress" | "Completed";
  }[];
  dataChecked: {
    source: string;
    result: string;
    hasIssues: boolean;
  }[];
}

// The 6-Step Gold Standard Methodology
export const goldStandardMethodology = [
  {
    step: 1,
    title: "Confirm Resource Code",
    description: "Identify the line's resource code (e.g., M1007000 for Line 7)",
    action: "Pull from Resource Cross Reference file",
  },
  {
    step: 2,
    title: "Extract All SKUs",
    description: "Pull all SKUs run on this line from OEE data",
    action: "Filter: OEE >= 5%, Run h > 0, not blocked",
  },
  {
    step: 3,
    title: "Apply Filters for Major Codes",
    description: "Rank by highest volume and run hours",
    action: "Keep top 5-10 SKUs by volume/time",
  },
  {
    step: 4,
    title: "Pull Key Metrics",
    description: "For each SKU: OEE, Run h, Setup h, Units, Labor, Scrap, Speed",
    action: "Cross-reference multiple data sources",
  },
  {
    step: 5,
    title: "Benchmark Against Golden Criteria",
    description: "Highest OEE, Lowest Scrap/Unit, Lowest Labor, Achieves plate speed",
    action: "Pick best compromise if no SKU is perfect",
  },
  {
    step: 6,
    title: "Output Table & Call Golden Standard",
    description: "Show ranked table, highlight Golden Standard SKU",
    action: "Document reasoning for selection",
  },
];

// Chris Cosmetics Production Lines (matching real GPT format)
export const productionLines: ProductionLine[] = [
  {
    id: "line-7",
    resourceCode: "M1007000",
    name: "Line 7",
    plant: "Chris Cosmetics - Melville",
    productCategory: "Skincare Filling",
    plateSpeed: 120,
    standardCrew: 3,
    skus: [
      {
        id: "RC50010000",
        name: "RADIANCE DAY CRM 50ML/1.7FLOZ",
        isGoldStandard: true,
        metrics: {
          oee: 0.456, // 45.6%
          laborPer1000: 6.50,
          scrapCost: 4250,
          scrapEvents: 3,
          cycleSpeed: 115,
          setupHours: 12.5,
          runHours: 285.2,
        },
        units: 425000,
      },
      {
        id: "HB30010000",
        name: "HYDRA BOOST SRM 30ML/1FLOZ",
        isGoldStandard: false,
        metrics: {
          oee: 0.382,
          laborPer1000: 7.85,
          scrapCost: 12450,
          scrapEvents: 14,
          cycleSpeed: 92,
          setupHours: 28.3,
          runHours: 198.5,
        },
        units: 312000,
        potentialSavings: 185000,
      },
      {
        id: "NR50010000",
        name: "NIGHT REPAIR CRM 50ML/1.7FLOZ",
        isGoldStandard: false,
        metrics: {
          oee: 0.345,
          laborPer1000: 8.42,
          scrapCost: 18920,
          scrapEvents: 22,
          cycleSpeed: 85,
          setupHours: 35.8,
          runHours: 165.2,
        },
        units: 245000,
        potentialSavings: 245000,
      },
      {
        id: "EC15010000",
        name: "EYE CONTOUR GEL 15ML/.5FLOZ",
        isGoldStandard: false,
        metrics: {
          oee: 0.298,
          laborPer1000: 9.85,
          scrapCost: 27684,
          scrapEvents: 31,
          cycleSpeed: 68,
          setupHours: 48.2,
          runHours: 122.8,
        },
        units: 142000,
        potentialSavings: 128000,
      },
    ],
  },
  {
    id: "line-12",
    resourceCode: "M1012000",
    name: "Line 12",
    plant: "Chris Cosmetics - Melville",
    productCategory: "Lip Products",
    plateSpeed: 200,
    standardCrew: 4,
    skus: [
      {
        id: "VM20010000",
        name: "VELVET MATTE LPSTK 3.5G/.12OZ",
        isGoldStandard: true,
        metrics: {
          oee: 0.512,
          laborPer1000: 5.20,
          scrapCost: 2850,
          scrapEvents: 2,
          cycleSpeed: 195,
          setupHours: 8.5,
          runHours: 412.5,
        },
        units: 716593,
      },
      {
        id: "GS10010000",
        name: "GLOSSY SHINE LIP OIL 10ML/.34FLOZ",
        isGoldStandard: false,
        metrics: {
          oee: 0.425,
          laborPer1000: 6.84,
          scrapCost: 9820,
          scrapEvents: 11,
          cycleSpeed: 168,
          setupHours: 22.5,
          runHours: 285.2,
        },
        units: 485000,
        potentialSavings: 215000,
      },
      {
        id: "LW05010000",
        name: "LONG-WEAR LIP LINER 1.2G/.04OZ",
        isGoldStandard: false,
        metrics: {
          oee: 0.338,
          laborPer1000: 8.15,
          scrapCost: 15420,
          scrapEvents: 18,
          cycleSpeed: 142,
          setupHours: 38.2,
          runHours: 195.8,
        },
        units: 295000,
        potentialSavings: 178000,
      },
    ],
  },
  {
    id: "line-18",
    resourceCode: "M1018000",
    name: "Line 18",
    plant: "Chris Cosmetics - Melville",
    productCategory: "Foundation",
    plateSpeed: 150,
    standardCrew: 4,
    skus: [
      {
        id: "FF30010000",
        name: "FLAWLESS FNSH FND 30ML/1FLOZ",
        isGoldStandard: true,
        metrics: {
          oee: 0.442,
          laborPer1000: 6.12,
          scrapCost: 5280,
          scrapEvents: 5,
          cycleSpeed: 142,
          setupHours: 15.2,
          runHours: 325.8,
        },
        units: 528000,
      },
      {
        id: "LT30010000",
        name: "LUMINOUS TNTD MOIST 30ML/1FLOZ",
        isGoldStandard: false,
        metrics: {
          oee: 0.365,
          laborPer1000: 7.45,
          scrapCost: 11250,
          scrapEvents: 12,
          cycleSpeed: 118,
          setupHours: 28.5,
          runHours: 245.2,
        },
        units: 385000,
        potentialSavings: 198000,
      },
      {
        id: "FC08010000",
        name: "FULL COVERAGE CNCLR 8ML/.27FLOZ",
        isGoldStandard: false,
        metrics: {
          oee: 0.285,
          laborPer1000: 9.52,
          scrapCost: 24850,
          scrapEvents: 28,
          cycleSpeed: 92,
          setupHours: 52.8,
          runHours: 142.5,
        },
        units: 198000,
        potentialSavings: 285000,
      },
    ],
  },
];

// Calculate gaps vs Gold Standard
export function calculateGap(sku: SKUData, goldStandard: SKUData) {
  return {
    oeeGap: goldStandard.metrics.oee - sku.metrics.oee,
    laborGap: sku.metrics.laborPer1000 - goldStandard.metrics.laborPer1000,
    scrapGap: sku.metrics.scrapCost - goldStandard.metrics.scrapCost,
    speedGap: goldStandard.metrics.cycleSpeed - sku.metrics.cycleSpeed,
    setupRatio: sku.metrics.setupHours / (sku.metrics.setupHours + sku.metrics.runHours),
    goldSetupRatio: goldStandard.metrics.setupHours / (goldStandard.metrics.setupHours + goldStandard.metrics.runHours),
  };
}

// Why this SKU is Golden Standard (reasoning)
export function getGoldStandardReasoning(sku: SKUData, allSkus: SKUData[]): string[] {
  const reasons: string[] = [];

  // Check if highest OEE
  const maxOEE = Math.max(...allSkus.map(s => s.metrics.oee));
  if (sku.metrics.oee === maxOEE) {
    reasons.push(`Highest OEE at ${(sku.metrics.oee * 100).toFixed(1)}%`);
  }

  // Check if lowest labor
  const minLabor = Math.min(...allSkus.map(s => s.metrics.laborPer1000));
  if (sku.metrics.laborPer1000 === minLabor) {
    reasons.push(`Lowest labor at ${sku.metrics.laborPer1000.toFixed(2)} hr/1000 units`);
  }

  // Check if highest volume
  const maxVolume = Math.max(...allSkus.map(s => s.units));
  if (sku.units === maxVolume) {
    reasons.push(`Highest volume at ${sku.units.toLocaleString()} units`);
  }

  // Check if lowest scrap
  const minScrap = Math.min(...allSkus.map(s => s.metrics.scrapCost));
  if (sku.metrics.scrapCost === minScrap) {
    reasons.push(`Lowest scrap cost at $${sku.metrics.scrapCost.toLocaleString()}`);
  }

  return reasons;
}

// RCA data for underperforming SKUs
export const rcaData: RCAEntry[] = [
  {
    skuId: "EC15010000",
    rootCauses: [
      {
        category: "Complex packaging",
        evidence: "Glass dropper + small format = more handling, more risk",
        action: "Evaluate packaging simplification",
        status: "Open",
      },
      {
        category: "High manual labor",
        evidence: "Labor hr/1000 = 9.85 (vs Golden 6.50)",
        action: "SMED workshop, Kaizen event",
        status: "In Progress",
      },
      {
        category: "Unaddressed scrap",
        evidence: "31 events, $27,684 total, many 'No QN' codes",
        action: "Require real RCA for all scrap events",
        status: "Open",
      },
      {
        category: "Setup/Changeover",
        evidence: "Setup h = 48.2 (28% of total time)",
        action: "Changeover reduction project",
        status: "In Progress",
      },
    ],
    dataChecked: [
      { source: "Downtime Details", result: "No formal downtime events logged", hasIssues: false },
      { source: "Quality Issues", result: "No consumer complaints tied to SKU", hasIssues: false },
      { source: "QC Lab Failures", result: "2 viscosity out-of-spec events", hasIssues: true },
      { source: "Scrap Details", result: "31 events, all coded 'No QN'", hasIssues: true },
    ],
  },
  {
    skuId: "NR50010000",
    rootCauses: [
      {
        category: "High setup hours",
        evidence: "Setup h = 35.8 (18% of total time vs Golden 4%)",
        action: "Standardize changeover procedure",
        status: "In Progress",
      },
      {
        category: "Scrap drivers",
        evidence: "22 events totaling $18,920",
        action: "Root cause coding enforcement",
        status: "Open",
      },
      {
        category: "Speed loss",
        evidence: "Running at 85 vs plate 120 (71%)",
        action: "Line speed optimization study",
        status: "Open",
      },
    ],
    dataChecked: [
      { source: "Downtime Details", result: "Frequent minor stoppages (label jams)", hasIssues: true },
      { source: "Quality Issues", result: "No complaints logged", hasIssues: false },
      { source: "QC Lab Failures", result: "No failures", hasIssues: false },
      { source: "Scrap Details", result: "22 events, mixed causes", hasIssues: true },
    ],
  },
  {
    skuId: "FC08010000",
    rootCauses: [
      {
        category: "Complex packaging",
        evidence: "Small format applicator requires manual assembly",
        action: "Automate applicator insertion",
        status: "Open",
      },
      {
        category: "High labor consumption",
        evidence: "Labor hr/1000 = 9.52 (56% above Golden)",
        action: "Line balancing study",
        status: "Open",
      },
      {
        category: "Excessive setup",
        evidence: "Setup h = 52.8 (27% of total time)",
        action: "SMED analysis",
        status: "In Progress",
      },
      {
        category: "Quality sensitivity",
        evidence: "Applicator defects driving rework",
        action: "Supplier quality review",
        status: "In Progress",
      },
    ],
    dataChecked: [
      { source: "Downtime Details", result: "Multiple applicator feed jams", hasIssues: true },
      { source: "Quality Issues", result: "Consumer complaints about applicator", hasIssues: true },
      { source: "QC Lab Failures", result: "No failures", hasIssues: false },
      { source: "Scrap Details", result: "28 events, $24,850 total", hasIssues: true },
    ],
  },
];

// Summary statistics
export const summaryStats = {
  totalLines: productionLines.length,
  totalSKUs: productionLines.reduce((acc, line) => acc + line.skus.length, 0),
  avgOEE: 0.372, // 37.2%
  goldStandardAvgOEE: 0.470, // 47.0%
  totalPotentialSavings: 1434000,
  totalScrapCost: productionLines.reduce(
    (acc, line) => acc + line.skus.reduce((a, sku) => a + sku.metrics.scrapCost, 0),
    0
  ),
};

// RCA Summary Table format (matching real GPT output)
export interface RCASummaryRow {
  category: string;
  evidence: string;
  action: string;
}

export function getRCASummaryTable(skuId: string): RCASummaryRow[] {
  const rca = rcaData.find(r => r.skuId === skuId);
  if (!rca) return [];

  return rca.rootCauses.map(rc => ({
    category: rc.category,
    evidence: rc.evidence,
    action: rc.action,
  }));
}
