# Gym Membership Management Web App

[Demo Link](https://gym-membership-management.vercel.app/)

## Purpose 🏋🏼

I'm now playing at a gym that keeps track of memberships on many sheets of paper. It takes a while to find the relevant document each time we need to make a new payment. As a student of information technology, I would like to help solve this issue by creating a web application that satisfies their needs.

----

## Features 🚀

- Basic **CRUD** features including registering new members, updating current payment type, creating and reading monthly body measurements, deleting existing members
- Expired date is automatically calculated based on the current date and payment types (1 month, 3 months, ...)

----

##  Tech stacks ✨

- Next JS 14 (App Router)
- Typescript
- MongoDB
- react-hook-form
- Tailwind, ShadCN
- Clerk Authentication for Google Auth

----

## Key Points 🔑

- I am using both **route handlers** and **server actions** for CRUD features
- For client side, data state is controlled with **useReducer** hook in the Table Component
- For form components, states are controlled with **react-hook-form**, schemas are defined with **zod**

---

## Future Plan 🔮

All of the functionality in this app, which is in Version One, are CRUD functions. Charts and graphs showing the progression of physically growth will be published in the future. Additionally, the app is divided into admin and users. Users can monitor their body progress, exercises, and the quantity of weights they played with in the previous week, such as 1 kg or 2 kg, while the admin can control the management procedures.