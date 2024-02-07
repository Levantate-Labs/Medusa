package models

import "time"

type Prescription struct {
	ID                string `gorm:"primaryKey"`
	PatientID         string
	DoctorID          string
	Date              time.Time
	Validity          int
	PrescriptionItems []PrescriptionItem
}
