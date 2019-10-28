import express from 'express';
import models from '../models';
const router = express.Router();

router.get('/:opReturnData', async (req, res, next) => {
  const result = await models.OpReturn.findAll({
    where: {
      encode: req.params.opReturnData || '',
    },
    include: [{ model: models.Transaction }, { model: models.BlockInfo }],
  });

  res.status(200).send(result);
});

export default router;
