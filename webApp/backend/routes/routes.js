const express = require("express")
const router = express.Router()
const {saveKey, getKey, putVerifiableRecord, getVerifiableRecord} = require("../controller")

router.post("/save", async (req, res) => {
    const resp = await saveKey(req.body.stxAddress, req.body.publicKey)
    res.send(resp)
})

router.get("/getKey/:address", async (req, res) => {
    const resp = await getKey(req.params["address"])
    if (resp["code"] === 1)
        res.send(resp["key"]);
    else
        return null;
})

router.post("/add", async (req, res) => {
    const resp = await putVerifiableRecord(req.body.ownerAddress, req.body.txid, req.body.url, req.body.cnic);
    res.send(resp);
})

router.get("/records/:address", async (req, res) => {
    const resp = await getVerifiableRecord(req.params["address"]);
    res.send(resp);
})

module.exports = router