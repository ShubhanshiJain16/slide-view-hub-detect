
// This file contains mock data for demonstration
// In a real application, this would be loaded from output.json

export interface Detection {
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  confidence: number;
}

export interface DetectionResults {
  detections: Detection[];
  summary: {
    rbc: {
      "Angled Cells": { count: 222, percentage: 67 },
      "Borderline Ovalocytes": { count: 50, percentage: 20 },
      "Burr Cells": { count: 87, percentage: 34 },
      "Fragmented Cells": { count: 2, percentage: 0.12 },
      "Ovalocytes": { count: 0, percentage: 0 },
      "Rounded RBC": { count: 0, percentage: 0 },
      "Teardrops": { count: 0, percentage: 0 },
    },
    wbc: {
      "Basophil": { count: 222, percentage: 67 },
      "Eosinophil": { count: 50, percentage: 20 },
      "Lymphocyte": { count: 87, percentage: 34 },
      "Monocyte": { count: 2, percentage: 0.12 },
    },
    platelets: {
      "Count": 222,
      "Percentage": 222,
    },
    patient: {
      id: "P12345",
      type: "Blood"
    }
  }
}

// Generate mock detections
const generateMockDetections = (): Detection[] => {
  const detections: Detection[] = [];
  const cellTypes = [
    "Angled Cells", "Borderline Ovalocytes", "Burr Cells", 
    "Fragmented Cells", "Basophil", "Eosinophil", 
    "Lymphocyte", "Monocyte"
  ];
  
  // Generate around 300 random detections
  for (let i = 0; i < 300; i++) {
    detections.push({
      x: Math.random() * 800,
      y: Math.random() * 600,
      width: 20 + Math.random() * 10, // 20-30px width
      height: 20 + Math.random() * 10, // 20-30px height
      class: cellTypes[Math.floor(Math.random() * cellTypes.length)],
      confidence: 0.7 + Math.random() * 0.29 // 70-99% confidence
    });
  }
  
  return detections;
};

export const mockDetectionResults: DetectionResults = {
  detections: generateMockDetections(),
  summary: {
    rbc: {
      "Angled Cells": { count: 222, percentage: 67 },
      "Borderline Ovalocytes": { count: 50, percentage: 20 },
      "Burr Cells": { count: 87, percentage: 34 },
      "Fragmented Cells": { count: 2, percentage: 0.12 },
      "Ovalocytes": { count: 0, percentage: 0 },
      "Rounded RBC": { count: 0, percentage: 0 },
      "Teardrops": { count: 0, percentage: 0 },
    },
    wbc: {
      "Basophil": { count: 222, percentage: 67 },
      "Eosinophil": { count: 50, percentage: 20 },
      "Lymphocyte": { count: 87, percentage: 34 },
      "Monocyte": { count: 2, percentage: 0.12 },
    },
    platelets: {
      "Count": 222,
      "Percentage": 222,
    },
    patient: {
      id: "P12345",
      type: "Blood"
    }
  }
};
