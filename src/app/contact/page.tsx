'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { Clock, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log(formData)
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Get In Touch With Us</h1>
          <p className="text-gray-600">
            Let know about your queries, feedback or any suggestions. We are here to help you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-[#007580] mt-1" />
                <div className="ml-4">
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-gray-600">
                    5-H Manzoor Colony, Mehmoodabad. Karachi,<br />
                    Sindh, Pakistan 75640
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-6 h-6 text-[#007580] mt-1" />
                <div className="ml-4">
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">
                    Mobile: (+92) 123-456-789<br />
                    Hotline: (+92) 123-456-789
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-[#007580] mt-1" />
                <div className="ml-4">
                  <h3 className="font-semibold mb-2">Working Time</h3>
                  <p className="text-gray-600">
                    Monday-Friday: 9:00 - 22:00<br />
                    Saturday-Sunday: 9:00 - 21:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#007580]"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#007580] text-white px-6 py-3 rounded-md hover:bg-[#1b585e] transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

