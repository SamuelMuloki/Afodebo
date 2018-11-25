const express = require("express")
const next = require("next")
const compression = require("compression")

const dev = process.env.NODE_ENV !== "production"
const app = next({
  dev
})
const handle = app.getRequestHandler()
const port = dev ? 3000 : 8080

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(compression())

    server.get("/artwork/:artworkId", (req, res) => {
      return app.render(req, res, "/artwork", req.params)
    })

    server.get('/products/:id', (req, res) => {
      const actualPage = '/products';
      const queryParams = {
        id: req.params.id
      };
      console.dir('req.params.id = ' + JSON.stringify(req.params.id));
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
