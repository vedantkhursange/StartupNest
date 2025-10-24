// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import Aurora from "@/components/Aurora"
// import { useToast } from "@/lib/hooks/useToast"
// import { useDebounce } from "@/lib/hooks/useDebounce"
// import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog"

// interface Profile {
//   _id: string
//   category: string
//   description: string
//   fundingLimit: number
//   avgEquityExpectation: number
//   targetIndustry: string
//   preferredStage: string
//   mentorId: { userName: string; email: string }
// }

// export default function Opportunities() {
//   const router = useRouter()
//   const { success, error } = useToast()
//   const [profiles, setProfiles] = useState<Profile[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [showSubmitForm, setShowSubmitForm] = useState(false)
//   const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
//   const [searchValue, setSearchValue] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [pageSize] = useState(10)
//   const [totalCount, setTotalCount] = useState(0)
//   const [sortBy, setSortBy] = useState("createdAt")
//   const [sortValue, setSortValue] = useState(-1)
//   const [formData, setFormData] = useState({
//     marketPotential: "",
//     launchYear: "",
//     expectedFunding: "",
//     address: "",
//     pitchDeckFile: null as File | null,
//   })
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const debouncedSearchValue = useDebounce(searchValue, 500)

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     const role = localStorage.getItem("role")

//     if (!token || role !== "Entrepreneur") {
//       router.push("/startupnest/login")
//       return
//     }

//     fetchProfiles()
//   }, [router, debouncedSearchValue, currentPage, sortBy, sortValue])

//   const fetchProfiles = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("http://localhost:8080/api/startupProfile/getAllStartupProfiles", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       })  
//       const data = await response.json()
//       setProfiles(data.profiles || data)
//       setTotalCount(data.total || data.length)
//     } catch (err) {
//       error("Failed to fetch opportunities")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}
//     if (!formData.marketPotential) newErrors.marketPotential = "Market potential is required"
//     if (!formData.launchYear) newErrors.launchYear = "Launch year is required"
//     if (!formData.expectedFunding) newErrors.expectedFunding = "Expected funding is required"
//     if (!formData.address) newErrors.address = "Address is required"
//     if (!formData.pitchDeckFile) {
//       newErrors.pitchDeckFile = "Pitch deck file is required";
//     } else {
//       if (formData.pitchDeckFile.type !== "application/pdf") {
//         newErrors.pitchDeckFile = "Please select a valid PDF file";
//       }
//       const maxSize = 10 * 1024 * 1024; // 10MB in bytes
//       if (formData.pitchDeckFile.size > maxSize) {
//         newErrors.pitchDeckFile = "File size must be less than 10MB";
//       }
//     }
//     setFormErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmitIdea = async () => {
//     if (!validateForm()) return

//     const token = localStorage.getItem("token")
//     const userId = localStorage.getItem("userId")
//     const userName = localStorage.getItem("userName")

//     if (!selectedProfile) return

//     setIsSubmitting(true)
//     try {
//       // Convert PDF file to base64
//       const fileReader = new FileReader();
//       const file = formData.pitchDeckFile as File;
      
//       const base64Promise = new Promise((resolve, reject) => {
//         fileReader.onload = () => resolve(fileReader.result);
//         fileReader.onerror = reject;
//         fileReader.readAsDataURL(file);
//       });

//       const base64Data = await base64Promise;
//       const base64String = (base64Data as string).split(',')[1]; // Remove data URL prefix

//       const response = await fetch("http://localhost:8080/api/startupSubmission/addStartupSubmission", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           userId,
//           userName,
//           startupProfileId: selectedProfile._id,
//           marketPotential: Number(formData.marketPotential),
//           launchYear: new Date(formData.launchYear),
//           expectedFunding: Number(formData.expectedFunding),
//           address: formData.address,
//           pitchDeckFile: {
//             data: base64String,
//             name: file.name,
//             contentType: file.type,
//           },
//         }),
//       })

//       if (response.ok) {
//         success("Idea submitted successfully!")
//         setShowSubmitForm(false)
//         setFormData({ marketPotential: "", launchYear: "", expectedFunding: "", address: "", pitchDeckFile: null })
//       }
//     } catch (err) {
//       error("Failed to submit idea")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const filteredProfiles = profiles.filter(
//     (p) =>
//       p.category.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
//       p.description.toLowerCase().includes(debouncedSearchValue.toLowerCase()),
//   )

//   const totalPages = Math.ceil(totalCount / pageSize)

//   return (
//     <div className="min-h-screen bg-background overflow-hidden">
//       <div className="fixed inset-0 w-full h-full">
//         <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
//       </div>

