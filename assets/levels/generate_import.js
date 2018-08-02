const fs = require('fs')

const level = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8'))

let imports = []
let loads = []
let adds = []

level['tilesets'].forEach(tileset => {
  imports.push(`import ${tileset['name']} from '../../assets/levels/${tileset['image']}'`)
  loads.push(`this.load.image('${tileset['name']}', ${tileset['name']})`)
  adds.push(``)
})

console.log(imports.join('\n'))
console.log()
console.log(loads.join('\n'))
console.log()
console.log(adds.join('\n'))