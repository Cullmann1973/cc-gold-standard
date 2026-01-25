// Sample data for Chris Cosmetics Gold Standard Demo
// All data is fictional for demonstration purposes

export interface SKUData {
  id: string;
  name: string;
  productFamily: string;
  isGoldStandard: boolean;
  metrics: {
    oee: number;
    scrapRate: number;
    lineSpeed: number; // units per minute
    laborEfficiency: number; // units per labor hour
    availability: number;
    performance: number;
    quality: number;
  };
  volume: number; // units per month
  potentialSavings?: number;
}

export interface ProductionLine {
  id: string;
  name: string;
  plant: string;
  productFamily: string;
  plateSpeed: number; // design speed in units/min
  standardCrew: number;
  skus: SKUData[];
}

// Chris Cosmetics Production Lines
export const productionLines: ProductionLine[] = [
  {
    id: "line-7",
    name: "Line 7 - Skincare Filling",
    plant: "Melville, NY",
    productFamily: "Skincare",
    plateSpeed: 120,
    standardCrew: 3,
    skus: [
      {
        id: "CC-SKN-001",
        name: "Radiance Day Cream 50ml",
        productFamily: "Skincare",
        isGoldStandard: true,
        metrics: {
          oee: 87.5,
          scrapRate: 0.8,
          lineSpeed: 118,
          laborEfficiency: 2400,
          availability: 94.2,
          performance: 98.3,
          quality: 94.5,
        },
        volume: 125000,
      },
      {
        id: "CC-SKN-002",
        name: "Hydra Boost Serum 30ml",
        productFamily: "Skincare",
        isGoldStandard: false,
        metrics: {
          oee: 72.3,
          scrapRate: 3.2,
          lineSpeed: 95,
          laborEfficiency: 1850,
          availability: 88.5,
          performance: 85.2,
          quality: 95.8,
        },
        volume: 98000,
        potentialSavings: 185000,
      },
      {
        id: "CC-SKN-003",
        name: "Night Repair Cream 50ml",
        productFamily: "Skincare",
        isGoldStandard: false,
        metrics: {
          oee: 68.5,
          scrapRate: 4.1,
          lineSpeed: 88,
          laborEfficiency: 1720,
          availability: 85.2,
          performance: 82.8,
          quality: 97.1,
        },
        volume: 82000,
        potentialSavings: 245000,
      },
      {
        id: "CC-SKN-004",
        name: "Eye Contour Gel 15ml",
        productFamily: "Skincare",
        isGoldStandard: false,
        metrics: {
          oee: 61.2,
          scrapRate: 5.5,
          lineSpeed: 72,
          laborEfficiency: 1480,
          availability: 78.5,
          performance: 80.5,
          quality: 96.8,
        },
        volume: 45000,
        potentialSavings: 128000,
      },
    ],
  },
  {
    id: "line-12",
    name: "Line 12 - Lip Products",
    plant: "Melville, NY",
    productFamily: "Makeup",
    plateSpeed: 200,
    standardCrew: 4,
    skus: [
      {
        id: "CC-LIP-001",
        name: "Velvet Matte Lipstick",
        productFamily: "Makeup",
        isGoldStandard: true,
        metrics: {
          oee: 91.2,
          scrapRate: 0.5,
          lineSpeed: 195,
          laborEfficiency: 3200,
          availability: 96.5,
          performance: 97.5,
          quality: 96.8,
        },
        volume: 280000,
      },
      {
        id: "CC-LIP-002",
        name: "Glossy Shine Lip Oil",
        productFamily: "Makeup",
        isGoldStandard: false,
        metrics: {
          oee: 78.5,
          scrapRate: 2.8,
          lineSpeed: 165,
          laborEfficiency: 2650,
          availability: 92.3,
          performance: 88.5,
          quality: 96.2,
        },
        volume: 165000,
        potentialSavings: 215000,
      },
      {
        id: "CC-LIP-003",
        name: "Long-Wear Lip Liner",
        productFamily: "Makeup",
        isGoldStandard: false,
        metrics: {
          oee: 65.8,
          scrapRate: 4.2,
          lineSpeed: 142,
          laborEfficiency: 2100,
          availability: 85.2,
          performance: 82.5,
          quality: 93.5,
        },
        volume: 95000,
        potentialSavings: 178000,
      },
    ],
  },
  {
    id: "line-18",
    name: "Line 18 - Foundation",
    plant: "Melville, NY",
    productFamily: "Makeup",
    plateSpeed: 150,
    standardCrew: 4,
    skus: [
      {
        id: "CC-FND-001",
        name: "Flawless Finish Foundation 30ml",
        productFamily: "Makeup",
        isGoldStandard: true,
        metrics: {
          oee: 84.2,
          scrapRate: 1.2,
          lineSpeed: 145,
          laborEfficiency: 2800,
          availability: 92.8,
          performance: 96.7,
          quality: 93.8,
        },
        volume: 195000,
      },
      {
        id: "CC-FND-002",
        name: "Luminous Tinted Moisturizer",
        productFamily: "Makeup",
        isGoldStandard: false,
        metrics: {
          oee: 71.5,
          scrapRate: 3.5,
          lineSpeed: 125,
          laborEfficiency: 2350,
          availability: 88.2,
          performance: 86.2,
          quality: 94.1,
        },
        volume: 145000,
        potentialSavings: 198000,
      },
      {
        id: "CC-FND-003",
        name: "Full Coverage Concealer 8ml",
        productFamily: "Makeup",
        isGoldStandard: false,
        metrics: {
          oee: 58.9,
          scrapRate: 6.2,
          lineSpeed: 98,
          laborEfficiency: 1850,
          availability: 78.5,
          performance: 78.2,
          quality: 96.0,
        },
        volume: 78000,
        potentialSavings: 285000,
      },
    ],
  },
];

