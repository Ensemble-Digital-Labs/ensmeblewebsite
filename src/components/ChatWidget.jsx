import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

/** Floating CTA — links to contact (replace with live chat when available). */
function ChatWidget() {
  return (
    <Link
      to="/contact"
      className="pointer-events-auto fixed bottom-6 right-6 z-[999989] flex h-14 w-14 items-center justify-center rounded-full bg-[#FFC145] text-[#0B0B0B] shadow-[0_0_24px_rgba(255,193,69,0.45)] transition hover:brightness-105 md:bottom-8 md:right-8 md:h-16 md:w-16"
      aria-label="Contact us"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.75} />
    </Link>
  )
}

export default ChatWidget
