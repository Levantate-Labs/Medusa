package types

type DoctorCreateInput struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type DoctorFirstInput struct {
	Email string `json:"email"`
}
