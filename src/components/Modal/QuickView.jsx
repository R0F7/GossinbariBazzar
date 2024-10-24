import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import { useState } from 'react'

const QuickView = ({ isOpen, onClose, title, description, message }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <Description>{description}</Description>
            <p>{message}</p>
            <div className="flex gap-4">
              <button onClick={onClose}>Cancel</button>
              <button onClick={onClose}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default QuickView;
