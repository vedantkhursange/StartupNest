"use client"

import { useEffect, useRef, useState } from "react"

const AnimatedChatDemo = ({ isActive }: { isActive: boolean }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", isBot: true, visible: false },
    { text: "I'd like to book an appointment", isBot: false, visible: false },
    { text: "Perfect! I can help with that. What service are you interested in?", isBot: true, visible: false },
  ])
  const [typingDots, setTypingDots] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const scenarios = [
      [
        { text: "Hi! How can I help you today?", isBot: true },
        { text: "I'd like to book an appointment", isBot: false },
        { text: "Perfect! I can help with that. What service are you interested in?", isBot: true },
      ],
      [
        { text: "Hello! I'm available 24/7 to assist you.", isBot: true },
        { text: "Do you have weekend availability?", isBot: false },
        { text: "I can check our weekend slots for you.", isBot: true },
      ],
      [
        { text: "Good evening! How may I assist you?", isBot: true },
        { text: "I need help with pricing", isBot: false },
        { text: "I'd be happy to provide pricing information right away!", isBot: true },
      ],
    ]

    const currentScenario = scenarios[cycleCount % scenarios.length]
    setMessages(currentScenario.map((msg) => ({ ...msg, visible: false })))

    const timer = setTimeout(() => {
      setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i === 0 })))

      setTimeout(() => {
        setMessages((prev) => prev.map((msg, i) => ({ ...msg, visible: i <= 1 })))

        setTimeout(() => {
          const typingInterval = setInterval(() => {
            setTypingDots((prev) => (prev + 1) % 4)
          }, 500)

          setTimeout(() => {
            clearInterval(typingInterval)
            setMessages((prev) => prev.map((msg) => ({ ...msg, visible: true })))

            setTimeout(() => {
              setCycleCount((prev) => prev + 1)
            }, 3000)
          }, 2000)
        }, 1000)
      }, 1500)
    }, 500)

    return () => clearTimeout(timer)
  }, [isActive, cycleCount])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32 overflow-hidden relative">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-slate-500 font-medium">24/7</span>
      </div>
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.isBot ? "justify-start" : "justify-end"} transition-all duration-500 ${
              msg.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <div
              className={`max-w-[80%] px-3 py-1.5 rounded-full text-xs ${
                msg.isBot ? "bg-slate-200 text-slate-700" : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typingDots > 0 && (
          <div className="flex justify-start">
            <div className="bg-slate-200 px-3 py-1.5 rounded-full">
              <div className="flex space-x-1">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className={`w-1 h-1 bg-slate-500 rounded-full transition-opacity duration-300 ${
                      typingDots >= dot ? "opacity-100" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const AnimatedPhoneDemo = ({ isActive }: { isActive: boolean }) => {
  const [callState, setCallState] = useState<"idle" | "ringing" | "answered">("idle")
  const [callCount, setCallCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const cycleCall = () => {
      setCallState("ringing")
      setTimeout(() => {
        setCallState("answered")
        setTimeout(() => {
          setCallState("idle")
          setCallCount((prev) => prev + 1)
          setTimeout(cycleCall, 2000)
        }, 2000)
      }, 2000)
    }

    const timer = setTimeout(cycleCall, 800)
    return () => clearTimeout(timer)
  }, [isActive])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32 flex items-center justify-center relative">
      <div className="absolute top-2 right-2 text-xs text-slate-500 font-medium">Calls: {callCount + 1}</div>
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-full bg-green-500 flex items-center justify-center transition-all duration-500 ${
            callState === "ringing" ? "animate-pulse scale-110" : ""
          } ${callState === "answered" ? "bg-blue-500" : ""}`}
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </div>
        {callState === "ringing" && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping animation-delay-75"></div>
          </>
        )}
        {callState === "answered" && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-100 px-2 py-1 rounded text-xs text-blue-700 whitespace-nowrap">Call answered</div>
          </div>
        )}
      </div>
    </div>
  )
}

const AnimatedCalendarDemo = ({ isActive }: { isActive: boolean }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const timer = setTimeout(() => {
      setSelectedDate(15)
      setTimeout(() => setBooked(true), 1500)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isActive])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32">
      <div className="grid grid-cols-7 gap-1 text-xs">
        {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`w-4 h-4 flex items-center justify-center rounded transition-all duration-300 ${
              day === selectedDate
                ? booked
                  ? "bg-green-500 text-white scale-110"
                  : "bg-blue-500 text-white scale-110"
                : day % 7 === 0 || day % 6 === 0
                  ? "bg-slate-200 text-slate-400"
                  : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      {booked && (
        <div className="mt-2 text-xs text-green-600 font-medium animate-fade-in">✓ Appointment booked for the 15th</div>
      )}
    </div>
  )
}

const AnimatedEmailDemo = ({ isActive }: { isActive: boolean }) => {
  const [emails, setEmails] = useState([
    { subject: "Service inquiry", status: "unread" },
    { subject: "Appointment request", status: "unread" },
    { subject: "Quote needed", status: "unread" },
  ])

  useEffect(() => {
    if (!isActive) return

    emails.forEach((_, index) => {
      setTimeout(
        () => {
          setEmails((prev) => prev.map((email, i) => (i === index ? { ...email, status: "replied" } : email)))
        },
        1000 + index * 800,
      )
    })
  }, [isActive])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32 overflow-hidden">
      <div className="space-y-2">
        {emails.map((email, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-2 rounded transition-all duration-500 ${
              email.status === "replied" ? "bg-green-100" : "bg-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${email.status === "replied" ? "bg-green-500" : "bg-blue-500"}`} />
            <span className="text-xs text-slate-700 flex-1">{email.subject}</span>
            {email.status === "replied" && (
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const AnimatedLeadsDemo = ({ isActive }: { isActive: boolean }) => {
  const [leads, setLeads] = useState([
    { name: "Sarah M.", score: 0, qualified: false },
    { name: "John D.", score: 0, qualified: false },
    { name: "Mike R.", score: 0, qualified: false },
  ])

  useEffect(() => {
    if (!isActive) return

    leads.forEach((_, index) => {
      setTimeout(() => {
        const targetScore = [85, 92, 78][index]
        const interval = setInterval(() => {
          setLeads((prev) =>
            prev.map((lead, i) => {
              if (i === index && lead.score < targetScore) {
                const newScore = Math.min(lead.score + 5, targetScore)
                return {
                  ...lead,
                  score: newScore,
                  qualified: newScore >= 80,
                }
              }
              return lead
            }),
          )
        }, 50)

        setTimeout(() => clearInterval(interval), 1000)
      }, index * 600)
    })
  }, [isActive])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32 overflow-hidden">
      <div className="space-y-2">
        {leads.map((lead, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-slate-700 w-12">{lead.name}</span>
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  lead.qualified ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${lead.score}%` }}
              />
            </div>
            <span className="text-xs font-medium w-8">{lead.score}%</span>
            {lead.qualified && <span className="text-xs text-green-600">✓</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const AnimatedIntegrationsDemo = ({ isActive }: { isActive: boolean }) => {
  const [connections, setConnections] = useState([
    { name: "CRM", connected: false },
    { name: "WhatsApp", connected: false },
    { name: "Calendar", connected: false },
    { name: "Email", connected: false },
  ])

  useEffect(() => {
    if (!isActive) return

    connections.forEach((_, index) => {
      setTimeout(
        () => {
          setConnections((prev) => prev.map((conn, i) => (i === index ? { ...conn, connected: true } : conn)))
        },
        500 + index * 400,
      )
    })
  }, [isActive])

  return (
    <div className="bg-slate-50 rounded-lg p-4 h-32">
      <div className="grid grid-cols-2 gap-2">
        {connections.map((conn, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-2 rounded transition-all duration-500 ${
              conn.connected ? "bg-green-100" : "bg-white"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                conn.connected ? "bg-green-500" : "bg-slate-300"
              }`}
            />
            <span className="text-xs text-slate-700">{conn.name}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs text-slate-500">{connections.filter((c) => c.connected).length}/4 connected</div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "24/7 AI Chat Support",
    description:
      "Intelligent chatbots that handle customer inquiries, answer questions, and capture leads across your website and social channels.",
    demo: AnimatedChatDemo,
    size: "large",
  },
  {
    title: "AI Phone Receptionist",
    description:
      "Professional AI voice assistant that answers calls, takes messages, and books appointments when you're busy or closed.",
    demo: AnimatedPhoneDemo,
    size: "medium",
  },
  {
    title: "Smart Appointment Booking",
    description:
      "Automated scheduling system that checks availability, books appointments, and sends confirmations without human intervention.",
    demo: AnimatedCalendarDemo,
    size: "medium",
  },
  {
    title: "Email Response Automation",
    description:
      "AI-powered email assistant that responds to inquiries, provides information, and forwards complex queries to your team.",
    demo: AnimatedEmailDemo,
    size: "large",
  },
  {
    title: "Lead Qualification & Handoff",
    description:
      "Intelligent system that qualifies prospects, gathers key information, and seamlessly hands off hot leads to your sales team.",
    demo: AnimatedLeadsDemo,
    size: "medium",
  },
  {
    title: "Multi-Platform Integration",
    description:
      "Connect with your existing tools including CRM, calendar, WhatsApp, SMS, and more for a unified customer experience.",
    demo: AnimatedIntegrationsDemo,
    size: "medium",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeDemo, setActiveDemo] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("[v0] Features Section is now visible") // Added debug log
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative z-10">
      <div className="bg-white rounded-t-[3rem] pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-slate-200 rounded-full animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div
            className={`text-center mb-12 sm:mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7H1V9H3V15H1V17H3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V17H23V15H21V9H23ZM19 9V15H5V9H19ZM7.5 11.5C7.5 10.67 8.17 10 9 10S10.5 10.67 10.5 11.5 9.83 13 9 13 7.5 12.33 7.5 11.5ZM13.5 11.5C13.5 10.67 14.17 10 15 10S16.5 10.67 16.5 11.5 15.83 13 15 13 13.5 12.33 13.5 11.5ZM12 16C13.11 16 14.08 16.59 14.71 17.5H9.29C9.92 16.59 10.89 16 12 16Z" />
              </svg>
              AI Working 24/7 - Never Miss a Lead
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance mb-4 sm:mb-6">
              Your AI Team{" "}
              <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                Never Sleeps
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Watch our AI handle real customer interactions around the clock, automatically qualifying leads and
              booking appointments while you focus on growing your business.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group transition-all duration-1000 ${feature.size === "large" ? "md:col-span-2" : ""}`}
                style={{
                  transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
                }}
                onMouseEnter={() => setActiveDemo(index)}
                onMouseLeave={() => setActiveDemo(null)}
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-slate-300">
                  <div className="mb-6">
                    <feature.demo isActive={activeDemo === index || isVisible} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
