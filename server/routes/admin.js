const router = require('express').Router();
const devis = require('../models/devis');
const client = require('../models/client');
const project = require('../models/project');
const employee = require('../models/employee');
const product = require('../models/product');
const service = require('../models/service');
const nodemailer = require('nodemailer');
const user = require('../models/user');
let bcrypt = require('bcrypt-nodejs')


router.post('/user/updatePass/:id', async (req, res) => {
  const userResult = await user.findOne({ _id: req.params.id }).exec();
  if (!userResult.comparePassword(req.body.old, userResult.password)) { res.send({ msg: 'Bad password', data: '' }); }
  req.body.new = bcrypt.hashSync(req.body.new);
  const userResult2 = await user.updateOne({ _id: req.params.id }, { $set: { password: req.body.new } }).exec();
  res.send({ msg: 'OK', data: userResult2 });
});

router.get('/client/:id', async (req, res) => {
  if (req.params.id === 'all') {
    const clientResult = await client.find({ isArchived: false }).populate({ path: 'devis' }).exec();
    res.send({ msg: 'OK', data: clientResult });
  } else {
    const clientResult = await client.findOne({ _id: req.params.id }).exec();
    res.send({ msg: 'OK', data: clientResult });
  }
})

router.post('/client/update/:id', async (req, res) => {
  const clientResult = await client.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.send({ msg: 'OK', data: clientResult });
});

router.get('/project/:id', async (req, res) => {
  if (req.params.id === 'all') {
    const projectResult = await project.find({ isArchived: false })
      .populate({ path: 'client' })
      .populate({ path: 'employees', populate: { path: 'user' } })
      .populate({ path: 'services' })
      .populate({ path: 'products' })
      .exec();
    res.send({ msg: 'OK', data: projectResult });
  } else {
    const projectResult = await project.findOne({ _id: req.params.id })
      .populate({ path: 'services' })
      .populate({ path: 'products' })
      .populate({ path: 'client' })
      .populate({ path: 'employees', populate: { path: 'user' } })
      .exec();
    res.send({ msg: 'OK', data: projectResult });
  }
})

router.post('/project/update/:id', async (req, res) => {
  if (req.body.client) {
    const clientResult = await client.updateOne({ _id: req.body.client._id }, { $set: req.body.client }).exec();
  }
  const projectResult = await project.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.send({ msg: 'OK', data: projectResult });
});

router.get('/employee/:id', async (req, res) => {
  if (req.params.id === 'all') {
    const employeeResult = await employee.find({ isArchived: false })
      .populate({ path: 'user', select: { password: 0 } })
      .exec();
    const projectResult = await project.find({ isArchived: false })
    employeeResult.forEach(employee => {
      employee.projects = projectResult.filter(elem => elem.employees.filter(empl => empl.toString() === employee._id.toString()).length !== 0)
    });
    res.send({ msg: 'OK', data: employeeResult });
  } else {
    const employeeResult = await employee.findOne({ _id: req.params.id })
      .populate({ path: 'user' })
      .exec();
    res.send({ msg: 'OK', data: employeeResult });
  }
})

router.post('/employee', async (req, res) => {
  const userResult = await user.create(req.body.user).catch(err => err);
  req.body['user'] = userResult._id;
  const employeeResult = await employee.create(req.body).catch(err => err);
  await user.updateOne({ _id: userResult._id }, { $set: { employee: employeeResult._id } }).exec();
  res.send({ msg: 'OK', data: employeeResult });
});

router.post('/employee/update/:id', async (req, res) => {
  const userResult = await user.findOne({ employee: req.params.id }).exec();
  if (req.body.user.password === '') {
    delete req.body.user.password;
  } else {
    req.body.user.password = bcrypt.hashSync(req.body.user.password);
  }
  const userResult2 = await user.updateOne({ employee: req.params.id }, { $set: req.body.user }).exec();
  req.body.user = userResult._id;
  const employeeResult = await employee.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.send({ msg: 'OK', data: employeeResult });
});

