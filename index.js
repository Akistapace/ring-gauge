const fs = require('fs')
const filePath = './img/samurai.jpg'
const copy = './resources/samurai.jpg'
fs.copyFile(filePath, copy, (error) => {
  if (error) {
    throw error
  } else {
    console.log('File has been moved to another folder.')
  }
})