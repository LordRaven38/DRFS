import { openContractCall } from "@stacks/connect";

import {
    stringAsciiCV,
    standardPrincipalCV,
    bufferCV,
    uintCV,
    bufferCVFromString,
    callReadOnlyFunction,
    cvToJSON,
    NonFungibleConditionCode,
    createAssetInfo,
    makeStandardNonFungiblePostCondition,
    makeContractNonFungiblePostCondition,
    
} from "@stacks/transactions";
import { myStxAddress, networkType } from "./auth";
import { StacksTestnet } from "@stacks/network";

const issueNFT = async (owner, hash, CNIC, link ) => {
    let resp = {};

    const functionArgs = [
        standardPrincipalCV(owner),
        bufferCVFromString(hash),
        stringAsciiCV(CNIC),
        stringAsciiCV(link),
        //stringAsciiCV(holderPubKey)
      ];

      console.log(`network type: ${networkType()}`)
      console.log(`senderAddress: ${myStxAddress()}`)
      //console.log(stringAsciiCV(holderPubKey))
    const options = {
        contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        contractName: "NFTMinter",
        functionName: "mint",
        functionArgs,
        network: networkType(),
        senderAddress: myStxAddress(),
        appDetails: {
            name: "Urbane Issuer",
            icon: window.location.origin + "/my-app-logo.svg",
        },
        onFinish: (data) => {
            resp = {"txlink":`https://explorer.stacks.co/txid/${data.txId.txid}?chain=devnet`, "txid":data.txId.txid, "status":200};
        },
    };
    await openContractCall(options)
    return resp;
};

//new code block
export async function appCallReadOnlyFunction(optionsProps) {
    if (!optionsProps)
        return new Promise((resolve, reject) => reject("No arguments provided"));

    const options = {
        ...optionsProps,
        network: networkType(),
        senderAddress: myStxAddress(),
    };

    return callReadOnlyFunction(options)
        .then((response) => {

            console.log(response)
            const responseJson = cvToJSON(response);


            return new Promise((resolve, reject) => resolve(responseJson));
        })
        .catch((e) => {
            return new Promise((resolve, reject) => reject(e));
        });
}
//

//token id sender recipient

const transferNFT = async (tokenID, sender ) => {
    let resp = {};

    const functionArgs = [
        tokenID
      ];

      console.log(`network type: ${networkType()}`)
      console.log(`senderAddress: ${myStxAddress()}`)
      //console.log(stringAsciiCV(holderPubKey))
    
    const deployer="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    const NFTpostConditionAddress = sender;
    const NFTpostConditionCode = NonFungibleConditionCode.Sends;
    const tokenAssetName = tokenID
    const nonFungibleAssetInfo = createAssetInfo(deployer, 'NFTMinter', 'record-nft');

    const postConditions = [
        makeStandardNonFungiblePostCondition(
            NFTpostConditionAddress,
            NFTpostConditionCode,
            nonFungibleAssetInfo,
            tokenAssetName
        ),
    ]

    

    const options = {
        contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        contractName: "NFTMinter",
        functionName: "execute-transfer",
        functionArgs,
        network: networkType(),
        senderAddress: myStxAddress(),
        postConditions: postConditions,
        appDetails: {
            name: "Urbane Issuer",
            icon: window.location.origin + "/my-app-logo.svg",
        },
        onFinish: (data) => {
            resp = {"txlink":`https://explorer.stacks.co/txid/${data.txId.txid}?chain=devnet`, "txid":data.txId.txid, "status":200};
        },
    };
    await openContractCall(options)
    return resp;
};


const generateTransferRequest = async (tokenID, sender, reciever ) => {
    let resp = {};

    const functionArgs = [
        tokenID,
        standardPrincipalCV(sender),
        standardPrincipalCV(reciever)
      ];

    console.log(`network type: ${networkType()}`)
    console.log(`senderAddress: ${myStxAddress()}`)
    
    const deployer="ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
    

    const options = {
        contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        contractName: "NFTMinter",
        functionName: "transfer",
        functionArgs,
        network: networkType(),
        senderAddress: myStxAddress(),
        appDetails: {
            name: "Urbane Issuer",
            icon: window.location.origin + "/my-app-logo.svg",
        },
        onFinish: (data) => {
            resp = {"txlink":`https://explorer.stacks.co/txid/${data.txId.txid}?chain=devnet`, "txid":data.txId.txid, "status":200};
        },
    };
    await openContractCall(options)
    return resp;
};


export { issueNFT, transferNFT, generateTransferRequest  };