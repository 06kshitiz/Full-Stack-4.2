const express = require('express');
const app = express();
const port = 3000;

let cards = [];
let id = 1;

//middleware
app.use(express.json());

app.get('/cards', (req, res) => {
    res.status(200).json(cards);
});

app.post('/cards', (req, res) => {
    const { suit, value } = req.body;

    if (!suit || !value) {
        return res.status(400).json({ error: 'Both suit and value are required!' });
    }
    const newCard = {
        id: id++,
        suit: suit,
        value: value
    }
    cards.push(newCard);
    res.status(201);
});

app.get('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const card = cards.find(c => c.id === id);

    if (!card) {
        return res.status(404).json({ error: 'Card not found!'});
    }

    res.status(200).json({
        message: 'Card found:',
        data: card
    });
});

app.delete('/cards/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Card not found' });
  }

  const deletedCard = cards.splice(index, 1)[0];
  res.status(200).json({
    message: 'Card deleted successfully',
    data: deletedCard
  });
});

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});