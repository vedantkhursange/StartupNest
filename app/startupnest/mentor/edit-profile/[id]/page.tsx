// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
// import { useRouter, useParams } from "next/navigation"
// import Aurora from "@/components/Aurora"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"

// interface Profile {
//   _id: string
//   category: string
//   description: string
//   fundingLimit: number
//   avgEquityExpectation: number
//   targetIndustry: string
//   preferredStage: string
// }

// export default function EditProfile() {
//   const router = useRouter()
//   const params = useParams()
//   const profileId = params.id as string

//   const [formData, setFormData] = useState<Profile | null>(null)
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [showAlert, setShowAlert] = useState(false)
//   const [alertMessage, setAlertMessage] = useState("")
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSaving, setIsSaving] = useState(false)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     const role = localStorage.getItem("role")

//     if (!token || role !== "Mentor") {
//       router.push("/startupnest/login")
//       return
//     }

//     fetchProfile()
//   }, [router, profileId])

//   const fetchProfile = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/startupProfile/getStartupProfileById/${profileId}`)
//       const data = await response.json()
//       setFormData(data)
//     } catch (error) {
//       console.error("Error fetching profile:", error)
//       setAlertMessage("Failed to load profile")
//       setShowAlert(true)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}

//     if (!formData?.category) newErrors.category = "Category is required"
//     if (!formData?.description) newErrors.description = "Description is required"
//     if (!formData?.fundingLimit) newErrors.fundingLimit = "Funding limit is required"
//     else if (isNaN(formData.fundingLimit)) newErrors.fundingLimit = "Must be a number"
//     if (!formData?.avgEquityExpectation) newErrors.avgEquityExpectation = "Equity expectation is required"
//     else if (isNaN(formData.avgEquityExpectation)) newErrors.avgEquityExpectation = "Must be a number"
//     if (!formData?.targetIndustry) newErrors.targetIndustry = "Target industry is required"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm() || !formData) return

//     setIsSaving(true)
//     try {
//       const token = localStorage.getItem("token")

//       const response = await fetch(`http://localhost:8080/api/startupProfile/updateStartupProfile/${profileId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         setAlertMessage("Profile updated successfully!")
//         setShowAlert(true)
//         setTimeout(() => {
//           router.push("/startupnest/mentor/view-profiles")
//         }, 1500)
//       } else {
//         const data = await response.json()
//         setAlertMessage(data.message || "Failed to update profile")
//         setShowAlert(true)
//       }
//     } catch (error) {
//       setAlertMessage("An error occurred. Please try again.")
//       setShowAlert(true)
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-foreground">Loading profile...</div>
//       </div>
//     )
//   }

//   if (!formData) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-foreground">Profile not found</div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background overflow-hidden">
//       <div className="fixed inset-0 w-full h-full">
//         <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
//       </div>

//       <div className="relative z-10">
//         <nav className="border-b border-border/40 backdrop-blur-md bg-background/30 sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//             <button
//               onClick={() => router.push("/startupnest/mentor/view-profiles")}
//               className="text-foreground hover:text-primary transition"
//             >
//               ← Back
//             </button>
//             <div className="text-2xl font-bold text-primary">Edit Startup Profile</div>
//             <div></div>
//           </div>
//         </nav>

//         <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="bg-card/50 backdrop-blur border border-border/40 rounded-lg p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Category <span className="text-destructive">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
//                 {errors.category && <p className="text-destructive text-sm mt-1">{errors.category}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Description <span className="text-destructive">*</span>
//                 </label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   rows={4}
//                 />
//                 {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Funding Limit <span className="text-destructive">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.fundingLimit}
//                     onChange={(e) => setFormData({ ...formData, fundingLimit: Number(e.target.value) })}
//                     className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                   {errors.fundingLimit && <p className="text-destructive text-sm mt-1">{errors.fundingLimit}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Avg Equity Expectation (%) <span className="text-destructive">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.avgEquityExpectation}
//                     onChange={(e) => setFormData({ ...formData, avgEquityExpectation: Number(e.target.value) })}
//                     className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                   />
//                   {errors.avgEquityExpectation && (
//                     <p className="text-destructive text-sm mt-1">{errors.avgEquityExpectation}</p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Target Industry <span className="text-destructive">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.targetIndustry}
//                   onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
//                   className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
//                 {errors.targetIndustry && <p className="text-destructive text-sm mt-1">{errors.targetIndustry}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Preferred Stage <span className="text-destructive">*</span>
//                 </label>
//                 <select
//                   value={formData.preferredStage}
//                   onChange={(e) => setFormData({ ...formData, preferredStage: e.target.value })}
//                   className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 >
//                   <option value="idea">Idea</option>
//                   <option value="MVP">MVP</option>
//                   <option value="pre-revenue">Pre-Revenue</option>
//                   <option value="scaling">Scaling</option>
//                   <option value="established">Established</option>
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSaving}
//                 className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50"
//               >
//                 {isSaving ? "Updating..." : "Update Profile"}
//               </button>
//             </form>
//           </div>
//         </section>
//       </div>

