const res = require("express/lib/response");
const publicKey = require("../server/models/publicKey")
const verifiableRecords = require("../server/models/verifiableRecord");

const saveKey = async (stxAddress, pKey) => {
	const checkAddress = await publicKey.exists({ stxAddress: stxAddress });
	const checkKey = await publicKey.exists({ stxAddress: stxAddress, publicKey: pKey });

	try {
		if (!checkKey && !checkAddress) {
			const pKeyMap = new publicKey({
				stxAddress: stxAddress,
				publicKey: pKey,
			})
			await pKeyMap.save()
		}
		else if (checkAddress && !checkKey) {
			await publicKey.deleteMany({ stxAddress: stxAddress });
			const pKeyMap = new publicKey({
				stxAddress: stxAddress,
				publicKey: pKey,
			})
			await pKeyMap.save()

		}
		else {
			console.log("Key already exists")
		}
		return { "code": 1, "message": "success" }
	}
	catch (e) {
		console.log(e);
		return { "code": -1, "message": "save error" }
	}

}

const getKey = async (address) => {
	const key = await publicKey.findOne({ stxAddress: address })
	if (key !== null)
		return { "code": 1, "message": "success", "key": key }
	else
		return { "code": -1, "message": "key not found" }

}

const putVerifiableRecord = async (owner, txid, urllink, cnicadd) => {
	try {
		const checkExist = await verifiableCredential.exists({ ownerAddress: owner, txid: txid, url: urllink, cnic: cnicadd });
		if (!checkExist) {
			const object = new verifiableRecords({
				ownerAddress: owner, txid: txid, url: urllink, cnic: cnicadd
			})
			await object.save()
		}
		return { "code": 1, "message": "success" }
	}
	catch (e) {
		console.log(e)
		return { "code": -1, "message": "save error" }
	}
}

const getVerifiableRecord = async (address) => {
	const vc = await verifiableRecords.find({ ownerAddress: address })
	if (vc !== null)
		return { "code": 1, "message": "success", "vc": vc }
	else
		return { "code": -1, "message": "vc not found" }

}



module.exports = { saveKey, getKey, putVerifiableRecord, getVerifiableRecord}