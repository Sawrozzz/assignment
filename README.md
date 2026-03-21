# README


## 📁 Project Structure
The repository is divided into two main directories:
* **`/client`**: Frontend built with React, Vite, and Tailwind CSS.
* **`/server`**: Backend API built with Ruby on Rails and PostgreSQL.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed on your **Linux** environment:
* **Ruby** (v3.x+)
* **Rails** (v7.x+)
* **Node.js** (v22.x+)
* **PostgreSQL** (Running on port 5432)

---

## Clone Repository

1. **Clone Repo:**
   ```bash
   git clone https://github.com/Sawrozzz/assignment.git

##  Backend Setup (Rails)

1. **Navigate to the server directory:**
   ```bash
   cd server
2. **Install Dependencies:**
   ```bash
   bundle install
3. **Configure Database[NOTE:YOU MUST HAVE POSTGRES DB ON YOUR SYSTEM]:**
   ```bash
   rails db:create
   rails db:migrate
   rails db:seed
4. **Start Server:**   
   ```base
   rails s
 #  After seeding you will get an account credential and two properties created and store on db[NOTE: YOU CAN CREATE YOUR OWN DATA FROM CONSOLE]
1. User Credentials
   ```bash
    email: "test@buyer.com",
    password: "Test@123",

 You can use this credential for login process.[NOTE: WE DO HAVE USER REGISTRATION FUNCTIONALITY AS WELL BUT ONLY FROM SERVER SIDE, YOU CAN REGISTER ANY USER FROM POSTMAN OR FROM CONSOLE OR POSTMAN.]


##  Frontend Setup (React + Vite)

 1. **Navigate to the client directory:**
     ```bash
    cd client
 2. **Install packages:**
     ```bash
    npm install
 3. **Create .env file(if not cloned)**
    Add this line of code inside .env file
    ```bash
    VITE_API_URL=http://localhost:3000
 4. **Run the client**
    ```bash
    npm run dev
    open tab on: http://localhost:5173

### Working flow of this system

1. Initially you will redirect to login page.
2. Enter credential (email, password) from above and enter Login.
3. You will redirect to dashboard page. Their you will see list/card of properties with "Add to Favourite" Button.
4. On click on that button the properties added to your favourite list.
5. On the the top, you will see navbar from where you can navigate.
6. After adding on favourite, and when you navigate on Favourite Tab, You will see the property you recently added on   favourite.
7. You can click on Like button to Like and Dislike the item.
8. You can can also remove the item from your favourite list by clicking on the TrashButton on that item.
9. You can logout from your account from the logo image on the top right of navbar.
10. You can login any account from login page. Just you have to crate an account first which you can do from rails console or from postman with given route
 ```bash
   http://localhost:3000/api/user/signup ```
   with these request body
   ```bash
   email: <any email>
   name: <any name>
   password: <any password>
   ```

NOTE: YOU CAN CHECK THE UI'S ON README.MD FILE OF CLIENT FOLDER.

# THANK YOU.