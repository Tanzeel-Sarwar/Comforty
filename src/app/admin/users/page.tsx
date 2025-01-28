"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
// import Loader from "../Loader" //Removed Loader import

interface User {
  _id: string
  username: string
  email: string
}

export default function UsersPage() {
  // const [users, setUsers] = useState<User[]>([]) //Removed useState for users
  const users: User[] = [
    { _id: "1", username: "john_doe", email: "john@example.com" },
    { _id: "2", username: "jane_smith", email: "jane@example.com" },
    { _id: "3", username: "bob_johnson", email: "bob@example.com" },
  ]
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }
  }, [user, router])

  //Removed useEffect hook that fetches users data

  if (!user) {
    return null
  }

  //Removed the isLoading check and Loader component

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button asChild>
          <Link href="/admin/users/new">Add New User</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link href={`/admin/users/${user._id}`}>Edit</Link>
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

