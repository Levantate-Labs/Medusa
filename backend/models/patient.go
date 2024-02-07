package models

import "time"

type Patient struct {
	ID                 string `gorm:"primaryKey"`
	DoctorID           string
	Name               string
	Email              string
	Age                int
	RegNo              int
	TotalPrescriptions int
	AdmnDate           time.Time
	PubKey             string `gorm:"unique"`
	PrivKeyHash        string `gorm:"unique"`
}
