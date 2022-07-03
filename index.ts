import {MerkleTree} from "merkletreejs";
const SHA256 = require('crypto-js/sha256')
const fs = require('fs')

function getProofForAddress(address: string, merkleTree: MerkleTree) : string[] {
    return merkleTree.getHexProof(address)
}

const exampleProofAddress = '0x496fd840eFfcb08065be99878E45A466323eaFd5'

const wlAddresses = fs.readFileSync('wlAddresses.txt', {encoding:'utf-8'}).split('\n')
const leaves = wlAddresses.map((wlAddress: string) => SHA256(wlAddress))

const tree = new MerkleTree(leaves, SHA256)

const root = tree.getRoot().toString('hex')

console.log('Your merkle root:', root)

const proof = getProofForAddress(SHA256(exampleProofAddress), tree)
console.log('Merkle proof for address:', proof)


