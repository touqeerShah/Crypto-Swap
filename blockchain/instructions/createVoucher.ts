import { VoidSigner } from "@ethersproject/abstract-signer";
import { BigNumber, Signer } from "ethers";
import { DocumentSignature, UserIdentityNFT, Test1 } from "../typechain-types";

export async function castVote(
  documentSignature: DocumentSignature,
  signer: Signer,
  creator: string,
  uri: string,
  documentId: BigNumber,
  signingDomain: string,
  signatureVersion: string,
) {
  const voucher = { creator, documentId, uri };
  const chainId = (await documentSignature.provider.getNetwork()).chainId;
  const domain = {
    name: signingDomain,
    version: signatureVersion,
    verifyingContract: documentSignature.address,
    chainId,
  };
  //      "createDocument(address creator,uint256 documentId,string uri)");

  const types = {
    createDocument: [
      { name: "creator", type: "address" },
      { name: "documentId", type: "uint256" },
      { name: "uri", type: "string" },
    ],
  };
  const signature = await (signer as VoidSigner)._signTypedData(domain, types, voucher);
  const _voucher = {
    ...voucher,
    signature,
  };
  return signature;
}

export async function createUserId(
  userIdentityNFT: UserIdentityNFT,
  signer: Signer,
  userId: string,
  uri: string,
  fingerPrint: string,
  signingDomain: string,
  signatureVersion: string,
) {
  const voucher = { uri, userId, fingerPrint };
  const chainId = (await userIdentityNFT.provider.getNetwork()).chainId;
  const domain = {
    name: signingDomain,
    version: signatureVersion,
    verifyingContract: userIdentityNFT.address,
    chainId,
  };
  const types = {
    createUserId: [
      { name: "uri", type: "string" },
      { name: "userId", type: "bytes" },
      { name: "fingerPrint", type: "bytes" },
    ],
  };
  // console.log("types", types);

  const signature = await (signer as VoidSigner)._signTypedData(domain, types, voucher);
  const _voucher = {
    ...voucher,
    signature,
  };
  return _voucher;
}




export async function test(
  userIdentityNFT: Test1,
  signer: Signer,
  tokenId: Number,
  status: Number,
  signingDomain: string,
  signatureVersion: string,
) {
  const voucher = { tokenId, status };
  const chainId = (await userIdentityNFT.provider.getNetwork()).chainId;
  const domain = {
    name: signingDomain,
    version: signatureVersion,
    verifyingContract: userIdentityNFT.address,
    chainId,
  };
  const types = {
    createUserId: [
      { name: "tokenId", type: "uint256" },
      { name: "status", type: "uint256" },
    ],
  };
  // console.log("types", types);

  const signature = await (signer as VoidSigner)._signTypedData(domain, types, voucher);
  const _voucher = {
    ...voucher,
    signature,
  };
  return _voucher;
}
