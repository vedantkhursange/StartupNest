"use client"
import { Phone, MessageCircle, Calendar, Wrench, MessageSquare, Car, X, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function ProblemSolutionComparison() {
  const [isVisible, setIsVisible] = useState(false)
  const [showCircle, setShowCircle] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowCircle(true), 800)
        }
      },
      { threshold: 0.1 },
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

  const comparisons = [
    {
      icon: Phone,
      channel: "Phone Calls",
      problem: "70% of calls go to voicemail",
      solution: "95% of calls answered instantly",
    },
    {
      icon: MessageSquare,
      channel: "Website Chat",
      problem: "4+ hour response times",
      solution: "Instant reply",
    },
    {
      icon: MessageCircle,
      channel: "Social Messaging",
      problem: "4+ hour response times",
      solution: "Instant replies on all socials",
    },
    {
      icon: Car,
      channel: "Car Viewings",
      problem: "Manual scheduling, missed opportunities",
      solution: "Books viewings via phone calls, socials or website chat",
    },
    {
      icon: Calendar,
      channel: "Service Bookings",
      problem: "Delayed service scheduling",
      solution: "Instant booking and scheduling",
    },
    {
      icon: Wrench,
      channel: "Parts Inquiries",
      problem: "Slow parts quotes and inquiries",
      solution: "Instantly checks stock level & gives price",
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24">
      <div
        className={`max-w-6xl mx-auto px-4 mb-12 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-red-400 text-sm font-semibold uppercase tracking-wider">
            The Cost of Missed Opportunities
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
          Stop Losing{" "}
          <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
            €200K+
          </span>{" "}
          Annually
        </h2>
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
          See what happens when a customer messages your dealership after hours
        </p>
      </div>

      <div
        className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
          {/* Desktop Table */}
          <div className="hidden md:block relative backdrop-blur-sm bg-slate-50/50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-6 px-6 text-slate-700 font-semibold text-sm uppercase tracking-wider">
                      Channel
                    </th>
                    <th className="text-left py-6 px-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 border-l-4 border-red-500">
                        <span className="text-red-600 font-semibold">Without Cliste</span>
                      </div>
                    </th>
                    <th className="text-left py-6 px-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border-l-4 border-green-500">
                        <span className="text-green-600 font-semibold">With Cliste</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-4 h-4 text-slate-600" />
                          </div>
                          <span className="text-slate-800 font-medium text-sm">{item.channel}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{item.problem}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{item.solution}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="py-6 px-6 text-slate-700 font-semibold text-sm uppercase tracking-wider">
                      Annual Impact
                    </td>
                    <td className="py-10 px-12">
                      <div className="relative inline-block">
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                          €200K+ Lost
                        </div>
                        {showCircle && (
                          <svg
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            width="220"
                            height="70"
                            viewBox="0 0 220 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="110"
                              cy="35"
                              rx="105"
                              ry="30"
                              stroke="url(#redGradient)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              fill="none"
                              strokeDasharray="600"
                              strokeDashoffset="600"
                              style={{
                                animation: "drawCircle 1.5s ease-out forwards",
                              }}
                            />
                            <defs>
                              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
                              </linearGradient>
                            </defs>
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="py-10 px-12">
                      <div className="relative inline-block">
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                          €200K+ Saved
                        </div>
                        {showCircle && (
                          <svg
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            width="220"
                            height="70"
                            viewBox="0 0 220 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="110"
                              cy="35"
                              rx="105"
                              ry="30"
                              stroke="url(#greenGradient)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              fill="none"
                              strokeDasharray="600"
                              strokeDashoffset="600"
                              style={{
                                animation: "drawCircle 1.5s ease-out forwards",
                              }}
                            />
                            <defs>
                              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                              </linearGradient>
                            </defs>
                          </svg>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden"
              >
                <div className="flex items-center gap-3 p-4 border-b border-slate-200 bg-slate-50">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-slate-800 font-semibold text-sm">{item.channel}</span>
                </div>

                <div className="grid grid-cols-2 divide-x divide-slate-200">
                  <div className="p-4 bg-red-50/50">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-relaxed">{item.problem}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50/50">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-relaxed">{item.solution}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="backdrop-blur-sm bg-slate-50/50 rounded-xl border border-slate-200 overflow-hidden mt-6">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <span className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Annual Impact</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-200">
                <div className="p-4 py-8 bg-red-50/50 flex items-center justify-center">
                  <div className="relative inline-block">
                    <div className="text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent whitespace-nowrap">
                      €200K+ Lost
                    </div>
                    {showCircle && (
                      <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        width="150"
                        height="55"
                        viewBox="0 0 150 55"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse
                          cx="75"
                          cy="27.5"
                          rx="70"
                          ry="23"
                          stroke="url(#redGradientMobile)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                          strokeDasharray="500"
                          strokeDashoffset="500"
                          style={{
                            animation: "drawCircle 1.5s ease-out forwards",
                          }}
                        />
                        <defs>
                          <linearGradient id="redGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>
                </div>
                <div className="p-4 py-8 bg-green-50/50 flex items-center justify-center">
                  <div className="relative inline-block">
                    <div className="text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent whitespace-nowrap">
                      €200K+ Saved
                    </div>
                    {showCircle && (
                      <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        width="150"
                        height="55"
                        viewBox="0 0 150 55"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse
                          cx="75"
                          cy="27.5"
                          rx="70"
                          ry="23"
                          stroke="url(#greenGradientMobile)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          fill="none"
                          strokeDasharray="500"
                          strokeDashoffset="500"
                          style={{
                            animation: "drawCircle 1.5s ease-out forwards",
                          }}
                        />
                        <defs>
                          <linearGradient id="greenGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm font-semibold uppercase tracking-wider">WhatsApp Demo</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">See How Cliste Responds Instantly</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Watch the difference between traditional auto-replies and AI-powered engagement
              </p>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Phone Frame */}
                <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-8 border-slate-800">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-10"></div>

                  {/* Screen */}
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden h-[600px]">
                    {/* WhatsApp Header */}
                    <div className="bg-green-600 px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Car className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Cliste AI</div>
                        <div className="text-green-100 text-xs">Online</div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 space-y-3 bg-slate-50 h-full overflow-y-auto">
                      {/* Customer Message */}
                      <div className="flex justify-end">
                        <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                          <p className="text-sm">Hello, I'm interested in the BMW X5 you have listed</p>
                          <p className="text-xs text-green-100 mt-1">19:00</p>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] shadow-sm">
                          <p className="text-sm text-slate-800">
                            Hi John! Thanks for your interest in the BMW X5. It's a fantastic vehicle!
                          </p>
                          <p className="text-sm text-slate-800 mt-2">
                            We have it in stock at €68,900. Would you like to schedule a test drive?
                          </p>
                          <p className="text-xs text-slate-500 mt-1">19:00</p>
                        </div>
                      </div>

                      {/* Customer Message */}
                      <div className="flex justify-end">
                        <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                          <p className="text-sm">Yes please! Tomorrow afternoon?</p>
                          <p className="text-xs text-green-100 mt-1">19:01</p>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] shadow-sm">
                          <p className="text-sm text-slate-800">Perfect! I have these slots available tomorrow:</p>
                          <p className="text-sm text-slate-800 mt-2">• 2:00 PM</p>
                          <p className="text-sm text-slate-800">• 3:30 PM</p>
                          <p className="text-sm text-slate-800">• 5:00 PM</p>
                          <p className="text-xs text-slate-500 mt-1">19:01</p>
                        </div>
                      </div>

                      {/* Customer Message */}
                      <div className="flex justify-end">
                        <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                          <p className="text-sm">3:30 PM works great!</p>
                          <p className="text-xs text-green-100 mt-1">19:02</p>
                        </div>
                      </div>

                      {/* AI Response */}
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] shadow-sm">
                          <p className="text-sm text-slate-800">
                            ✅ Excellent! Your test drive is booked for tomorrow at 3:30 PM.
                          </p>
                          <p className="text-sm text-slate-800 mt-2">
                            I'll send you our address and a calendar invite. Looking forward to seeing you! 🚗
                          </p>
                          <p className="text-xs text-slate-500 mt-1">19:02</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
