import * as db from '../helpers/database';

export const getById = async (id: any) => {
  let query = 'SELECT * FROM cats WHERE ID = ?';
  let values = [id];
  let data = await db.run_query(query, values);
  return data;
}

export const getAll = async() => {
  let query = 'SELECT * FROM cats';
  let data = await db.run_query(query, null);
  return data;
}

export const add = async(cats: any) => {
  let keys = Object.keys(cats);
  let values = Object.values(cats);
  let key = keys.join(',');
  let param = '';
  for(let i: number = 0; i<values.length; i++) {
    param += '? ,';
  }
  param=param.slice(0, -1);
  let query = `INSERT INTO cats (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return {status: 201};
  } catch(err: any) {
    return err;
  }
}
