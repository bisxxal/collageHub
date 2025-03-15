#                                                      CollageHub  🏫

CollageHub is a Next.js application that allows users to create and manage collages with ease. It leverages modern web technologies to provide a sleek and responsive user interface.

## Features

- **Create Collages**: Users can upload and manage images for collage creation.
- **Dynamic Layouts**: Multiple layout options for your collage.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Optimized Performance**: Built with Next.js for fast performance.
- **Role-based Access Control**: Different panels for Admin, Student, SuperAdmin, and Teacher.

## Getting Started

To get started with the project, clone the repository and install the dependencies.

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 14.x)
- npm (or yarn, pnpm, or bun)


## User Roles and Panels
The application has different user roles, each with distinct permissions and panels:

1. Admin Panel
Admin users have access to manage user accounts, monitor activity, and oversee the creation of collages.
Admins can add or remove users and moderate content.
2. Student Panel
Students can create and manage their own collages, as well as view and edit their previous works.
Students do not have access to admin-specific features like user management.
3. SuperAdmin Panel
SuperAdmins have the highest level of control over the application.
They can manage all users, review activity logs, and perform system-wide settings.
4. Teacher Panel
Teachers can review student-created collages, offer feedback, and access specific tools for educational purposes.
Teachers have a view-only access to some parts of the Admin panel.


### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/bisxxal/collagehub.git
    cd collagehub
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
