import cors from 'cors';
import express from 'express';
import { pool } from './db.js';
const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async function (req, res) {
  const cards = await pool.query('SELECT * FROM cards');
  res.send(cards.rows);
});

app.post('/create', async (req, res) => {
  const { newNumber, cardId } = req.body;
  const cards = await pool.query(`INSERT INTO cards VALUES
      ('${cardId}'::bigint,'${newNumber}'::integer) RETURNING *`);
  if (cards) {
    const cards = await pool.query('SELECT * FROM cards');
    res.send(cards.rows);
  } else {
    res.status(418).send('Fail!');
  }
});

app.post('/remove', async (req, res) => {
  const { cardID } = req.body;
  const cards = await pool.query(`DELETE FROM cards WHERE id = '${cardID}'`);

  if (cards) {
    const cards = await pool.query('SELECT * FROM cards');
    res.send(cards.rows);
  } else {
    res.status(417).send('Fail!');
  }
});

app.listen(PORT, () => console.log(`server working in ${PORT}`));
