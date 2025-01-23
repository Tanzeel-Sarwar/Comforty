import { defineType } from "sanity"

export const adminUserSchema = defineType({
  name: "adminUser",
  title: "Admin User",
  type: "document",
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "password",
      title: "Password",
      type: "string",
    },
    {
      name: "resetToken",
      title: "Reset Token",
      type: "string",
    },
    {
      name: "resetTokenExpiry",
      title: "Reset Token Expiry",
      type: "datetime",
    },
  ],
})

