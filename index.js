import express from 'express';
import path from 'path';

import data from './data/data.json';

const app = express();
const PORT = process.env.PORT || 5000;

// this is public folder for default route "/"
// note that leading slash isn't permitted 
app.use(express.static('public'));

// this is public folder for specified route images
// note that leading slash in first parameter is required
app.use('/images', express.static('images'));

app.use(express.json());

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/item/:id', (req, res) => {
  const { id } = req.params;
  const item = data[Number(id)];
  res.send(item);
});

app.route('/item')
  .get((req, res) => res.send(`a get request /item on port ${PORT}\n`))
  .post((req, res) => {
    console.log(req.body);
    res.send(req.body);
  })
  .put((req, res) => res.send(`a put request /item on port ${PORT}\n`))
  .delete((req, res) => res.send(`a delete request /item on port ${PORT}\n`));

app.listen(PORT, () => {
  console.log(`Your server is running on ${PORT}\n`);
});
