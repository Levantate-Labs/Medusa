package types

type PrescriptionCreateInput struct {
	ID        string                        `json:"id"`
	PatientID string                        `json:"patient_id"`
	DoctorID  string                        `json:"doctor_id"`
	Validity  int                           `json:"validity"`
	Items     []PrescriptionItemCreateInput `json:"items"`
}

type PrescriptionItemCreateInput struct {
	ID           string `json:"id"`
	MedicineCode int    `json:"medicine_code"`
	MedicineName string `json:"medicine_name"`
	Amount       int    `json:"amount"`
}

type PrescriptionFindInput struct {
	DoctorEmail string `json:"doctor_id"`
	PatientID   string `json:"patient_id"`
}

type Prescription struct {
	PatientID        string `json:"patient_id"`
	PatientName      string `json:"patient_name"`
	DoctorID         string `json:"doctor_id"`
	DoctorName       string `json:"doctor_name"`
	PrescriptionDate string `json:"prescription_date"`
	Validity         int    `json:"validity"`
	Items            []Item `json:"items"`
}

type Item struct {
	MedicineCode int    `json:"medicine_code"`
	MedicineName string `json:"medicine_name"`
	PrescribedBy string `json:"prescribed_by"`
	Amount       int    `json:"amount"`
	Validity     int    `json:"validity"`
}
