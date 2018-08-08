const express = require('express');
const presidentsRouter = new express.Router();

let presidents = [
  {
    name: 'George Washington', order: 1, party: 'None', imgUrl: 'https://s3.amazonaws.com/mtv-main-assets/files/pages/ct-6440-h-2062-2.jpg'
  },
  {
    name: 'John Adams', order: 2, party: 'Federalist', imgUrl: 'https://www-tc.pbs.org/wgbh/americanexperience/media/filer_public_thumbnails/filer_public/6c/dc/6cdce016-b640-4a4d-8e86-c35dc982f7e1/adams_dilploma_01.jpg__400x434_q85_crop_subsampling-2_upscale.jpg'
  }
];
function getPresidents(){
  return presidents.sort((a, b) => {
    a.order - b.order
  })
}

function getPresidentByOrder(order){
  return presidents.find(president => president.order === order);
}

function addPresident(name, party, order, imgUrl){
  presidents.push({name, party, order, imgUrl});
}

function updatePresident(order, president){
  deletePresident(order);
  president.order = Number(president.order);
  presidents.push(president);
}

function deletePresident(order){
  presidents = presidents.filter((pres) => pres.order !== order);
}
presidentsRouter
  .get('/', (req, res) => {
    res.render('index', {presidents: getPresidents()});
  })
  .post('/', (req, res) => {
    addPresident(req.body.name, req.body.party, +req.body.order, req.body.imgUrl);
    res.redirect('/presidents');
  })
  .get('/:order', (req, res) => {
    const president = getPresidentByOrder(Number(req.params.order));
    if(president === undefined){
      res.sendStatus(404);
    } else {
      res.render('show', {president})
    }
  })
  .post('/:order', (req, res) => {
    updatePresident(Number(req.params.order), req.body);
    res.redirect('/presidents/' + req.params.order);
  })
  .post('/:order/delete', (req, res) => {
    deletePresident(Number(req.params.order));
    res.redirect('/presidents');
  });

module.exports = presidentsRouter;

