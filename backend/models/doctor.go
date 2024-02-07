package models

type Doctor struct {
	ID          string `gorm:"primaryKey"`
	Name        string
	Email       string
	PubKey      string `gorm:"unique"`
	PrivKeyHash string `gorm:"unique"`
	Patients    []Patient
}
