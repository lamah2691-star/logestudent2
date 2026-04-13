Create a professional frontend web application using React with a clean architecture and CSS Modules for styling.

Project Name:
LogeStudent – a student room reservation platform for Labé, Guinea.

General Requirements:
- Use React (functional components with hooks)
- Use modern JavaScript (ES6+)
- Use CSS Modules for styling (no global CSS except reset)
- Follow a clean and scalable architecture
- No backend (use mock data / static JSON)
- Use React Router for navigation
- Code must be clean, modular, reusable, and maintainable

Architecture Requirements:
Organize the project using a clean structure:

/src
  /app (main app setup, routes)
  /pages (each page = one folder with component + styles)
  /features (business logic grouped by domain: cites, batiments, chambres)
  /components (reusable UI components: Navbar, Card, Button, Footer)
  /services (data fetching / mock data logic)
  /hooks (custom React hooks)
  /data (static mock JSON data)
  /assets (images, icons)
  /styles (global styles like reset only)

Each component must have:
- A JSX file
- A corresponding CSS Module file (Component.module.css)

Example:
RoomCard.jsx
RoomCard.module.css

Project Concept:
Hierarchy:
Cité → Bâtiment → Chambre

Mock Data Models:
- Cite (id, name, location, distance_university)
- Batiment (id, name, cite_id)
- Chambre (id, price, has_shower, status, batiment_id)

Pages to implement:

1. Home Page
- Hero section
- Search bar
- Featured cités

2. Cités Page
- Grid of cités using reusable cards

3. Cité Details Page
- Show cité info
- List buildings

4. Buildings Page
- List buildings with basic info

5. Rooms Page
- List rooms in a building
- Show price, shower, availability

6. Room Details Page
- Full details with "Reserve" button

7. Reservation Page
- Confirmation UI (no backend logic)

UI/UX Requirements:
- Modern, clean UI (Airbnb-inspired)
- Use reusable components (Card, Button, Layout)
- Use responsive grid layouts
- Consistent spacing and typography

CSS Modules Rules:
- No inline styles
- Scoped styles per component
- Use meaningful class names
- Avoid global conflicts

Technical Requirements:
- Use React Router (v6)
- Use useState and useEffect
- Use props and composition properly
- Avoid unnecessary complexity (no Redux)

Code Quality:
- Well-structured and commented
- Follow naming conventions
- Separation of concerns (UI vs logic)

Goal:
The application must look like a production-ready frontend, scalable and ready to be connected to a backend later.