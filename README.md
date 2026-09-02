# 📚 Baguio City Public Library - Web Portal & Reservation System

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.26.2-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![SheetBest](https://img.shields.io/badge/Data-SheetBest_API-34A853?logo=google-sheets&logoColor=white)](https://sheetbest.com/)
[![Web3Forms](https://img.shields.io/badge/Forms-Web3Forms-000000?logo=mailgun&logoColor=white)](https://web3forms.com/)

A modern, responsive web application and digital reservation portal developed for the **Baguio City Public Library** (located at Jose Abad Santos Dr, Baguio City, Philippines). The system bridges the physical library with digital accessibility—allowing students, researchers, and community members to explore book catalogs, reserve reading materials, sign up for community events, submit book donations, and take a virtual tour of the library's three floors.

---

## 🌟 Key Features

### 1. 📖 Book Catalog & Multi-Book Reservation

- **Dynamic Catalog:** Fetches live book records and metadata via **SheetBest API** (synced with Google Sheets).
- **Search & Filter:** Real-time search across titles, authors, and book descriptions.
- **View Modes:** Seamless switching between **Grid View** (card cards with pop-up detail modals) and **List View** (tabular breakdown).
- **Multi-Book Reserve Queue:** Users can add up to 5 books to a reservation cart stored in `localStorage`.
- **Reservation Form:** Supports user classification (Student / Non-Student), date-picker validation (preventing past pickup dates), and auto-formatted multi-book reservation submission via **Web3Forms**.

### 2. 📅 Community Activities & Event Registration

- **Event Listings:** Showcases upcoming library programs, storytelling sessions, and educational workshops.
- **Interactive Registration Modal:** Allows patrons to apply for scheduled events with instant automated notification.
- **Date & Time Badges:** Clear schedule badges with integrated calendar formatting.

### 3. 🎁 Book Donation Management

- **Dynamic Item Builder:** Donors can add/remove multiple book categories (e.g., Filipiniana, Fiction, Children's Story Books, Periodicals, Theses, Audio-Visual) and specify quantities.
- **Seamless Form Dispatch:** Processes donor submissions and dispatches formatted donation manifests directly to the library administration.

### 4. 🏛️ Interactive 3-Floor Virtual Tour

- **Floor-by-Floor Showcase:** Automatic and interactive carousel touring all 3 floors:
  - **1st Floor:** Chinese Corner, Fiction, Inspirational Books, Periodicals, Children's Section.
  - **2nd Floor:** Gender and Development (GAD), Filipiniana, Local History, Law, General Collection.
  - **3rd Floor:** Study Carrels, Supreme Court Reports Annotated (SCRA).

### 5. ❓ Frequently Asked Questions (FAQ) & Contact

- **Accordion FAQ:** Searchable FAQ accordion answering queries on borrowing limits, library hours, reservation policies, and guidelines.
- **Interactive Map & Contact:** Embedded interactive Google Maps locator for the Baguio City Library alongside an instant contact inquiry form.

---

## 🛠️ Technology Stack

| Category                     | Technology                                                                 |
| :--------------------------- | :------------------------------------------------------------------------- |
| **Frontend Framework**       | [React 18](https://react.dev/)                                             |
| **Build Tool & Bundler**     | [Vite 5](https://vitejs.dev/)                                              |
| **Routing**                  | [React Router DOM v6](https://reactrouter.com/)                            |
| **Styling**                  | Vanilla CSS Modules (`*.module.css`), Google Fonts (Outfit, Inter, Roboto) |
| **Data Backend / CMS**       | [SheetBest API](https://sheetbest.com/) (Google Sheets REST API)           |
| **Form Processing**          | [Web3Forms API](https://web3forms.com/)                                    |
| **UI Components & Icons**    | React Icons, FontAwesome, Hamburger-React, React-Paginate                  |
| **Feedback & Notifications** | SweetAlert2, React-Toastify                                                |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 16 or higher) and `npm` installed on your machine.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LlaveW/reservation.git
   cd reservation
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in terminal).

### Production Build

To build the project for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 👥 Development Team & Credits

- **Developers:**
  - Felix Miguel Galpao
  - Cristian Joseph Dizon
  - Warren Cyrus Llave
  - Jake Parungao
- **Mentor:** Benny Cris Pio
- **Academic Unit:** School of Information Technology, under Dean Dr. Ellen Halover

---

## 📄 License & Attribution

Developed for the **Baguio City Public Library**, Baguio City, Philippines. All rights reserved.
