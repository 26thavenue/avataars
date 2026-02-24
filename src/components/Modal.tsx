import { useState } from 'react'

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
            <p className="text-lg">Modal Content</p>
            <button onClick={() => setIsOpen(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Close Modal</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
