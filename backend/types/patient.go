package types

type Patient struct {
	ID                 string `json:"id"`
	Name               string `json:"name"`
	Age                int    `json:"age"`
	TotalPrescriptions int    `json:"total_prescriptions"`
	AdmissionDate      string `json:"admission_date"`
}

type PatientCreateInput struct {
	ID       string `json:"id"`
	DoctorID string `json:"doctor_id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Age      int    `json:"age"`
	RegNo    int    `json:"reg_no"`
}
