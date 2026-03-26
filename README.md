# signature-verification
Safe Signature Verification

## Setup

```bash
npm install ethers
```

## Usage

```bash
node verify-safe-sig.mjs <safeTxHash> <owner> <signature>
```

## Example

```bash
node verify-signature.js \
  0x8e79fbc877b427d0cbecee3995a260adb377381bab342c20e3cab8451db3638f \
  0xFd33B35E5720Fcf1Be15c5B8FE6fAA8AdC508A06 \
  0x1250cb9ff85810df1e8e4c0b09c0d70ab3d04694db403626f971792c4f0a29d9631d6540c19ba107bdcbbd4af58b7de8fa7d18f797cc94383361bf81242d69c71b
```

Output:

```
SafeTxHash: 0x8e79fb...638f
Owner:      0xFd33B3...8A06

Result: {
  address: '0xFd33B3...8A06',
  valid: true,
  preApproved: false
}
```

## Requisitos

- Node.js >= 18
- ethers.js v6
