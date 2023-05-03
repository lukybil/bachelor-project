export interface Measurement {
  isWasm: boolean;
  feature: string;
  timestamp: Date;
  time: number;
}

export interface MazeGenerationMeasurement extends Measurement {
  width: number;
  height: number;
}

export interface ImageResizeMeasurement extends Measurement {
  size: number;
}

export interface ModuleInitMeasurement {
  feature: string;
  time: number;
  timestamp: Date;
}
