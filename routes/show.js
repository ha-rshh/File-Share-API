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
                  fileName: file.filename,
                  fileSize: file.size,
                  downloadLink: `${window.location.origin}/files/download/${file.uuid}`,
                  // http://localhost:3000/files/download/dfasdggasdg
            })
      } catch (err) {
            return res.render('download', { error: "Something went wrong." })
      }

})

module.exports = router;
