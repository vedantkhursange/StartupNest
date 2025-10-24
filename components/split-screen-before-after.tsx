"use client"

import { Check, CheckCheck, MessageCircle, Phone, PhoneOff, Mic } from "lucide-react"

export function SplitScreenBeforeAfter() {
  return (
    <section className="py-12 sm:py-16 relative z-10">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="text-center px-6 sm:px-12 pt-8 sm:pt-12 pb-6 sm:pb-8">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            The Cost of Missed Opportunities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
            Stop Losing{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">€200K+</span>{" "}
            Annually
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            See what happens when a customer messages your dealership after hours
          </p>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-8 md:px-12 pb-8">
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200">
            {/* WhatsApp Demo Header */}
            <div className="text-center mb-8 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 mb-4">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span className="text-sm font-semibold text-[#25D366]">WhatsApp Demo</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-2">
                See How Cliste Responds Instantly
              </h3>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-0">
                Watch the difference between traditional auto-replies and AI-powered engagement
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-start">
                {/* Column 1: The Problem */}
                <div className="flex flex-col h-full space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">
                      <span className="text-slate-900">The </span>
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Problem
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">Traditional auto-replies</p>
                  </div>
                  <div className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[360px]">
                    <div className="relative bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border-4 sm:border-8 border-slate-900">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-6 sm:h-7 bg-slate-900 rounded-b-2xl z-10"></div>
                      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative">
                        <div className="bg-[#075E54] px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-slate-300 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs sm:text-sm">
                            JD
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold text-sm sm:text-base">John Doe</div>
                            <div className="text-green-200 text-xs sm:text-sm">Customer</div>
                          </div>
                          <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-white/80" />
                        </div>
                        <div className="bg-[#ECE5DD] p-3 sm:p-4 space-y-2 sm:space-y-2.5 h-[420px] sm:h-[500px]">
                          <div className="flex justify-end">
                            <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
                              <p className="text-sm text-slate-800">
                                Hello, I'm interested in the BMW X5 you have listed
                              </p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-slate-500">19:00</span>
                                <Check className="w-3.5 h-3.5 text-slate-400" />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
                              <p className="text-sm text-slate-800">
                                We're currently closed. Our business hours are 9 AM - 6 PM. We'll get back to you
                                tomorrow!
                              </p>
                              <div className="flex items-center justify-start gap-1 mt-1">
                                <span className="text-xs text-slate-500">19:00</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
                              <p className="text-sm text-slate-800">Hello?</p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-slate-500">19:10</span>
                                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
                              <p className="text-sm text-slate-800">
                                We're currently closed. Our business hours are 9 AM - 6 PM. We'll get back to you
                                tomorrow!
                              </p>
                              <div className="flex items-center justify-start gap-1 mt-1">
                                <span className="text-xs text-slate-500">19:10</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
                              <p className="text-sm text-slate-800">
                                Is anyone there?? Fine I'll take my business elsewhere...
                              </p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-slate-500">19:15</span>
                                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Stats (Desktop Only) */}
                <div className="hidden lg:flex flex-col h-full justify-center space-y-6 py-8">
                  <div className="text-center space-y-2">
                    <div className="text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                      €200K+
                    </div>
                    <p className="text-lg text-slate-600">recovered annually</p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  <div className="text-center space-y-2">
                    <div className="text-5xl font-bold text-slate-900">95%</div>
                    <p className="text-lg text-slate-600">of inquiries happen after hours</p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  <div className="text-center space-y-2">
                    <div className="text-5xl font-bold text-slate-900">2min</div>
                    <p className="text-lg text-slate-600">from inquiry to booking</p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  <div className="text-center space-y-2">
                    <div className="text-5xl font-bold text-slate-900">3x</div>
                    <p className="text-lg text-slate-600">better conversion rate</p>
                  </div>
                </div>

                {/* Column 3: The Solution */}
                <div className="flex flex-col h-full space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">
                      <span className="text-slate-900">The </span>
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Solution
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">AI-powered conversations</p>
                  </div>
                  <div className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[360px]">
                    <div className="relative bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border-4 sm:border-8 border-slate-900">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-6 sm:h-7 bg-slate-900 rounded-b-2xl z-10"></div>
                      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative">
                        <div className="bg-[#075E54] px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-slate-300 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs sm:text-sm">
                            JD
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold text-sm sm:text-base">John Doe</div>
                            <div className="text-green-200 text-xs sm:text-sm">Customer</div>
                          </div>
                          <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-white/80" />
                        </div>
                        <div className="bg-[#ECE5DD] p-3 sm:p-4 space-y-2 sm:space-y-2.5 h-[420px] sm:h-[500px]">
                          <div className="flex justify-end">
                            <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
                              <p className="text-sm text-slate-800">
                                Hello, I'm interested in the BMW X5 you have listed
                              </p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-slate-500">19:00</span>
                                <Check className="w-3.5 h-3.5 text-slate-400" />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm border-2 border-green-200">
                              <p className="text-sm text-slate-800">
                                Hi John! Thanks for your interest in the BMW X5. It's a fantastic vehicle! I'd be happy
                                to help you schedule a test drive. 🚗
                              </p>
                              <div className="flex items-center justify-start gap-1 mt-1">
                                <span className="text-xs text-green-600 font-semibold">AI • 19:00</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
                              <p className="text-sm text-slate-800">That would be great! When are you available?</p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-slate-500">19:01</span>
                                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm border-2 border-green-200">
                              <p className="text-sm text-slate-800">
                                Perfect! I have availability tomorrow at 2:00 PM or Thursday at 10:00 AM. Which works
                                better for you?
                              </p>
                              <div className="flex items-center justify-start gap-1 mt-1">
                                <span className="text-xs text-green-600 font-semibold">AI • 19:01</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[75%] shadow-sm">
                              <p className="text-sm text-slate-800">Tomorrow at 2 PM works perfectly!</p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-slate-500">19:02</span>
                                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-white rounded-lg px-3 py-2 max-w-[75%] shadow-sm border-2 border-green-200">
                              <p className="text-sm text-slate-800">
                                Excellent! I've booked you in for a test drive tomorrow at 2:00 PM with Michael. You'll
                                receive a confirmation email shortly. Looking forward to seeing you! 🎉
                              </p>
                              <div className="flex items-center justify-start gap-1 mt-1">
                                <span className="text-xs text-green-600 font-semibold">AI • 19:02</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Stats - Below Solution */}
                  <div className="lg:hidden mt-8 space-y-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        €200K+
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600">recovered annually</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold text-slate-900">95%</div>
                      <p className="text-xs sm:text-sm text-slate-600">of inquiries happen after hours</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold text-slate-900">2min</div>
                      <p className="text-xs sm:text-sm text-slate-600">from inquiry to booking</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl sm:text-3xl font-bold text-slate-900">3x</div>
                      <p className="text-xs sm:text-sm text-slate-600">better conversion rate</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-8"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Voice Receptionist Section */}
            <div className="mt-16 pt-12 border-t-2 border-slate-200">
              {/* AI Voice Receptionist Header */}
              <div className="text-center mb-8 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600">AI Voice Receptionist</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-2">Never Miss Another Call</h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-0">
                  See how AI handles after-hours calls vs traditional voicemail
                </p>
              </div>

              {/* Voice Receptionist Comparison Grid */}
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-start">
                  {/* Column 1: The Problem - Missed Call */}
                  <div className="flex flex-col h-full space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">
                        <span className="text-slate-900">The </span>
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                          Problem
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">Missed calls & voicemail</p>
                    </div>
                    <div className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[360px]">
                      <div className="relative bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border-4 sm:border-8 border-slate-900">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-6 sm:h-7 bg-slate-900 rounded-b-2xl z-10"></div>
                        <div className="bg-gradient-to-b from-red-50 to-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative">
                          {/* Phone Status Bar */}
                          <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-slate-200">
                            <span className="text-xs text-slate-600">11:47 PM</span>
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-3 border border-slate-400 rounded-sm"></div>
                              <div className="text-xs text-slate-600">100%</div>
                            </div>
                          </div>

                          {/* Missed Call Content */}
                          <div className="p-6 space-y-6 h-[420px] sm:h-[500px] flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                              <PhoneOff className="w-10 h-10 text-red-600" />
                            </div>
                            <div className="text-center space-y-2">
                              <h4 className="text-xl font-bold text-slate-900">Missed Call</h4>
                              <p className="text-lg text-slate-700">John Smith</p>
                              <p className="text-sm text-slate-500">(555) 123-4567</p>
                              <p className="text-xs text-red-600 font-medium">After Hours - 11:47 PM</p>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0">
                                  <Mic className="w-4 h-4 text-red-700" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs font-semibold text-red-900 mb-1">Voicemail</p>
                                  <p className="text-xs text-slate-600 italic">
                                    "Hi, I'm interested in the BMW X5... I'll try calling another dealership..."
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-center text-slate-500 italic">Customer never called back</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Stats (Desktop Only) */}
                  <div className="hidden lg:flex flex-col h-full justify-center space-y-6 py-8">
                    <div className="text-center space-y-2">
                      <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        87%
                      </div>
                      <p className="text-lg text-slate-600">of calls after hours</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    <div className="text-center space-y-2">
                      <div className="text-5xl font-bold text-slate-900">3min</div>
                      <p className="text-lg text-slate-600">average call handling</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    <div className="text-center space-y-2">
                      <div className="text-5xl font-bold text-slate-900">100%</div>
                      <p className="text-lg text-slate-600">call answer rate</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                    <div className="text-center space-y-2">
                      <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        €150K+
                      </div>
                      <p className="text-lg text-slate-600">recovered annually</p>
                    </div>
                  </div>

                  {/* Column 3: The Solution - AI Answered */}
                  <div className="flex flex-col h-full space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1">
                        <span className="text-slate-900">The </span>
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                          Solution
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">AI answers every call</p>
                    </div>
                    <div className="relative mx-auto w-[280px] sm:w-[320px] lg:w-[360px]">
                      <div className="relative bg-slate-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border-4 sm:border-8 border-slate-900">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-6 sm:h-7 bg-slate-900 rounded-b-2xl z-10"></div>
                        <div className="bg-gradient-to-b from-green-50 to-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative">
                          {/* Phone Status Bar */}
                          <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-slate-200">
                            <span className="text-xs text-slate-600">11:47 PM</span>
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-3 border border-slate-400 rounded-sm"></div>
                              <div className="text-xs text-slate-600">100%</div>
                            </div>
                          </div>

                          {/* Call in Progress Content */}
                          <div className="p-6 space-y-6 h-[420px] sm:h-[500px] flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                              <Phone className="w-10 h-10 text-green-600" />
                            </div>
                            <div className="text-center space-y-2">
                              <h4 className="text-xl font-bold text-green-600">Call in Progress</h4>
                              <p className="text-lg text-slate-700">John Smith</p>
                              <p className="text-sm text-slate-500">(555) 123-4567</p>
                              <p className="text-xs text-green-600 font-medium">AI Receptionist • 2:34</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <p className="text-xs font-semibold text-green-900">Live Notes</p>
                              </div>
                              <div className="space-y-2 text-xs text-slate-700">
                                <p>
                                  <span className="font-semibold">Customer:</span> John Smith
                                </p>
                                <p>
                                  <span className="font-semibold">Interest:</span> BMW X5
                                </p>
                                <p>
                                  <span className="font-semibold">Appointment:</span> Tomorrow 2:00 PM
                                </p>
                                <p>
                                  <span className="font-semibold">Status:</span>{" "}
                                  <span className="text-green-600">✓ Booked</span>
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-center text-green-600 font-medium">
                              Test drive scheduled successfully
                            </p>
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
      </div>
    </section>
  )
}
