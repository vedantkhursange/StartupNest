"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"
import { useToast } from "@/lib/hooks/useToast"
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface Submission {
  _id: string
  startupProfileId: string
  marketPotential: number
  launchYear: string
  expectedFunding: number
  address: string
  pitchDeckFile: {
    name: string;
    contentType: string;
    data?: string;
  }
  status: number
  submissionDate: string
}

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

export default function MySubmissions() {
  const router = useRouter()
  const { success, error } = useToast()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [profiles, setProfiles] = useState<Record<string, Profile>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [selectedProfileModal, setSelectedProfileModal] = useState<Profile | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [filterStatus, setFilterStatus] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState("submissionDate")
  const [sortValue, setSortValue] = useState(-1)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const userId = localStorage.getItem("userId")

    if (!token || role !== "Entrepreneur") {
      router.push("/startupnest/login")
      return
    }

    fetchSubmissions(userId)
  }, [router])

  const fetchSubmissions = async (userId: string | null) => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:8080/api/startupSubmission/getSubmissionsByUserId/${userId}`)
      const data = await response.json()
      setSubmissions(data)

      // Fetch profile details for each submission
      for (const submission of data) {
        if (!profiles[submission.startupProfileId]) {
          fetchProfile(submission.startupProfileId)
        }
      }
    } catch (err) {
      error("Failed to fetch submissions")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchProfile = async (profileId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/startupProfile/getStartupProfileById/${profileId}`)
      const data = await response.json()
      setProfiles((prev) => ({ ...prev, [profileId]: data }))
    } catch (err) {
      error("Failed to fetch profile")
    }
  }

  const handleViewPDF = async (submissionId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/startupSubmission/getStartupSubmissionById/${submissionId}?includeFile=true`
      );
      const data = await response.json();
      
      if (!data.pitchDeckFile?.data) {
        error("PDF data not found");
        return;
      }

      // Create blob and open in new window
      const blob = new Blob([Buffer.from(data.pitchDeckFile.data, 'base64')], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(blob);
      window.open(fileUrl, '_blank');
    } catch (err) {
      error("Failed to load PDF");
    }
  }

  const handleDownloadPDF = async (submissionId: string, fileName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/startupSubmission/getStartupSubmissionById/${submissionId}?includeFile=true`
      );
      const data = await response.json();
      
      if (!data.pitchDeckFile?.data) {
        error("PDF data not found");
        return;
      }

      // Create blob and trigger download
      const blob = new Blob([Buffer.from(data.pitchDeckFile.data, 'base64')], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileUrl);
    } catch (err) {
      error("Failed to download PDF");
    }
  }

  const handleDelete = async () => {
    if (!selectedSubmission) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `http://localhost:8080/api/startupSubmission/deleteStartupSubmission/${selectedSubmission._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      if (response.ok) {
        success("Submission deleted successfully!")
        setSubmissions(submissions.filter((s) => s._id !== selectedSubmission._id))
        setShowDeleteAlert(false)
        setShowDetailModal(false)
      }
    } catch (err) {
      error("Failed to delete submission")
    }
  }

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 1:
        return "Submitted"
      case 2:
        return "Shortlisted"
      case 3:
        return "Rejected"
      default:
        return "Unknown"
    }
  }

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return "bg-blue-500/20 text-blue-400"
      case 2:
        return "bg-green-500/20 text-green-400"
      case 3:
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const filteredSubmissions = submissions
    .filter((s) => {
      if (filterStatus !== null && s.status !== filterStatus) return false
      if (searchValue && !profiles[s.startupProfileId]?.category.toLowerCase().includes(searchValue.toLowerCase())) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === "submissionDate") {
        return sortValue === 1
          ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
          : new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
      </div>

      <div className="relative z-10">
        <nav className="border-b border-border/40 backdrop-blur-md bg-background/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => router.push("/startupnest/entrepreneur/home")}
              className="text-foreground hover:text-primary transition"
            >
              ← Back
            </button>
            <div className="text-2xl font-bold text-primary">My Submissions</div>
            <div></div>
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8 space-y-4">
            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 min-w-64 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="submissionDate">Sort by Date</option>
                <option value="marketPotential">Sort by Potential</option>
              </select>
              <button
                onClick={() => setSortValue(sortValue === 1 ? -1 : 1)}
                className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg text-primary hover:bg-primary/30 transition-all"
              >
                {sortValue === 1 ? "↑ Ascending" : "↓ Descending"}
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus(null)}
                className={`px-4 py-2 rounded-lg transition ${
                  filterStatus === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/50 text-foreground border border-border/40 hover:border-primary/50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus(1)}
                className={`px-4 py-2 rounded-lg transition ${
                  filterStatus === 1
                    ? "bg-blue-500 text-white"
                    : "bg-card/50 text-foreground border border-border/40 hover:border-primary/50"
                }`}
              >
                Submitted
              </button>
              <button
                onClick={() => setFilterStatus(2)}
                className={`px-4 py-2 rounded-lg transition ${
                  filterStatus === 2
                    ? "bg-green-500 text-white"
                    : "bg-card/50 text-foreground border border-border/40 hover:border-primary/50"
                }`}
              >
                Shortlisted
              </button>
              <button
                onClick={() => setFilterStatus(3)}
                className={`px-4 py-2 rounded-lg transition ${
                  filterStatus === 3
                    ? "bg-red-500 text-white"
                    : "bg-card/50 text-foreground border border-border/40 hover:border-primary/50"
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4">Loading submissions...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No submissions yet.{" "}
              <button
                onClick={() => router.push("/startupnest/entrepreneur/opportunities")}
                className="text-primary hover:underline font-semibold"
              >
                Browse opportunities
              </button>
            </div>
          ) : (
            <div className="grid gap-4 animate-in fade-in">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission._id}
                  className="bg-card/50 backdrop-blur border border-border/40 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 transform hover:scale-[1.01]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {profiles[submission.startupProfileId]?.category || "Loading..."}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Submitted: {new Date(submission.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(submission.status)}`}
                    >
                      {getStatusLabel(submission.status)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Market Potential</p>
                      <p className="text-foreground font-semibold">{submission.marketPotential}/10</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected Funding</p>
                      <p className="text-foreground font-semibold">${submission.expectedFunding.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Launch Year</p>
                      <p className="text-foreground font-semibold">{new Date(submission.launchYear).getFullYear()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pitch Deck</p>
                      <div className="flex gap-2 items-center">
                        <span className="text-foreground font-semibold truncate" title={submission.pitchDeckFile.name}>
                          {submission.pitchDeckFile.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewPDF(submission._id);
                          }}
                          className="text-primary hover:underline text-xs"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPDF(submission._id, submission.pitchDeckFile.name);
                          }}
                          className="text-primary hover:underline text-xs"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission)
                        setShowDetailModal(true)
                      }}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        const profile = profiles[submission.startupProfileId]
                        if (profile) {
                          setSelectedProfileModal(profile)
                          setShowProfileModal(true)
                        }
                      }}
                      className="px-4 py-2 bg-card border border-border/40 text-foreground rounded-lg hover:border-primary/50 transition-all transform hover:scale-105 active:scale-95 text-sm"
                    >
                      View Profile
                    </button>
                    {submission.status === 1 && (
                      <button
                        onClick={() => {
                          setSelectedSubmission(submission)
                          setShowDeleteAlert(true)
                        }}
                        className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all transform hover:scale-105 active:scale-95 text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <AlertDialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <AlertDialogContent className="max-w-md animate-in fade-in zoom-in-95 duration-300">
          {selectedSubmission && (
            <>
              <AlertDialogTitle>Submission Details</AlertDialogTitle>
              <div className="space-y-4">
                {/* PDF Actions */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => handleViewPDF(selectedSubmission._id)}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm"
                  >
                    View PDF
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(selectedSubmission._id, selectedSubmission.pitchDeckFile.name)}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-all text-sm"
                  >
                    Download PDF
                  </button>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Market Potential</p>
                  <p className="text-foreground font-semibold">{selectedSubmission.marketPotential}/10</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Funding</p>
                  <p className="text-foreground font-semibold">
                    ${selectedSubmission.expectedFunding.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Launch Year</p>
                  <p className="text-foreground font-semibold">
                    {new Date(selectedSubmission.launchYear).getFullYear()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-foreground font-semibold">{selectedSubmission.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pitch Deck</p>
                  <p className="text-foreground font-semibold">{selectedSubmission.pitchDeckFile.name}</p>
                </div>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <AlertDialogContent className="max-w-md animate-in fade-in zoom-in-95 duration-300">
          {selectedProfileModal && (
            <>
              <AlertDialogTitle>{selectedProfileModal.category}</AlertDialogTitle>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-foreground">{selectedProfileModal.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Funding Limit</p>
                  <p className="text-foreground font-semibold">${selectedProfileModal.fundingLimit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Equity Expectation</p>
                  <p className="text-foreground font-semibold">{selectedProfileModal.avgEquityExpectation}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Industry</p>
                  <p className="text-foreground font-semibold">{selectedProfileModal.targetIndustry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Stage</p>
                  <p className="text-foreground font-semibold capitalize">{selectedProfileModal.preferredStage}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mentor</p>
                  <p className="text-foreground font-semibold">{selectedProfileModal.mentorId.userName}</p>
                  <p className="text-foreground text-sm">{selectedProfileModal.mentorId.email}</p>
                </div>
              </div>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="animate-in fade-in zoom-in-95 duration-300">
          <AlertDialogTitle>Delete Submission</AlertDialogTitle>
          <p className="text-muted-foreground">
            Are you sure you want to delete this submission? This action cannot be undone.
          </p>
          <div className="flex gap-4 justify-end mt-6">
            <button
              onClick={() => setShowDeleteAlert(false)}
              className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-card/50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all transform hover:scale-105 active:scale-95"
            >
              Yes, Delete
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
