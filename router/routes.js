const express = require("express");
const router = express.Router();

//--------------------------------------------- Middlewares ------------------------------------------------------- //
const auth = require("../middlewares/auth");

// ------------------------------------------- Controllers --------------------------------------------- //
const jenayatcyController = require("../controllers/jenayatcyController");
const kanunController = require("../controllers/kanunController");
const ulanyjyController = require("../controllers/ulanyjyController");

//---------------------------------------------- User Routes --------------------------------------------------- //
router.post("/admin/login", ulanyjyController.loginUser);
router.get("/admin/ulanyjy/list", auth, ulanyjyController.getUser);
router.post("/admin/ulanyjy/create", ulanyjyController.createUser);
router.patch("/admin/ulanyjy/update/:id", auth, ulanyjyController.updateUser);
router.delete("/admin/ulanyjy/delete/:id", auth, ulanyjyController.deleteUser);

//---------------------------------------------- Kanun Routes --------------------------------------------------- //
router.get("/kanun/list", kanunController.getKanun);
router.get("/admin/kanun/list", auth, kanunController.getKanun);
router.post("/admin/kanun/create", kanunController.create);
router.patch("/admin/kanun/update/:id", auth, kanunController.update);
router.delete("/admin/kanun/delete/:id", auth, kanunController.deleteKanun);

//---------------------------------------------- Jenayatcy Routes --------------------------------------------------- //
router.get("/jenayatcy/list", jenayatcyController.getJenayatcy);
router.delete("/admin/jenayatcy/file/delete", jenayatcyController.fileDelete);
router.get("/admin/jenayatcy/list", auth, jenayatcyController.getJenayatcy);
router.post("/admin/jenayatcy/create", jenayatcyController.createJenayatcy);
router.patch(
  "/admin/jenayatcy/update/:id",
  auth,
  jenayatcyController.updateJenayatcy
);
router.delete(
  "/admin/jenayatcy/delete/:id",
  auth,
  jenayatcyController.deleteJenayatcy
);

module.exports = router;
