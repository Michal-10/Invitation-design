
import { useState } from "react"
import { X, Send, Mail } from "lucide-react"
import { Dialog, DialogContent, Input, Button, TextareaAutosize as Textarea } from "@mui/material"

// interface ContactDialogProps {
//   onClose: () => void
// }

export default () => {

    const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [sending, setSending] = useState(false)

  const handleSubmit = () => {
    // Here you would typically send the contact form data to your API
    setSending(true)

    // Simulate API call
    setTimeout(() => {
      setSending(false)
      console.log("Sending contact form:", { name, email, phone, message })

      toast({
        title: "הודעה נשלחה",
        description: "תודה על פנייתך! נחזור אליך בהקדם.",
      })

      setOpen(false)
    }, 1500)
  }
  const onClose = () => {
    
  }

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border-none">
        <div className="relative">
          <button onClick={onClose} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 z-10">
            <X className="h-5 w-5" />
          </button>

          <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-right">צור קשר</h2>
              <p className="text-white/80 text-right">יש לך שאלות? נשמח לעזור!</p>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">טלפון</label>
                  <Input
                    placeholder="מספר טלפון"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">שם מלא</label>
                  <Input
                    placeholder="השם שלך"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-right"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-right block">כתובת אימייל</label>
                <Input
                  placeholder="האימייל שלך"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-right block">הודעה</label>
                <Textarea
                  placeholder="כתוב את ההודעה שלך כאן..."
                  minRows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="text-right resize-none"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={sending}
                className="w-full bg-primary hover:bg-primary-dark rounded-xl py-6 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>שולח...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>שלח הודעה</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
