# Hereda2

## Description
Hereda2 is a production-ready boilerplate project following Clean Architecture principles using HTML and CSS.

## Setup Instructions
1. Clone the repository.
2. Navigate to the project directory.
3. Run the server using `npm start`.

## Clean Architecture Layers
- **Domain**: Contains business logic including entities, value objects, and repository interfaces.
- **Application**: Orchestrates use cases and manages data transfer objects (DTOs).
- **Infrastructure**: Implements repository interfaces, handling data persistence and external interactions.
- **Interfaces**: Entry points such as controllers and route handlers that act as the communication bridge to the application.
