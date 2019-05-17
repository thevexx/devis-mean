const router = require('express').Router();
const devis = require('../models/devis');
const client = require('../models/client');
const project = require('../models/project');
const employee = require('../models/employee');
const product = require('../models/product');
const service = require('../models/service');
const user = require('../models/user');



router.get('/all', async (req, res) => {
  const data = {};
  data.project = await project.find({ isArchived: true })
    .populate({ path: 'client' })
    .populate({ path: 'employees', populate: { path: 'user' } })
    .populate({ path: 'services' })
    .populate({ path: 'products' })
    .exec();
  data.devis = await devis.find({ isArchived: true })
    .populate({ path: 'client' })
    .populate({ path: 'services' })
    .populate({ path: 'products' })
    .exec();
  data.client = await client.find({ isArchived: true }).exec();
  data.employee = await employee.find({ isArchived: true })
    .populate({ path: 'user' })
    .exec();
  data.product = await product.find({ isArchived: true }).exec();
  data.service = await service.find({ isArchived: true }).exec();
  data.user = await user.find({ isArchived: true }).exec();
  res.send({ msg: 'OK', data });
})

router.get('/project', async (req, res) => {
  const data = await project.find({ isArchived: true }).exec();
  res.send({ msg: 'OK', data });
})
router.get('/devis', async (req, res) => {
  const data = await devis.find({ isArchived: true }).exec();
  res.send({ msg: 'OK', data });
})
router.get('/client', async (req, res) => {
  const data = await client.find({ isArchived: true }).exec();
  res.send({ msg: 'OK', data });
})
router.get('/employee', async (req, res) => {
  const data = await employee.find({ isArchived: true }).exec();
  res.send({ msg: 'OK', data });
})
router.get('/product', async (req, res) => {
  const data = await product.find({ isArchived: true }).exec();
  res.send({ msg: 'OK', data });
})
router.get('/service', async (req, res) => {
  const data = await service.find({ isArchived: true }).exec();
  res.send({ msg: 'OK', data });
})
router.get('/user', async (req, res) => {
  const data = await user.find({ isArchived: true }).exec();
  res.send({ msg: 'OK', data });
})

router.get('/delete/:id', async (req, res) => {
  const data = await user.deleteOne({ _id: req.params.id }).exec();
  const data1 = await service.deleteOne({ _id: req.params.id }).exec();
  const data2 = await product.deleteOne({ _id: req.params.id }).exec();
  const data3 = await employee.deleteOne({ _id: req.params.id }).exec();
  const data4 = await devis.deleteOne({ _id: req.params.id }).exec();
  const data5 = await project.deleteOne({ _id: req.params.id }).exec();
  const data6 = await client.deleteOne({ _id: req.params.id }).exec();
  res.send({ msg: 'OK', data });
})


module.exports = router;
