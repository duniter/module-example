"use strict"

const co = require('co')
const fs = require('fs')
const path = require('path')

module.exports = {

  duniter: {},

  duniterUI: {
    
    inject: {
      menu: fs.readFileSync(path.join(__dirname, 'injection/menu.js'), 'utf8')
    },
    
    route: (app, server, conf, program, params) => {

      app.get('/rml9-web-module/index.html', (req, res) => {
        return co(function*() {
          const current = yield server.dal.getCurrentBlockOrNull()
          const nbBlocks = current ? current.number + 1 : 0
          const blockstamp = current ? [current.number, current.hash].join('-') : '---- NEANT ---'
          let body = `<h1>rml9-web-module</h1><p>La blockchain contient <b>${nbBlocks}</b> blocs, le bloc courant est ${blockstamp}.</p>`
          res.status(200).send(body)
        })
      })
    }
  }
}
