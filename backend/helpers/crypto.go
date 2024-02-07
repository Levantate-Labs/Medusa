package helpers

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"encoding/hex"
	"math/big"
)

func PrivKeyToHex(key *ecdsa.PrivateKey) string {
	return hex.EncodeToString(key.D.Bytes())
}

func HexToPrivateKey(privateKeyHex string) (*ecdsa.PrivateKey, error) {
	privateKeyBytes, err := hex.DecodeString(privateKeyHex)
	if err != nil {
		return nil, err
	}

	curve := elliptic.P256()
	return &ecdsa.PrivateKey{
		PublicKey: ecdsa.PublicKey{
			Curve: curve,
			X:     curve.Params().Gx,
			Y:     curve.Params().Gy,
		},
		D: new(big.Int).SetBytes(privateKeyBytes),
	}, nil
}

func PublicKeyToHex(publicKey *ecdsa.PublicKey) string {
	xBytes := publicKey.X.Bytes()
	yBytes := publicKey.Y.Bytes()

	publicKeyBytes := append(xBytes, yBytes...)
	return hex.EncodeToString(publicKeyBytes)
}

func HexToPublicKey(publicKeyHex string) (*ecdsa.PublicKey, error) {
	publicKeyBytes, err := hex.DecodeString(publicKeyHex)
	if err != nil {
		return nil, err
	}

	curve := elliptic.P256()
	xBytes := publicKeyBytes[:curve.Params().BitSize/8]
	yBytes := publicKeyBytes[curve.Params().BitSize/8:]

	return &ecdsa.PublicKey{
		Curve: curve,
		X:     new(big.Int).SetBytes(xBytes),
		Y:     new(big.Int).SetBytes(yBytes),
	}, nil
}
