# Project Manager

This project was created to track multiple projects and include a ticketing system to track updates, issues, etc. on each project. The application uses React, Javascript, and Firebase for the database and authentication system.

### IMPORTANT
If selecting a project/ticket, you might need to double click it if it does not update immediately.

## Login Information

To login to the [Project Manager](https://tmsullivan7750.github.io/ProjectManager/), use either of the following credentials:

### `Administrator`

Email: admin@admin.com <br />
Password: Admin123

### `Developer`

Email: dev@dev.com <br />
Password: dev123

# Functions
List of all functions of each age of the Project Manager.

## Login
Allows the user to login to the project manager using their email and password. There is not option to sign up because I left it up to the Administrator to add new users to the project manager.

## Dashboard
The Dashboard fetches project and ticket information from the firestore database and displays it on tables. These tables allow for the selection of either a project or ticket by clicking on them highlighting them in blue (sometimes double clicking it is neccessary to select it). Users can add, edit, or delete project/tickets from the lists which will then update the database. You must have a project or ticket selected to edit or delete them.

## Tickets
This Tickets page fetches all of the signed in user's tickets from the database. Selecting one of the tickets will send you back to the dashboard with that ticket and its corresponding project selected for the user's viewing.

## Administration
The Admin page shows the Administrator a list of users fetched from the database along with their names, emails, phone numbers, passwords, and whether or not the user has admin privileges. The Admin can add new users granted they are created with correct email format and a password of atleast 6 characters. Currently I am using Firebase Auth for my login system, but there is no way of editing or deleting users from the application via the admin page as firebase Auth does not allow it. The admin must goto the Firebase console log to do this for now. Will eventually migrate off Firebase Auth which will allow editing and deleting of users.

## Socials
<a href="https://www.linkedin.com/in/thomassullivan97/" target="_blank">Linkedin</a> <br />
<a href="https://github.com/tmsullivan7750" target="_blank">GitHub</a>
