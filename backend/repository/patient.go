package repository

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"time"

	"github.com/akhil-is-watching/zudeos-tester/helpers"
	"github.com/akhil-is-watching/zudeos-tester/models"
	"github.com/akhil-is-watching/zudeos-tester/types"
	"gorm.io/gorm"
)

type PatientRepository struct {
	db *gorm.DB
}

func NewPatientRepository(db *gorm.DB) PatientRepository {
	return PatientRepository{
		db: db,
	}
}

func (repo PatientRepository) Create(input types.PatientCreateInput) error {
	PrivKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		return err
	}

	patient := models.Patient{
		ID:                 input.ID,
		DoctorID:           input.DoctorID,
		Name:               input.Name,
		Email:              input.Email,
		Age:                input.Age,
		RegNo:              input.RegNo,
		TotalPrescriptions: 0,
		AdmnDate:           time.Now(),
		PrivKeyHash:        helpers.PrivKeyToHex(PrivKey),
		PubKey:             helpers.PublicKeyToHex(&PrivKey.PublicKey),
	}

	if err := repo.db.Create(&patient).Error; err != nil {
		return err
	}

	return nil
}
