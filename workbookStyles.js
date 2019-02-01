const xl = require('excel4node');
const {wb} = require('./app');

var categoryStyle = wb.createStyle({
  alignment: {
      textRotation: 45, 
    }
  });
 

module.exports = {
  categoryStyle,
};