import { API_URL } from '../constants';
import {
  ImageResizeMeasurement,
  MazeGenerationMeasurement,
  Measurement,
  ModuleInitMeasurement,
} from '../types/Measurement';

export const postMeasurement = async (
  measurement: Measurement | MazeGenerationMeasurement | ImageResizeMeasurement | ModuleInitMeasurement
) => {
  console.log('posting', measurement);
  try {
    await fetch(API_URL + '/measurement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(measurement),
    });
  } catch (e: any) {
    console.error(e.message);
  }
};
