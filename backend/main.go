package main

import (
	"log"

	"github.com/akhil-is-watching/zudeos-tester/config"
	"github.com/akhil-is-watching/zudeos-tester/routes"
	"github.com/akhil-is-watching/zudeos-tester/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func init() {
	config, err := config.LoadConfig(".")
	if err != nil {
		log.Fatalln("Failed to load environment variables! \n", err.Error())
	}
	storage.ConnectDB(&config)
}

func main() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowHeaders:     "*",
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))
	routes.InitRoutes(app)
	app.Listen(":3000")
}
