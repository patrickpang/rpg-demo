const { exec } = require('child_process')

exec('gm identify -format "%i %w %h\n" Tilesets/*', (err, stdout, stderr) => {
  const tileData = stdout
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => line.split(' '))
  const errors = tileData.filter(
    ([name, width, height]) => parseInt(width) % 32 !== 0 || parseInt(height) % 32 !== 0
  )
  console.log(errors)
})
