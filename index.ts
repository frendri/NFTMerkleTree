import {MerkleTree} from "merkletreejs";
const keccak256 = require('keccak256')
const fs = require('fs')

function getProofForAddress(address: string, merkleTree: MerkleTree) : string[] {
    return merkleTree.getHexProof(keccak256(address))
}

const exampleProofAddress = '0x8ce8e2B8277796367D68fDd2eC3E95b942C19341'

const wlAddresses = fs.readFileSync('wlAddresses.txt', {encoding:'utf-8'}).split('\n')
const leaves = wlAddresses.map((wlAddress: string) => keccak256(wlAddress))

const tree = new MerkleTree(leaves, keccak256, {sort: true})

const root = tree.getRoot().toString('hex')

console.log('Your merkle root:', root)

const proof = getProofForAddress(exampleProofAddress, tree)
console.log('Merkle proof for address:', proof)


