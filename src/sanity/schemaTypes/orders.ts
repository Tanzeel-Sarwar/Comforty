import { defineType } from "sanity"

export const orderSchema = defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "orderNumber",
      title: "Order Number",
      type: "string",
    },
    {
      name: "customer",
      title: "Customer",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "email", type: "string", title: "Email" },
        { name: "address", type: "text", title: "Address" },
      ],
    },
    {
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "products" }],
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
            {
              name: "price",
              title: "Price at Time of Order",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    },
    {
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
          { title: "Refunded", value: "refunded" },
        ],
      },
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
    {
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    },
  ],
})

