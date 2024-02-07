package routes

import (
	"github.com/akhil-is-watching/zudeos-tester/controllers"
	"github.com/gofiber/fiber/v2"
)

func InitRoutes(app *fiber.App) {
	app.Get("/doctor", controllers.GetPatientsForDoctor)
	app.Post("/doctor", controllers.CreateDoctor)
	app.Post("/patient", controllers.CreatePatient)
	app.Post("/prescription", controllers.CreatePrescription)
	app.Get("/doctor/prescriptions/:patientId", controllers.GetPrescription)
}
