
# Sharing Vision Backend

A backend app for post article. Used Golang (Gin) as framework.


## Tech Stack

**Language**: Golang (Gin)

**ORM**: GORM

**Database**: MySQL (hosted via aiven)

## Prerequisites
To run this project locally, you will need:
* [Go](https://go.dev/dl/) installed (v1.18 or higher)
* A MySQL server running locally or a cloud MySQL connection string

## How to Run Locally

**Clone the repository:**
   ```bash
   git clone [YOUR_BACKEND_REPO_URL]
   cd [YOUR_BACKEND_FOLDER_NAME]
   ```
**Install Dependencies:**
    
    go mod tidy

**Configure Env:**

```bash
DB_URL=***
PORT=8080
```

**Run:**

```bash
go run main.go
```

