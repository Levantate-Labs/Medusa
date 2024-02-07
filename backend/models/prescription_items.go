package models

type PrescriptionItem struct {
	ID             string `gorm:"primaryKey"`
	PrescriptionID string
	MedicineCode   int
	MedicineName   string
	Amount         int
}
