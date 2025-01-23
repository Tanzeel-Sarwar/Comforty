import type { SchemaTypeDefinition } from "sanity"
import { productSchema } from "./products"
import { categorySchema } from "./categories"
import { orderSchema } from "./orders"
import { adminUserSchema } from "./adminUser"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema, orderSchema, adminUserSchema],
}