//       <div className="relative z-10">
//         <nav className="border-b border-border/40 backdrop-blur-md bg-background/30 sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
//             <button
//               onClick={() => router.push("/startupnest/entrepreneur/home")}
//               className="text-foreground hover:text-primary transition text-sm sm:text-base"
//             >
//               ← Back
//             </button>
//             <div className="text-lg sm:text-2xl font-bold text-primary text-center flex-1">Mentor Opportunities</div>
//             <div className="w-12"></div>
//           </div>
//         </nav>

//         <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
//           <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
//             <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//               <input
//                 type="text"
//                 placeholder="Search opportunities..."
//                 value={searchValue}
//                 onChange={(e) => {
//                   setSearchValue(e.target.value)
//                   setCurrentPage(1)
//                 }}
//                 className="flex-1 px-3 sm:px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
//               />
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-3 sm:px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
//               >
//                 <option value="createdAt">Sort by Latest</option>
//                 <option value="fundingLimit">Sort by Funding</option>
//                 <option value="category">Sort by Category</option>
//               </select>
//             </div>
//           </div>

//           {isLoading ? (
//             <div className="text-center text-muted-foreground py-12">
//               <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
//               <p className="mt-4 text-sm">Loading opportunities...</p>
//             </div>
//           ) : filteredProfiles.length === 0 ? (
//             <div className="text-center text-muted-foreground py-12 text-sm">No opportunities available yet.</div>
//           ) : (
//             <>
//               <div className="grid gap-4 sm:gap-6 animate-in fade-in">
//                 {filteredProfiles.map((profile) => (
//                   <div
//                     key={profile._id}
//                     className="bg-card/50 backdrop-blur border border-border/40 rounded-lg p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 transform hover:scale-[1.01]"
//                   >
//                     <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4">
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-lg sm:text-2xl font-bold text-foreground break-words">
//                           {profile.category}
//                         </h3>
//                         <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{profile.description}</p>
//                         <p className="text-xs text-muted-foreground mt-2">Mentor: {profile.mentorId.userName}</p>
//                       </div>
//                       <button
//                         onClick={() => {
//                           setSelectedProfile(profile)
//                           setShowSubmitForm(true)
//                         }}
//                         className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap text-sm"
//                       >
//                         Submit Idea
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
//                       <div>
//                         <p className="text-muted-foreground">Funding Limit</p>
//                         <p className="text-foreground font-semibold">${profile.fundingLimit.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <p className="text-muted-foreground">Equity</p>
//                         <p className="text-foreground font-semibold">{profile.avgEquityExpectation}%</p>
//                       </div>
//                       <div>
//                         <p className="text-muted-foreground">Industry</p>
//                         <p className="text-foreground font-semibold truncate">{profile.targetIndustry}</p>
//                       </div>
//                       <div>
//                         <p className="text-muted-foreground">Stage</p>
//                         <p className="text-foreground font-semibold capitalize">{profile.preferredStage}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </section>
//       </div>