//       <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
//         <AlertDialogContent>
//           <AlertDialogTitle>Status</AlertDialogTitle>
//           <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
//           <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Aurora from "@/components/Aurora"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Profile {
  _id: string
  category: string
  description: string
  fundingLimit: number
  avgEquityExpectation: number
  targetIndustry: string
  preferredStage: string
}

export default function EditProfile() {
  const router = useRouter()
  const params = useParams()
  const profileId = params.id as string

  const [formData, setFormData] = useState<Profile | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token || role !== "Mentor") {
      router.push("/startupnest/login")
      return
    }

    fetchProfile()
  }, [router, profileId])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/api/startupProfile/getStartupProfileById/${profileId}`)
      const data = await response.json()
      setFormData(data)
    } catch (error) {
      console.error("Error fetching profile:", error)
      setAlertMessage("Failed to load profile")
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData?.category) newErrors.category = "Category is required"
    if (!formData?.description) newErrors.description = "Description is required"
    if (!formData?.fundingLimit) newErrors.fundingLimit = "Funding limit is required"
    else if (isNaN(formData.fundingLimit)) newErrors.fundingLimit = "Must be a number"
    if (!formData?.avgEquityExpectation) newErrors.avgEquityExpectation = "Equity expectation is required"
    else if (isNaN(formData.avgEquityExpectation)) newErrors.avgEquityExpectation = "Must be a number"
    if (!formData?.targetIndustry) newErrors.targetIndustry = "Target industry is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !formData) return

    setIsSaving(true)
    try {
      const token = localStorage.getItem("token")

      const response = await fetch(`${API_URL}/api/startupProfile/updateStartupProfile/${profileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setAlertMessage("Profile updated successfully!")
        setShowAlert(true)
        setTimeout(() => {
          router.push("/startupnest/mentor/view-profiles")
        }, 1500)
      } else {
        const data = await response.json()
        setAlertMessage(data.message || "Failed to update profile")
        setShowAlert(true)
      }
    } catch (error) {
      setAlertMessage("An error occurred. Please try again.")
      setShowAlert(true)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading profile...</div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Profile not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
      </div>

      <div className="relative z-10">
        <nav className="border-b border-border/40 backdrop-blur-md bg-background/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => router.push("/startupnest/mentor/view-profiles")}
              className="text-foreground hover:text-primary transition"
            >
              ← Back
            </button>
            <div className="text-2xl font-bold text-primary">Edit Startup Profile</div>
            <div></div>
          </div>
        </nav>

        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-card/50 backdrop-blur border border-border/40 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.category && <p className="text-destructive text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
                {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Funding Limit <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.fundingLimit}
                    onChange={(e) => setFormData({ ...formData, fundingLimit: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.fundingLimit && <p className="text-destructive text-sm mt-1">{errors.fundingLimit}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Avg Equity Expectation (%) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.avgEquityExpectation}
                    onChange={(e) => setFormData({ ...formData, avgEquityExpectation: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.avgEquityExpectation && (
                    <p className="text-destructive text-sm mt-1">{errors.avgEquityExpectation}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Target Industry <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.targetIndustry}
                  onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.targetIndustry && <p className="text-destructive text-sm mt-1">{errors.targetIndustry}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preferred Stage <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.preferredStage}
                  onChange={(e) => setFormData({ ...formData, preferredStage: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="idea">Idea</option>
                  <option value="MVP">MVP</option>
                  <option value="pre-revenue">Pre-Revenue</option>
                  <option value="scaling">Scaling</option>
                  <option value="established">Established</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold disabled:opacity-50"
              >
                {isSaving ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </section>
      </div>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogTitle>Status</AlertDialogTitle>
          <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