router.post('/assign/:devisId', async (req, res) => {
  let devisResult = await devis.findOne({ _id: req.params.devisId }).exec();
  devisResult['employees'] = req.body.employees;
  devisResult['_id'] = '';
  delete devisResult._id;
  delete devisResult.__v;
  const projectToCreate = {
    type: devisResult.type,
    serviceType: devisResult.serviceType,
    dateLimit: devisResult.dateLimit,
    description: devisResult.description,
    client: devisResult.client,
    quantities: devisResult.quantities,
    products: devisResult.products,
    services: devisResult.services,
    employees: devisResult.employees,
  }
  const projectResult = await project.create(projectToCreate).catch(err => err);
  res.send(projectResult);
})

router.get('/product/:id', async (req, res) => {
  if (req.params.id === 'all') {
    const productResult = await product.find({ isArchived: false }).exec();
    res.send({ msg: 'OK', data: productResult });
  } else {
    const productResult = await product.findOne({ _id: req.params.id }).exec();
    res.send({ msg: 'OK', data: productResult });
  }
})

router.post('/product', async (req, res) => {
  const productResult = await product.create(req.body).catch(err => err);
  res.send({ msg: 'OK', data: productResult });
});

router.post('/product/update/:id', async (req, res) => {
  const productResult = await product.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.send({ msg: 'OK', data: productResult });
});


router.get('/admin/:id', async (req, res) => {
  if (req.params.id === 'all') {
    const adminResult = await user.find({ role: 'admin', isArchived: false }).exec();
    res.send({ msg: 'OK', data: adminResult });
  } else {
    const adminResult = await user.findOne({ _id: req.params.id }).exec();
    res.send({ msg: 'OK', data: adminResult });
  }
})

router.post('/admin', async (req, res) => {
  const adminResult = await user.create(req.body).catch(err => err);
  res.send({ msg: 'OK', data: adminResult });
});

router.post('/admin/update/:id', async (req, res) => {
  const adminResult = await user.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.send({ msg: 'OK', data: adminResult });
});

router.get('/service/:id', async (req, res) => {
  if (req.params.id === 'all') {
    const serviceResult = await service.find({ isArchived: false }).exec();
    res.send({ msg: 'OK', data: serviceResult });
  } else {
    const serviceResult = await service.findOne({ _id: req.params.id }).exec();
    res.send({ msg: 'OK', data: serviceResult });
  }
})

router.post('/service', async (req, res) => {
  const serviceResult = await service.create(req.body).catch(err => err);
  res.send({ msg: 'OK', data: serviceResult });
});

router.post('/service/update/:id', async (req, res) => {
  const serviceResult = await service.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.send({ msg: 'OK', data: serviceResult });
});

router.get('/dashboard', async (req, res) => {
  data = {};
  data.devis = await devis.count({ isArchived: false }).exec();
  data.project = await project.count({ isArchived: false }).exec();
  data.employee = await employee.count({ isArchived: false }).exec();
  res.send({ msg: 'OK', data });
})

router.get('/dashboard/employee/:id', async (req, res) => {
  data = {};
  data.project = await project.countDocuments({ employees: req.params.id }).exec();
  res.send({ msg: 'OK', data });
})

router.get('/dashboard/projects/:id', async (req, res) => {
  console.log(req.params.id);
  const projectData = await project.find({ employees: req.params.id, isArchived: false })
    .populate({ path: 'client' })
    .populate({ path: 'employees', populate: { path: 'user' } })
    .populate({ path: 'services' })
    .populate({ path: 'products' }).exec();
  res.send({ msg: 'OK', data: projectData });
})

router.get('/emaildevis/:id', async (req, res) => {
  const devisData = await devis.findOne({ _id: req.params.id }).populate({ path: 'client' }).exec();
  let devisMessage = ``;
  devisMessage = `<h3> bonjour, veuillez cliquer sur le lien ci-dessous pour confirmer votre devis </h3> <br>
  <a href="http://localhost:4200/devis/${req.params.id}" >lien</a>`
  const emailStatus = await sendEmail(devisData.client.email, 'Devis Confirmation', devisMessage);
  res.send(emailStatus);
})

async function sendEmail(email, subject, body) {
  var smtpTransport = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {
      user: 'chehir.dhaw@gmail.com',
      pass: 'b19e6fa2-bc9c-4be8-9c47-bff050172457',
    },
  });
  let mailOptions = {
    from: email,
    to: email,
    subject: subject,
    html: body
  };
  let info = await smtpTransport.sendMail(mailOptions).catch(err => err)
  if (info.err) {
    return { msg: 'email not sent !' }
  }
  return { msg: 'email sent !' }
}

module.exports = router;