// Calculate gaps and opportunities
export function calculateGap(sku: SKUData, goldStandard: SKUData) {
  return {
    oeeGap: goldStandard.metrics.oee - sku.metrics.oee,
    scrapGap: sku.metrics.scrapRate - goldStandard.metrics.scrapRate,
    speedGap: goldStandard.metrics.lineSpeed - sku.metrics.lineSpeed,
    laborGap: goldStandard.metrics.laborEfficiency - sku.metrics.laborEfficiency,
  };
}

// Summary statistics
export const summaryStats = {
  totalLines: productionLines.length,
  totalSKUs: productionLines.reduce((acc, line) => acc + line.skus.length, 0),
  avgOEE: 74.2,
  goldStandardAvgOEE: 87.6,
  totalPotentialSavings: 1434000,
  scrapOpportunity: 425000,
  laborSavingsOpportunity: 380000,
};

// Root cause categories for the analysis
export const rootCauseCategories = [
  {
    category: "Machine/Process",
    causes: [
      "Equipment calibration drift",
      "Worn sealing components",
      "Suboptimal machine settings",
      "Frequent minor stoppages",
    ],
  },
  {
    category: "Packaging Design",
    causes: [
      "Non-standard cap orientation",
      "Label adhesion issues",
      "Complex component assembly",
      "Material feed inconsistency",
    ],
  },
  {
    category: "Labor/Procedures",
    causes: [
      "Extended changeover time",
      "Manual intervention required",
      "Training gaps",
      "Non-standard operating procedures",
    ],
  },
  {
    category: "Quality Factors",
    causes: [
      "Stricter inspection requirements",
      "Fill weight variability",
      "Cosmetic defect sensitivity",
      "Rework frequency",
    ],
  },
];

// Recommended actions
export const recommendedActions = [
  {
    id: 1,
    sku: "CC-SKN-002",
    action: "Install automated orientation system for serum bottles",
    owner: "Engineering",
    impact: "High",
    savings: 85000,
    status: "In Progress",
  },
  {
    id: 2,
    sku: "CC-SKN-003",
    action: "Optimize filling algorithm to reduce overfill waste",
    owner: "Process Engineering",
    impact: "High",
    savings: 120000,
    status: "Planned",
  },
  {
    id: 3,
    sku: "CC-SKN-004",
    action: "Cross-train operators on gold standard procedures",
    owner: "Operations",
    impact: "Medium",
    savings: 45000,
    status: "Completed",
  },
  {
    id: 4,
    sku: "CC-LIP-002",
    action: "Replace worn filler nozzles to improve precision",
    owner: "Maintenance",
    impact: "Medium",
    savings: 62000,
    status: "In Progress",
  },
  {
    id: 5,
    sku: "CC-FND-003",
    action: "Redesign concealer applicator for automated handling",
    owner: "Packaging Engineering",
    impact: "High",
    savings: 175000,
    status: "Planned",
  },
];
