# Contact Management - Mini CRM Feature

## Project Description
The **Contact Management** system is a feature-rich mini CRM application built to manage customer/client contact information efficiently. Users can perform the following actions:
- **Add Contacts**: Capture essential details such as name, email, phone number, company, and job title.
- **View Contacts**: Browse through all contacts in a table view with sorting and pagination for usability.
- **Edit Contacts**: Update existing records to keep information accurate.
- **Delete Contacts**: Remove outdated or irrelevant entries.

---

## Tech Stack:
### Frontend
- **ReactJS** using **MUI (Material UI)** for a clean and consistent user interface
### Backend
- **Node.js** for RESTful APIs.

---

## Chosen Database
**Database:** PostgreSQL (hosted on NeonDB)

**Why PostgreSQL?**
1. **Relational Structure**: PostgreSQL's relational database structure is ideal for maintaining consistent, structured data like contact information.
2. **Scalability**: Supports large datasets, making it suitable for growing CRM applications.
3. **Reliability**: Strong ACID compliance ensures data integrity during CRUD operations.
4. **Flexibility**: Supports advanced queries, indexing, and search features, which can be extended for advanced CRM functionalities.

---

## Setup Instructions

### Prerequisites
- **Node.js**: v16 or higher
- **PostgreSQL Database**: Local or hosted (e.g., NeonDB)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/CRM-Erino.git
cd CRM-Erino
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory:
   ```env
   DATABASE_URL=<your-database-connection-string>
   PORT=5000
   ```
4. Run the database schema script in your PostgreSQL database:
   ```sql
   CREATE TABLE contacts (
       id SERIAL PRIMARY KEY,
       first_name VARCHAR(50) NOT NULL,
       last_name VARCHAR(50),
       email VARCHAR(100) NOT NULL UNIQUE,
       phone_number VARCHAR(15),
       company VARCHAR(100),
       job_title VARCHAR(50),
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
   );
   ```
   Add the following constraints too for proper error handling:
   
   ```sql
   ALTER TABLE contacts
    ADD CONSTRAINT phone_number_format CHECK (phone_number ~ '^[0-9]{10,15}$');

   ALTER TABLE contacts
     ADD CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')

   ALTER TABLE contacts
    ADD CONSTRAINT first_name_not_empty CHECK (
    trim(first_name) <> ''
    );
   ```
6. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm run dev
   ```
4. The app will be available at [http://localhost:5173](http://localhost:5173).

---

## How the Application Works

### Frontend
- **Technologies**: ReactJS, Material UI, Axios
- **Components**:
  - **ContactForm**: Handles the creation and editing of contact details.
  - **DataTable**: Displays all contacts in a paginated and sortable grid using MUI's `DataGrid`.
  - **Navigation**: Routing to `Create`, `Edit`, and `Home` pages using React Router.
  - **Notification**: The frontend utilizes the `React Toastify` library to show success and error messages, providing a better user experience.
- **Features**:
  - Add, edit, and delete contacts through dynamic form validation and API integration.
  - Sorting and pagination for the contact list.

### Backend
- **Technologies**: Node.js, Express.js, Joi
- **Endpoints**:
  - `POST /contacts`: Adds a new contact.
  - `GET /contacts`: Retrieves all contacts.
  - `PUT /contacts/:id`: Updates a contact by ID.
  - `DELETE /contacts/:id`: Deletes a contact by ID.
- **Error Handling**:
  - Joi is used for request body validation, ensuring that required fields are present and in the correct format.
  - Error handling is centralized using a middleware function, which provides detailed error messages for common issues such as validation errors, constraint violations, and server errors.

### Database
- **PostgreSQL Schema**: A single `contacts` table with essential columns for storing contact details.
- **Hosted on NeonDB**: Enables remote database access for seamless development.
---

## Challenges and Solutions

### 1. **Validation Issues**
Initially, I faced challenges in validating email and phone number formats effectively. Despite using Joi for validation in the backend, incorrect formats were still being saved due to missing checks at the database level. To resolve this, I added check constraints directly in the PostgreSQL schema:

- The phone number constraint ensures the number is between 10 to 15 digits.
- The email constraint enforces a proper email format using a regex pattern.

### 2. **Error Handling**
Handling different types of errors was a bit tricky, especially when dealing with database constraint violations. Initially, all errors were returned as a generic "Internal Server Error," which wasn’t helpful. I improved this by:

- Using specific error codes like `23505` for duplicate entries and `23514` for check constraint violations.
- Updating the error handler to provide clear, user-friendly error messages (e.g., "Email already exists" or "Phone number must be between 10 to 15 digits").
