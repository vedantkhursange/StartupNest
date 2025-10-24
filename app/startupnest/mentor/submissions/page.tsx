"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Aurora from "@/components/Aurora"
import { useToast } from "@/lib/hooks/useToast"
import { useDebounce } from "@/lib/hooks/useDebounce"
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Menu, X } from "lucide-react"

interface Submission {
  _id: string
  userName: string
  marketPotential: number
  launchYear: string
  expectedFunding: number
  address: string
  status: number
  submissionDate: string
  pitchDeckFile: {
    name: string
    contentType: string
    data?: string
  }
}

export default function MentorSubmissions() {
  const router = useRouter()
  const { success, error } = useToast()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<number | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [sortBy, setSortBy] = useState("submissionDate")
  const [sortValue, setSortValue] = useState(-1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showPdfModal, setShowPdfModal] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [selectedPdfName, setSelectedPdfName] = useState<string>("")
  const API_URL = process.env.NEXT_PUBLIC_API_URL


  const debouncedSearchValue = useDebounce(searchValue, 500)

  const handleViewPDF = async (submissionId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/startupSubmission/getStartupSubmissionById/${submissionId}?includeFile=true`
      );
      const data = await response.json();
      
      if (!data.pitchDeckFile?.data) {
        error("PDF data not found");
        return;
      }

      // Create blob URL for the PDF
      const binaryString = window.atob(data.pitchDeckFile.data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
      setSelectedPdfName(data.pitchDeckFile.name);
      setShowPdfModal(true);
    } catch (err) {
      console.error('PDF loading error:', err);
      error("Failed to load PDF");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token || role !== "Mentor") {
      router.push("/startupnest/login")
      return
    }

    fetchSubmissions()
  }, [router, filterStatus, debouncedSearchValue, currentPage, sortBy, sortValue])

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/api/startupSubmission/getAllStartupSubmissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: currentPage,
          pageSize,
          searchValue: debouncedSearchValue,
          status: filterStatus,
          sortBy,
          sortValue,
        }),
      })
      const data = await response.json()
      console.log("[v0] Fetched submissions:", data)
      setSubmissions(data.submissions || [])
      setTotalCount(data.total || 0)
    } catch (err) {
      console.error("[v0] Error fetching submissions:", err)
      error("Failed to fetch submissions")
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (submissionId: string, newStatus: number) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `${API_URL}/api/startupSubmission/updateStartupSubmission/${submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      )

      if (response.ok) {
        success(newStatus === 2 ? "Submission shortlisted!" : "Submission rejected!")
        setSubmissions(submissions.map((s) => (s._id === submissionId ? { ...s, status: newStatus } : s)))
        setShowDetailModal(false)
      }
    } catch (err) {
      error("Failed to update submission")
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

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 w-full h-full">
        <Aurora colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]} amplitude={1.2} blend={0.6} speed={0.8} />
      </div>

      <div className="relative z-10">
        <nav className="border-b border-border/40 backdrop-blur-md bg-background/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => router.push("/startupnest/mentor/home")}
                className="text-foreground hover:text-primary transition text-sm sm:text-base"
              >
                ← Back
              </button>
              <div className="text-lg sm:text-2xl font-bold text-primary text-center flex-1">Startup Submissions</div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-foreground hover:text-primary transition"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                  setCurrentPage(1)
                }}
                className="flex-1 px-3 sm:px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-3 sm:px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              >
                <option value="submissionDate">Sort by Date</option>
                <option value="marketPotential">Sort by Potential</option>
                <option value="expectedFunding">Sort by Funding</option>
              </select>
              <button
                onClick={() => setSortValue(sortValue === 1 ? -1 : 1)}
                className="px-3 sm:px-4 py-2 bg-primary/20 border border-primary/40 rounded-lg text-primary hover:bg-primary/30 transition-all text-sm whitespace-nowrap"
              >
                {sortValue === 1 ? "↑ Asc" : "↓ Desc"}
              </button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {[
                { label: "All", value: null },
                { label: "Submitted", value: 1, color: "blue" },
                { label: "Shortlisted", value: 2, color: "green" },
                { label: "Rejected", value: 3, color: "red" },
              ].map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => {
                    setFilterStatus(filter.value)
                    setCurrentPage(1)
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm whitespace-nowrap ${
                    filterStatus === filter.value
                      ? filter.value === null
                        ? "bg-primary text-primary-foreground"
                        : `bg-${filter.color}-500 text-white`
                      : "bg-card/50 text-foreground border border-border/40 hover:border-primary/50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-sm">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 text-sm">No submissions found.</div>
          ) : (
            <>
              <div className="grid gap-3 sm:gap-4 animate-in fade-in">
                {submissions.map((submission) => (
                  <div
                    key={submission._id}
                    className="bg-card/50 backdrop-blur border border-border/40 rounded-lg p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/10 transform hover:scale-[1.02]"
                    onClick={() => {
                      setSelectedSubmission(submission)
                      setShowDetailModal(true)
                    }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-foreground">{submission.userName}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Submitted: {new Date(submission.submissionDate).toLocaleDateString()}
                        </p>  
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${getStatusColor(submission.status)}`}
                      >
                        {getStatusLabel(submission.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 text-xs sm:text-sm">
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
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewPDF(submission._id);
                        }}
                        className="text-primary hover:underline text-xs sm:text-sm"
                      >
                        View Pitch Deck
                      </button>
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

      <AlertDialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <AlertDialogContent className="max-w-sm sm:max-w-md animate-in fade-in zoom-in-95 duration-300 mx-4">
          <div className="flex justify-between items-center">
            <AlertDialogTitle className="text-base sm:text-lg">
              {selectedSubmission?.userName}'s Submission
            </AlertDialogTitle>
            <button onClick={() => setShowDetailModal(false)} className="text-foreground hover:text-primary transition">
              <X size={20} />
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4 text-sm">
            {selectedSubmission && (
              <>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Market Potential</p>
                  <p className="text-foreground font-semibold">{selectedSubmission.marketPotential}/10</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Expected Funding</p>
                  <p className="text-foreground font-semibold">
                    ${selectedSubmission.expectedFunding.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Launch Year</p>
                  <p className="text-foreground font-semibold">
                    {new Date(selectedSubmission.launchYear).getFullYear()}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Address</p>
                  <p className="text-foreground font-semibold text-sm break-words">{selectedSubmission.address}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Current Status</p>
                  <p className={`font-semibold text-sm ${getStatusColor(selectedSubmission.status)}`}>
                    {getStatusLabel(selectedSubmission.status)}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Pitch Deck</p>
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-semibold text-sm truncate">
                      {selectedSubmission.pitchDeckFile.name}
                    </p>
                    <button
                      onClick={() => handleViewPDF(selectedSubmission._id)}
                      className="text-primary hover:underline text-sm"
                    >
                      View PDF
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {selectedSubmission?.status === 1 && (
            <div className="flex gap-2 sm:gap-3 justify-end mt-6 flex-col sm:flex-row">
              <button
                onClick={() => handleStatusUpdate(selectedSubmission._id, 2)}
                className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 active:scale-95 text-sm"
              >
                Shortlist
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedSubmission._id, 3)}
                className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 active:scale-95 text-sm"
              >
                Reject
              </button>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>

      {/* PDF Viewer Modal */}
      <AlertDialog 
        open={showPdfModal} 
        onOpenChange={(open) => {
          if (!open) {
            // Clean up the blob URL when closing the modal
            if (pdfUrl) {
              URL.revokeObjectURL(pdfUrl);
              setPdfUrl(null);
            }
            setShowPdfModal(false);
          }
        }}
      >
        <AlertDialogContent className="max-w-4xl h-[80vh] p-0 gap-0">
          <div className="flex justify-between items-center p-4 border-b">
            <AlertDialogTitle className="text-lg font-semibold">{selectedPdfName}</AlertDialogTitle>
            <button
              onClick={() => setShowPdfModal(false)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 w-full h-full min-h-0 bg-secondary/50">
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                style={{ minHeight: "calc(80vh - 60px)" }}
              />
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
