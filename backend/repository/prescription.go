package repository

import (
	"time"

	"github.com/akhil-is-watching/zudeos-tester/models"
	"github.com/akhil-is-watching/zudeos-tester/types"
	"gorm.io/gorm"
)

type PrescriptionRepository struct {
	db *gorm.DB
}

func NewPrescriptionRepository(db *gorm.DB) PrescriptionRepository {
	return PrescriptionRepository{
		db: db,
	}
}

func (repo PrescriptionRepository) Create(input types.PrescriptionCreateInput) error {
	var model_items []models.PrescriptionItem

	for _, item := range input.Items {
		model_item := models.PrescriptionItem{
			ID:             item.ID,
			PrescriptionID: input.ID,
			MedicineCode:   item.MedicineCode,
			MedicineName:   item.MedicineName,
			Amount:         item.Amount,
		}

		model_items = append(model_items, model_item)
	}

	prescription := models.Prescription{
		ID:                input.ID,
		PatientID:         input.PatientID,
		DoctorID:          input.DoctorID,
		Date:              time.Now(),
		Validity:          input.Validity,
		PrescriptionItems: model_items,
	}

	if err := repo.db.Create(&prescription).Error; err != nil {
		return err
	}

	return nil
}

func (repo PrescriptionRepository) FetchPrescriptionByDoctorPatient(input types.PrescriptionFindInput) ([]types.Prescription, error) {
	var patient models.Patient
	var doctor models.Doctor

	var prescriptions []models.Prescription
	var results []types.Prescription

	if err := repo.db.Where("id = ?", input.PatientID).First(&patient).Error; err != nil {
		return results, err
	}

	if err := repo.db.Where("email = ?", input.DoctorEmail).First(&doctor).Error; err != nil {
		return results, err
	}

	err := repo.db.Preload("PrescriptionItems").Where("patient_id = ?", patient.ID).Where("doctor_id = ?", doctor.ID).Find(&prescriptions).Error
	if err != nil {
		return results, err
	}

	for _, prescription := range prescriptions {

		var Items []types.Item
		for _, j := range prescription.PrescriptionItems {
			Item := types.Item{
				MedicineCode: j.MedicineCode,
				MedicineName: j.MedicineName,
				PrescribedBy: doctor.Name,
				Amount:       j.Amount,
				Validity:     prescription.Validity,
			}

			Items = append(Items, Item)
		}

		result := types.Prescription{
			PatientID:        patient.ID,
			PatientName:      patient.Name,
			DoctorID:         doctor.ID,
			DoctorName:       doctor.Name,
			PrescriptionDate: prescription.Date.String(),
			Validity:         prescription.Validity,
			Items:            Items,
		}

		results = append(results, result)
	}

	return results, nil

}
