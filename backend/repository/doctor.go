package repository

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"

	"github.com/akhil-is-watching/zudeos-tester/helpers"
	"github.com/akhil-is-watching/zudeos-tester/models"
	"github.com/akhil-is-watching/zudeos-tester/types"
	"gorm.io/gorm"
)

type DoctorRepository struct {
	db *gorm.DB
}

func NewDoctorRepository(db *gorm.DB) DoctorRepository {
	return DoctorRepository{
		db: db,
	}
}

func (repo DoctorRepository) Create(input types.DoctorCreateInput) error {
	PrivKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		return err
	}

	doctor := models.Doctor{
		ID:          input.ID,
		Name:        input.Name,
		Email:       input.Email,
		PrivKeyHash: helpers.PrivKeyToHex(PrivKey),
		PubKey:      helpers.PublicKeyToHex(&PrivKey.PublicKey),
	}

	if err := repo.db.Create(&doctor).Error; err != nil {
		return err
	}

	return nil
}

func (repo DoctorRepository) GetPatients(input types.DoctorFirstInput) ([]types.Patient, error) {
	var doctor models.Doctor
	var results []types.Patient

	repo.db.Preload("Patients").Where("email = ?", input.Email).Find(&doctor)

	for _, patient := range doctor.Patients {
		result := types.Patient{
			ID:                 patient.ID,
			Name:               patient.Name,
			Age:                patient.Age,
			TotalPrescriptions: patient.TotalPrescriptions,
			AdmissionDate:      patient.AdmnDate.String(),
		}

		results = append(results, result)
	}

	return results, nil
}
