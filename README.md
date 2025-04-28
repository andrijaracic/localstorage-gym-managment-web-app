
# Gym Member Management App 🏋️‍♂️ | Aplikacija za Upravljanje Članovima Teretane

> Web application for managing gym members using **Local Storage**.  
> Web aplikacija za upravljanje članovima teretane korišćenjem **Local Storage-a**.

---

## 🛠️ Technologies Used | Tehnologije

- HTML5
- CSS3
- JavaScript (ES6)
- Local Storage API

---

## ✨ Features | Funkcionalnosti

### ➕ Create
- **EN:** Add a new gym member via a validated form.
- **SR:** Dodajte novog člana putem validirane forme.
- **EN:** After validation, a timer starts and the user must solve a random math operation (+, -, *, integer division) within 30 seconds.
- **SR:** Nakon validacije, pokreće se tajmer i korisnik mora da reši nasumični matematički zadatak (+, -, *, celobrojno deljenje) u roku od 30 sekundi.

### 📖 Read
- **EN:** Display all members dynamically from Local Storage in a table.
- **SR:** Dinamičko prikazivanje svih članova iz Local Storage-a u tabeli.

### ✏️ Update
- **EN:** Update existing member data (except ID) via a pre-filled form.
- **SR:** Ažuriranje postojećih podataka člana (osim ID-a) putem unapred popunjene forme.

### 🗑️ Delete
- **EN:** Remove a member from Local Storage and update the table.
- **SR:** Brisanje člana iz Local Storage-a i ažuriranje prikaza tabele.

---

## 📋 Validation Rules | Pravila Validacije

- **ID**
  - EN: Must be unique.
  - SR: Mora biti jedinstven.
- **Name and Surname**
  - EN: Must consist of two separate words.
  - SR: Mora sadržati dve reči.
- **Birth Year**
  - EN: Must be greater than 1900.
  - SR: Mora biti veća od 1900.
- **Email**
  - EN: Must contain "@".
  - SR: Mora sadržati "@".
- **Membership Type**
  - EN: Must be selected.
  - SR: Mora biti izabran.

---

## 🧮 Math Challenge | Matematički Izazov

- **EN:** After submitting the form, two random numbers (1-10) and a random math operation are generated.  
- **SR:** Nakon slanja forme, generišu se dva nasumična broja (1-10) i nasumična matematička operacija.
- **EN:** The user must solve it correctly within 30 seconds to successfully register a new member.
- **SR:** Korisnik mora tačno rešiti zadatak u roku od 30 sekundi da bi uspešno registrovao člana.
- **EN:** A visual timer (shrinking red bar) represents the countdown.
- **SR:** Vizuelni tajmer (smanjujuća crvena traka) prikazuje odbrojavanje vremena.

---

## 📂 Project Structure | Struktura Projekta

```plaintext
/
├── index.html      // Main page (HTML)
├── style.css       // Styling for table, form, and timer bar
├── script.js       // Full CRUD logic, validation, timer, Local Storage operations
```

---

## 🚀 How to Run | Kako Pokrenuti

1. Download or clone this repository.
2. Open the `index.html` file in your web browser.
3. Start managing gym members easily!

---

## ⚠️ Notes | Napomene

- EN: This is a fully client-side project (no server backend).
- SR: Projekat je u potpunosti na strani klijenta (nema servera).
- EN: Data is stored in Local Storage and remains until manually cleared.
- SR: Podaci se čuvaju u Local Storage-u i ostaju dok ih korisnik ne obriše.

---

## 🧑‍💻 Author

Created by [Your Name] — 2025.

---

## 📌 Badges

![Made with HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Made with CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Built with JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Local Storage](https://img.shields.io/badge/Local%20Storage-%23000000.svg?style=for-the-badge&logo=Google-Chrome&logoColor=white)

---
