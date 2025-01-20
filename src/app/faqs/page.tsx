'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { Plus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What types of chairs do you offer?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veriatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"
  },
  {
    question: "How can we get in touch with you?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veriatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"
  },
  {
    question: "Do your chairs come with a warranty?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veriatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"
  },
  {
    question: "What will be delivered? And When?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veriatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"
  },
  {
    question: "Can I try a chair before purchasing?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veriatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"
  },
  {
    question: "How do I clean and maintain my Comforty chair?",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero veriatis enim repellat optio natus eum delectus deserunt, odit expedita eos molestiae ipsa totam quidem?"
  }
] 

  export default function Page() {
    const [openItems, setOpenItems] = useState<number[]>([])
  
    const toggleItem = (index: number) => {
      setOpenItems(current => 
        current.includes(index) 
          ? current.filter(item => item !== index)
          : [...current, index]
      )
    }

  return (
    <Layout>
            <div className="max-w-6xl mx-auto my-14">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Questions Looks Here
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors duration-300"
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <Plus 
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                    openItems.includes(index) ? 'rotate-45' : ''
                  }`}
                />
              </button>
              <div 
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openItems.includes(index) 
                    ? 'max-h-48 pb-6 opacity-100' 
                    : 'max-h-0 overflow-hidden opacity-0'
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

