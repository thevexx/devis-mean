const router = require('express').Router();
const devis = require('../models/devis');
const client = require('../models/client');
const nodemailer = require('nodemailer');

router.post('/update/:id', async (req, res) => {
  const devisResult = await devis.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.send({ msg: 'OK', data: devisResult });
});

router.post('/', async (req, res) => {
  let clientResult;
  const clientExist = await client.findOne({ email: req.body.email }).exec();
  if (!clientExist) {
    clientResult = await client.create(req.body).catch(err => err);
    if (clientResult.errmsg) {
      return res.send({ msg: 'error', data: clientResult })
    }
  } else {
    clientResult = clientExist;
  }
  req.body.client = clientResult._id;
  const devisResult = await devis.create(req.body).catch(err => err);
  await client.updateOne({ _id: clientResult._id }, { $push: { devis: devisResult._id } })
  await sendEmail(clientResult.email, devisResult);
  res.send({ msg: 'OK', data: devisResult });
});

router.get('/:id', async (req, res) => {
  if (req.params.id === 'all') {
    const devisResult = await devis.find({isArchived: false}).populate({ path: 'client' })
      .populate({ path: 'services' }).populate({ path: 'products' }).exec();
    res.send({ msg: 'OK', data: devisResult });
  } else {
    const devisResult = await devis.findOne({ _id: req.params.id }).populate({ path: 'client' })
      .populate({ path: 'services' }).populate({ path: 'products' }).exec();
    res.send({ msg: 'OK', data: devisResult });
  }
})


async function sendEmail(email, devis) {
  var smtpTransport = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user: 'chehir.dhaw@gmail.com', // TODO: To change
      pass: 'b19e6fa2-bc9c-4be8-9c47-bff050172457',
    },
  });

  const message = `Votre devis est en cours de traitement`;

  let mailOptions = {
    from: email,
    to: email, // TODO: To change
    subject: 'Demande de devis',
    html: message
  };

  let info = await smtpTransport.sendMail(mailOptions).catch(err => err)

  if (info.err) {
    return { msg: 'email not sent !' }
  }
  return { msg: 'email sent !' }

}



module.exports = router;
