import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fs from 'fs/promises';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const MEASUREMENTS_DIR = './measurement_data';

export enum WasmModule {
  mazeGeneration = 'mazeGeneration',
  imageResize = 'imageResize',
  jsonToCsv = 'jsonToCsv',
}

interface Measurement {
  isWasm: boolean;
  feature: string;
  timestamp: Date;
  time: number;
}

interface MazeGenerationMeasurement extends Measurement {
  width: number;
  height: number;
}

interface ImageResizeMeasurement extends Measurement {
  size: number;
}

interface ModuleInitMeasurement {
  feature: WasmModule;
  time: number;
  timestamp: Date;
}

app.use(express.json());

app.options('*', cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/measurement', async (req: Request, res: Response) => {
  const { feature } = req.body as Measurement | ModuleInitMeasurement;
  console.log(req.body);
  if (feature === WasmModule.mazeGeneration) {
    const { isWasm, timestamp, time, width, height } = req.body as MazeGenerationMeasurement;
    await fs.appendFile(
      `${MEASUREMENTS_DIR}/mazeGeneration/measurements2.csv`,
      `${isWasm},${time},${width},${height},${new Date(timestamp).toISOString()}\n`
    );
  } else if (feature === WasmModule.imageResize) {
    const { isWasm, timestamp, time, size } = req.body as ImageResizeMeasurement;
    await fs.appendFile(
      `${MEASUREMENTS_DIR}/imageResize/measurements2.csv`,
      `${isWasm},${time},${size},${new Date(timestamp).toISOString()}\n`
    );
  } else if (feature === WasmModule.jsonToCsv) {
    const { isWasm, timestamp, time, size } = req.body as ImageResizeMeasurement;
    await fs.appendFile(
      `${MEASUREMENTS_DIR}/jsonToCsv/measurements1.csv`,
      `${isWasm},${time},${size},${new Date(timestamp).toISOString()}\n`
    );
  }
  if (feature.includes('init')) {
    if (feature.includes(WasmModule.mazeGeneration)) {
      const { timestamp, time } = req.body as ModuleInitMeasurement;
      await fs.appendFile(
        `${MEASUREMENTS_DIR}/mazeGeneration/init_measurements.csv`,
        `${time},${new Date(timestamp).toISOString()}\n`
      );
    } else if (feature.includes(WasmModule.imageResize)) {
      const { timestamp, time } = req.body as ModuleInitMeasurement;
      await fs.appendFile(
        `${MEASUREMENTS_DIR}/imageResize/init_measurements.csv`,
        `${time},${new Date(timestamp).toISOString()}\n`
      );
    }
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods:', 'POST, GET, OPTIONS');
  res.status(200);
  res.send();
});

app.get('/leaderboards', async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const leaderBoardsData = await fs.readFile('./data/leaderBoardsData.json');
  res.send(leaderBoardsData);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
