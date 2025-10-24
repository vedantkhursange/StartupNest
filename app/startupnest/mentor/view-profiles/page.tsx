"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"
import { useToast } from "@/lib/hooks/useToast"
import { useDebounce } from "@/lib/hooks/useDebounce"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface Profile {
  _id: string
  category: string
  description: string
  fundingLimit: number
  avgEquityExpectation: number
  targetIndustry: string
  preferredStage: string
  createdAt: string
}

export default function ViewProfiles() {
  const router = useRouter()
  const { success, error } = useToast()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortValue, setSortValue] = useState(-1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const userId = localStorage.getItem("userId")

    if (!token || role !== "Mentor") {
      router.push("/startupnest/login")
      return
    }

    fetchProfiles(userId)
  }, [router, debouncedSearchValue, sortBy, sortValue, currentPage])

  const fetchProfiles = async (userId: string | null) => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `http://localhost:8080/api/startupProfile/getStartupProfilesByMentorId/${userId}?page=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}&sortValue=${sortValue}&search=${debouncedSearchValue}`,
      )
      const data = await response.json()
      setProfiles(data.profiles || data)
      setTotalCount(data.total || data.length)
    } catch (err) {
      error("Failed to fetch profiles")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedProfileId) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `http://localhost:8080/api/startupProfile/deleteStartupProfile/${selectedProfileId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      if (response.ok) {
        success("Profile deleted successfully!")
        setProfiles(profiles.filter((p) => p._id !== selectedProfileId))
        setShowDeleteAlert(false)
      }
    } catch (err) {
      error("Failed to delete profile")
    }
  }

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
              onClick={() => router.push("/startupnest/mentor/home")}
              className="text-foreground hover:text-primary transition text-sm sm:text-base"
            >
              ← Back
            </button>
            <div className="text-lg sm:text-2xl font-bold text-primary text-center flex-1">My Startup Profiles</div>
            <div className="w-12"></div>
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="text"
                placeholder="Search profiles..."
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
              <button
                onClick={() => setSortValue(sortValue === 1 ? -1 : 1)}
                className="px-3 sm:px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg text-primary hover:bg-primary/30 transition-all text-sm whitespace-nowrap"
              >
                {sortValue === 1 ? "↑ Asc" : "↓ Desc"}
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-sm">Loading profiles...</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 text-sm">
              No profiles yet. Create one to get started!
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:gap-6 animate-in fade-in">
                {profiles.map((profile) => (
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
                        <p className="text-xs text-muted-foreground mt-2">
                          Created: {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => router.push(`/startupnest/mentor/edit-profile/${profile._id}`)}
                          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProfileId(profile._id)
                            setShowDeleteAlert(true)
                          }}
                          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all transform hover:scale-105 active:scale-95 text-sm"
                        >
                          Delete
                        </button>
                      </div>
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

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8 flex-wrap">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-2 bg-card/50 border border-border/40 rounded-lg text-foreground hover:border-primary/50 disabled:opacity-50 transition-all text-sm"
                  >
                    Previous
                  </button>
                  <span className="text-muted-foreground text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-2 bg-card/50 border border-border/40 rounded-lg text-foreground hover:border-primary/50 disabled:opacity-50 transition-all text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="max-w-sm sm:max-w-md animate-in fade-in zoom-in-95 duration-300 mx-4">
          <AlertDialogTitle className="text-base sm:text-lg">Delete Profile</AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            Are you sure you want to delete this profile? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-2 sm:gap-4 justify-end flex-col sm:flex-row">
            <button
              onClick={() => setShowDeleteAlert(false)}
              className="px-3 sm:px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card/50 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-3 sm:px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all transform hover:scale-105 active:scale-95 text-sm"
            >
              Yes, Delete
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
