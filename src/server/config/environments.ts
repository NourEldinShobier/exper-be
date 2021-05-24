import * as dotenv from 'dotenv';
import { ENV } from '../constants';


dotenv.config();

export const API_VERSION: string = process.env.API_VERSION || '1.0';
export const NODE_ENV: string = process.env.NODE_ENV || ENV.DEVELOPMENT;
export const PORT: number = +process.env.PORT || 3000;
export const DOCS: string = process.env.DOCS || '';
export const SECRET_KEY: string = process.env.SECRET_KEY || 'MY_SIMPLE_KEY';
