import { ethers } from 'ethers';

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("Usage: node verify-safe-sig.mjs <safeTxHash> <owner> <signature>");
  console.log("");
  console.log("Example:");
  console.log("  node verify-signature.js 0x8e79fb...638f 0xFd33B3...8A06 0x1250cb...9c71b");
  process.exit(1);
}

const [safeTxHash, owner, signature] = args;

function recoverSignerFromSafeSig(signatureHex, hash, ownerAddress) {
  const sig = signatureHex.toLowerCase();

  // Pre-approved signature (type 0x00)
  if (sig.startsWith("0x000000000000000000000000")) {
    const addr = "0x" + sig.slice(26, 66);
    return { address: ethers.getAddress(addr), preApproved: true, valid: true };
  }

  try {
    const r = `0x${sig.slice(2, 66)}`;
    const s = `0x${sig.slice(66, 130)}`;
    let v = parseInt(sig.slice(130, 132), 16);
    if (v < 27) v += 27;

    const recovered = ethers.recoverAddress(hash, { r, s, v });

    return {
      address: ethers.getAddress(recovered),
      valid: recovered.toLowerCase() === ownerAddress.toLowerCase(),
      preApproved: false
    };
  } catch (err) {
    return { error: err.message, valid: false };
  }
}

console.log(`SafeTxHash: ${safeTxHash}`);
console.log(`Owner:      ${owner}`);
console.log("");

const result = recoverSignerFromSafeSig(signature, safeTxHash, owner);
console.log("Result:", result);