//       <AlertDialog open={showSubmitForm} onOpenChange={setShowSubmitForm}>
//         <AlertDialogContent className="max-w-sm sm:max-w-md animate-in fade-in zoom-in-95 duration-300 mx-4">
//           <AlertDialogTitle className="text-base sm:text-lg">Submit Your Idea</AlertDialogTitle>
//           <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
//             <div className="space-y-2">
//               <label className="block text-xs sm:text-sm font-medium text-foreground">
//                 Market Potential (1-10) <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="number"
//                 min="1"
//                 max="10"
//                 value={formData.marketPotential}
//                 onChange={(e) => setFormData({ ...formData, marketPotential: e.target.value })}
//                 className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
//               />
//               {formErrors.marketPotential && <p className="text-destructive text-xs">{formErrors.marketPotential}</p>}
//             </div>
//             <div className="space-y-2">
//               <label className="block text-xs sm:text-sm font-medium text-foreground">
//                 Launch Year <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="date"
//                 value={formData.launchYear}
//                 onChange={(e) => setFormData({ ...formData, launchYear: e.target.value })}
//                 className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
//               />
//               {formErrors.launchYear && <p className="text-destructive text-xs">{formErrors.launchYear}</p>}
//             </div>
//             <div className="space-y-2">
//               <label className="block text-xs sm:text-sm font-medium text-foreground">
//                 Expected Funding <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="number"
//                 value={formData.expectedFunding}
//                 onChange={(e) => setFormData({ ...formData, expectedFunding: e.target.value })}
//                 className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
//               />
//               {formErrors.expectedFunding && <p className="text-destructive text-xs">{formErrors.expectedFunding}</p>}
//             </div>
//             <div className="space-y-2">
//               <label className="block text-xs sm:text-sm font-medium text-foreground">
//                 Address <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.address}
//                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                 className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
//               />
//               {formErrors.address && <p className="text-destructive text-xs">{formErrors.address}</p>}
//             </div>
//             <div className="space-y-2">
//               <label className="block text-xs sm:text-sm font-medium text-foreground">
//                 Pitch Deck File (PDF) <span className="text-destructive">*</span>
//               </label>
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (!file) {
//                     setFormErrors({ ...formErrors, pitchDeckFile: "Please select a file" });
//                     return;
//                   }
                  
//                   if (file.type !== "application/pdf") {
//                     setFormErrors({ ...formErrors, pitchDeckFile: "Please select a valid PDF file" });
//                     return;
//                   }

//                   // Check file size (max 10MB)
//                   const maxSize = 10 * 1024 * 1024; // 10MB in bytes
//                   if (file.size > maxSize) {
//                     setFormErrors({ ...formErrors, pitchDeckFile: "File size must be less than 10MB" });
//                     return;
//                   }

//                   setFormData({ ...formData, pitchDeckFile: file });
//                   setFormErrors({ ...formErrors, pitchDeckFile: "" });
//                 }}
//                 className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
//               />
//               {formErrors.pitchDeckFile && <p className="text-destructive text-xs">{formErrors.pitchDeckFile}</p>}
//             </div>
//           </div>
//           <div className="flex gap-2 sm:gap-4 justify-end mt-6 flex-col sm:flex-row">
//             <button
//               onClick={() => setShowSubmitForm(false)}
//               className="px-3 sm:px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card/50 transition-all text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmitIdea}
//               disabled={isSubmitting}
//               className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 text-sm"
//             >
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"
import { useToast } from "@/lib/hooks/useToast"
import { useDebounce } from "@/lib/hooks/useDebounce"
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog"

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface Profile {
  _id: string
  category: string
  description: string
  fundingLimit: number
  avgEquityExpectation: number
  targetIndustry: string
  preferredStage: string
  mentorId: { userName: string; email: string }
}

export default function Opportunities() {
  const router = useRouter()
  const { success, error } = useToast()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortValue, setSortValue] = useState(-1)
  const [formData, setFormData] = useState({
    marketPotential: "",
    launchYear: "",
    expectedFunding: "",
    address: "",
    pitchDeckFile: null as File | null,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token || role !== "Entrepreneur") {
      router.push("/startupnest/login")
      return
    }

    fetchProfiles()
  }, [router, debouncedSearchValue, currentPage, sortBy, sortValue])

  const fetchProfiles = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/api/startupProfile/getAllStartupProfiles`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      setProfiles(data.profiles || data)
      setTotalCount(data.total || data.length)
    } catch (err) {
      error("Failed to fetch opportunities")
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.marketPotential) newErrors.marketPotential = "Market potential is required"
    if (!formData.launchYear) newErrors.launchYear = "Launch year is required"
    if (!formData.expectedFunding) newErrors.expectedFunding = "Expected funding is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.pitchDeckFile) {
      newErrors.pitchDeckFile = "Pitch deck file is required"
    } else {
      if (formData.pitchDeckFile.type !== "application/pdf") {
        newErrors.pitchDeckFile = "Please select a valid PDF file"
      }
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (formData.pitchDeckFile.size > maxSize) {
        newErrors.pitchDeckFile = "File size must be less than 10MB"
      }
    }
    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitIdea = async () => {
    if (!validateForm()) return

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const userName = localStorage.getItem("userName")

    if (!selectedProfile) return

    setIsSubmitting(true)
    try {
      const file = formData.pitchDeckFile as File
      const fileReader = new FileReader()

      const base64Promise = new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result)
        fileReader.onerror = reject
        fileReader.readAsDataURL(file)
      })

      const base64Data = await base64Promise
      const base64String = (base64Data as string).split(",")[1]

      const response = await fetch(`${API_URL}/api/startupSubmission/addStartupSubmission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          userName,
          startupProfileId: selectedProfile._id,
          marketPotential: Number(formData.marketPotential),
          launchYear: new Date(formData.launchYear),
          expectedFunding: Number(formData.expectedFunding),
          address: formData.address,
          pitchDeckFile: {
            data: base64String,
            name: file.name,
            contentType: file.type,
          },
        }),
      })

      if (response.ok) {
        success("Idea submitted successfully!")
        setShowSubmitForm(false)
        setFormData({ marketPotential: "", launchYear: "", expectedFunding: "", address: "", pitchDeckFile: null })
      }
    } catch (err) {
      error("Failed to submit idea")
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredProfiles = profiles.filter(
    (p) =>
      p.category.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
      p.description.toLowerCase().includes(debouncedSearchValue.toLowerCase()),
  )

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
      </div>

      <div className="relative z-10">
        <nav className="border-b border-border/40 backdrop-blur-md bg-background/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
            <button
              onClick={() => router.push("/startupnest/entrepreneur/home")}
              className="text-foreground hover:text-primary transition text-sm sm:text-base"
            >
              ← Back
            </button>
            <div className="text-lg sm:text-2xl font-bold text-primary text-center flex-1">Mentor Opportunities</div>
            <div className="w-12"></div>
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                  setCurrentPage(1)
                }}
                className="flex-1 px-3 sm:px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              >
                <option value="createdAt">Sort by Latest</option>
                <option value="fundingLimit">Sort by Funding</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-sm">Loading opportunities...</p>
            </div>
          ) : filteredProfiles.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 text-sm">No opportunities available yet.</div>
          ) : (
            <>
              <div className="grid gap-4 sm:gap-6 animate-in fade-in">
                {filteredProfiles.map((profile) => (
                  <div
                    key={profile._id}
                    className="bg-card/50 backdrop-blur border border-border/40 rounded-lg p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 transform hover:scale-[1.01]"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground break-words">
                          {profile.category}
                        </h3>
                        <p className="text-muted-foreground mt-1 text-sm line-clamp-2">{profile.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">Mentor: {profile.mentorId.userName}</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedProfile(profile)
                          setShowSubmitForm(true)
                        }}
                        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap text-sm"
                      >
                        Submit Idea
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-muted-foreground">Funding Limit</p>
                        <p className="text-foreground font-semibold">${profile.fundingLimit.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Equity</p>
                        <p className="text-foreground font-semibold">{profile.avgEquityExpectation}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Industry</p>
                        <p className="text-foreground font-semibold truncate">{profile.targetIndustry}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Stage</p>
                        <p className="text-foreground font-semibold capitalize">{profile.preferredStage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      <AlertDialog open={showSubmitForm} onOpenChange={setShowSubmitForm}>
        <AlertDialogContent className="max-w-sm sm:max-w-md animate-in fade-in zoom-in-95 duration-300 mx-4">
          <AlertDialogTitle className="text-base sm:text-lg">Submit Your Idea</AlertDialogTitle>
          <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-foreground">
                Market Potential (1-10) <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.marketPotential}
                onChange={(e) => setFormData({ ...formData, marketPotential: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              {formErrors.marketPotential && <p className="text-destructive text-xs">{formErrors.marketPotential}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-foreground">
                Launch Year <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                value={formData.launchYear}
                onChange={(e) => setFormData({ ...formData, launchYear: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              {formErrors.launchYear && <p className="text-destructive text-xs">{formErrors.launchYear}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-foreground">
                Expected Funding <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                value={formData.expectedFunding}
                onChange={(e) => setFormData({ ...formData, expectedFunding: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              {formErrors.expectedFunding && <p className="text-destructive text-xs">{formErrors.expectedFunding}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-foreground">
                Address <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              {formErrors.address && <p className="text-destructive text-xs">{formErrors.address}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-foreground">
                Pitch Deck File (PDF) <span className="text-destructive">*</span>
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) {
                    setFormErrors({ ...formErrors, pitchDeckFile: "Please select a file" })
                    return
                  }

                  if (file.type !== "application/pdf") {
                    setFormErrors({ ...formErrors, pitchDeckFile: "Please select a valid PDF file" })
                    return
                  }

                  const maxSize = 10 * 1024 * 1024
                  if (file.size > maxSize) {
                    setFormErrors({ ...formErrors, pitchDeckFile: "File size must be less than 10MB" })
                    return
                  }

                  setFormData({ ...formData, pitchDeckFile: file })
                  setFormErrors({ ...formErrors, pitchDeckFile: "" })
                }}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              {formErrors.pitchDeckFile && <p className="text-destructive text-xs">{formErrors.pitchDeckFile}</p>}
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 justify-end mt-6 flex-col sm:flex-row">
            <button
              onClick={() => setShowSubmitForm(false)}
              className="px-3 sm:px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card/50 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitIdea}
              disabled={isSubmitting}
              className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
