const express = require("express")
const next = require("next")
const compression = require("compression")

const dev = process.env.NODE_ENV !== "production"
const app = next({
  dev
})
const handle = app.getRequestHandler()
// const port = dev ? 3000 : 8080

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(compression())

    server.get('/:name/:id/', (req, res) => {
      const actualPage = '/products';
      const queryParams = {
        id: req.params.id,
        name: req.params.name
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/search/:name/:id/', (req, res) => {
      const actualPage = '/search';
      const queryParams = {
        id: req.params.id,
        name: req.params.name
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.PORT || 3000, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:3000`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
