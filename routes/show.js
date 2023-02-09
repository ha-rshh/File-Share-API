const router = require("express").Router();
const File = require('../models/file')
router.get('/:uuid', async (req, res) => {
      try {
            const file = await File.findOne({ uuid: req.params.uuid });
            if (!file) {
                  return res.render('donwload', { error: "Link has been expired." })
            }
            return res.render('download', {
                  uuid: file.uuid,
                  fileName: file.fileName,
                  fileSize: file.size,
                  download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
                  // http://localhost:3000/files/download/
            })
      } catch (err) {
            return res.render('download', { error: "Something went wrong." })
      }

})

module.exports = router;
