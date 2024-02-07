package controllers

import (
	"strings"

	"github.com/akhil-is-watching/zudeos-tester/repository"
	"github.com/akhil-is-watching/zudeos-tester/storage"
	"github.com/akhil-is-watching/zudeos-tester/types"
	"github.com/gofiber/fiber/v2"
)

func CreatePrescription(c *fiber.Ctx) error {
	var input types.PrescriptionCreateInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data":  err.Error(),
			"error": true,
		})
	}

	repo := repository.NewPrescriptionRepository(storage.GetDB())
	if err := repo.Create(input); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":  err.Error(),
			"error": true,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data":  "Prescription Created Successfully",
		"error": false,
	})
}

func GetPrescription(c *fiber.Ctx) error {
	patientId := c.Params("patientId")
	reqToken := c.Get("Authorization")
	splitToken := strings.Split(reqToken, "Bearer")
	reqToken = strings.TrimSpace(splitToken[1])

	repo := repository.NewPrescriptionRepository(storage.GetDB())
	patients, err := repo.FetchPrescriptionByDoctorPatient(types.PrescriptionFindInput{DoctorEmail: reqToken, PatientID: patientId})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"data":  err.Error(),
			"error": true,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data":  patients,
		"error": false,
	})
}
