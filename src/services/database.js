import { Pool } from 'pg';
import { dbURL } from '../configs';

export const pool = new Pool({ connectionString: dbURL });

export const query = async (text, params) => await pool.query(text, params);
