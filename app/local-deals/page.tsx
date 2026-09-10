"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface BogoDeal {
  id: string | number;
  logo: string;
  biz: string;
  offer: string;
  street: string;
  category: string;
}

export default function BogoScannerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [results, setResults] = useState<BogoDeal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Modal Specific State Handling
  const [reportingDeal, setReportingDeal] = useState<BogoDeal | null>(null);
  const [reportReason, setReportReason] = useState<string>("");
  const [reportDetails, setReportDetails] = useState<string>("");
  const [submittingReport, setSubmittingReport] = useState<boolean>(false);

  const monthlyCodes = [
    "SAVE01", "BOGO02", "DEAL03", "GRAB04", "CITY05", 
    "ZONE06", "CODE07", "FREE08", "LUCKY09", "PLUS10",
    "STAR11", "COUP12", "EAT13", "SHOP14", "FIND15", 
    "BOGO16", "OFFER17", "GIFT18", "LOCAL19", "BEST20",
    "NOW21", "YES22", "CLUB23", "HOT24", "COOL25", 
    "WIN26", "FAST27", "NEW28", "GOLD29", "TOP30", "ACE31"
  ];

  const dateObj = new Date();
  const dailyCode = monthlyCodes[dateObj.getDate() - 1]; 
  const todayLabel = dateObj.toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/addresses");
        const data = await response.json();
        setResults(data.deals || []); 
      } catch (err) {
        console.error("Fetch error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleOpenModal = (deal: BogoDeal) => {
    setReportingDeal(deal);
    setReportReason("");
    setReportDetails("");
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingDeal || !reportReason) return;

    setSubmittingReport(true);
    try {
      const response = await fetch("/api/report-deal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealId: reportingDeal.id,
          businessName: reportingDeal.biz,
          offer: reportingDeal.offer,
          location: reportingDeal.street,
          reason: reportReason,
          details: reportDetails,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Thank you! Your report has been submitted to compliance.");
        setReportingDeal(null);
      } else {
        alert("Failed to submit report. Please try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("A system network error occurred.");
    } finally {
      setSubmittingReport(false);
    }
  };

  const filteredResults = results.filter((deal) => {
    if (!selectedCategory) return true;
    return deal.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div style={{ backgroundColor: "#b2cba2", minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: "50px" }}>
      <style jsx global>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .spinner { 
          border: 4px solid rgba(255,255,255,0.3); 
          border-top: 4px solid white; 
          border-radius: 50%; 
          width: 40px; 
          height: 40px; 
          animation: spin 0.8s linear infinite; 
          margin: 20px auto; 
        }
        .header-wrapper { 
          display: flex; justify-content: space-between; align-items: center; 
          padding: 30px 40px; background: white; border-radius: 8px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #eee;
          margin: 15px auto; max-width: 1100px;
        }
        .logo-container {
          display: inline-flex;
          align-items: center;
        }
        .logo { height: 113px; width: 165px; object-fit: contain; }
        
        .toggle-container { background: #f0f0f0; padding: 5px; border-radius: 50px; display: flex; gap: 5px; }
        .toggle-btn { 
          padding: 12px 30px; border-radius: 50px; border: none; cursor: pointer; 
          font-weight: bold; transition: 0.3s; background: transparent; color: #1d4370; 
          font-size: 1.1rem; text-decoration: none; display: inline-block;
        }
        .toggle-btn.active { background: #1d4370; color: white; }
        
        .local-deals-title { 
          background-color: #1d4370; color: white; padding: 20px 60px; border-radius: 12px; 
          font-weight: bold; font-size: 2.2rem; text-align: center; margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        /* Category Filter Area Row layout */
        .filter-row-container {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 15px;
          max-width: 1100px;
          margin: 25px auto 10px auto;
          padding: 0 15px;
        }
        .filter-label {
          color: #1d4370;
          font-size: 1.3rem;
          font-weight: bold;
        }
        .category-dropdown-styled {
          font-size: 1.2rem; 
          padding: 12px 25px; 
          border-radius: 25px; 
          border: none; 
          background: white; 
          color: #1d4370; 
          font-weight: bold; 
          outline: none;
          min-width: 260px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .daily-code-box {
          background-color: #1d4370; color: white; padding: 25px; border-radius: 12px; 
          text-align: center; margin: 15px auto 10px auto; max-width: 1100px; border: 2px solid #51a3a3;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        
        .report-button-action {
          margin-top: 10px;
          font-size: 0.78rem;
          color: #d9534f;
          font-weight: bold;
          background: transparent;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 0;
          transition: color 0.2s;
        }
        .report-button-action:hover {
          color: #b52b27;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .header-wrapper { flex-direction: column; gap: 20px; text-align: center; }
          .toggle-container { flex-direction: column; width: 100%; border-radius: 15px; }
          .toggle-btn { text-align: center; width: 100%; box-sizing: border-box; }
          .filter-row-container { justify-content: center; flex-direction: column; gap: 10px; }
        }
      `}</style>

      <header className="header-wrapper">
        <div className="logo-container">
          <Link href="/"><img src="/bogo-logo.png" alt="BogoCodes" className="logo" /></Link>
        </div>
        <div className="toggle-container">
          <Link href="/" className="toggle-btn">Home</Link>
          <Link href="/local-deals" className="toggle-btn active">Local Deals</Link>
          <Link href="/national-deals" className="toggle-btn">National Deals</Link>
        </div>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 15px" }}>
         <div className="local-deals-title">Local Deals</div>
      </div>

      <div className="filter-row-container">
        <span className="filter-label">Filter by Category:</span>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-dropdown-styled">
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Retail">Retail</option>
          <option value="Services">Services</option>
          <option value="Health & Beauty">Health & Beauty</option>
          <option value="Fun & Recreation">Fun & Recreation</option>
        </select>
      </div>

      {filteredResults.length > 0 && (
        <div className="daily-code-box">
          <div style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px", opacity: 0.8, marginBottom: "5px" }}>
            Daily Redemption Code for {todayLabel}
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: "900", letterSpacing: "5px" }}>
            {dailyCode}
          </div>
        </div>
      )}

      {loading && <div className="spinner"></div>}

      {!loading && filteredResults.length === 0 && (
        <div style={{ textAlign: "center", color: "#1d4370", margin: "40px 0", fontWeight: "bold", fontSize: "1.2rem" }}>
          No deals currently available. Check back soon!
        </div>
      )}

      <div style={{ padding: "20px 15px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "25px", maxWidth: "1100px", margin: "0 auto" }}>
        {filteredResults.map((item) => (
          <div key={item.id} style={{ backgroundColor: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", display: "flex", gap: "20px", borderTop: "6px solid #51a3a3", alignItems: "flex-start" }}>
             <div style={{ fontSize: "3rem", lineHeight: "1", paddingTop: "4px" }}>{item.logo}</div>
             <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%", overflow: "hidden" }}>
                <span style={{ color: "#51a3a3", fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>{item.category} Deal</span>
                <h2 style={{ margin: 0, color: "#333", fontSize: "1.4rem", fontWeight: "bold", lineHeight: "1.2", wordBreak: "break-word" }}>{item.biz}</h2>
                <p style={{ margin: "4px 0 0 0", color: "#51a3a3", fontWeight: "bold", fontSize: "1.1rem", lineHeight: "1.3" }}>{item.offer}</p>
                <p style={{ margin: "8px 0 0 0", fontSize: "0.85rem", color: "#888", lineHeight: "1.4" }}>{item.street}</p>
                
                <button type="button" onClick={() => handleOpenModal(item)} className="report-button-action">
                  ⚠️ Report This Coupon
                </button>
             </div>
          </div>
        ))}
      </div>

      {reportingDeal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "15px" }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", maxWidth: "500px", width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.15)", color: "#333" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#1d4370", fontSize: "1.5rem" }}>Report: {reportingDeal.biz}</h3>
            <p style={{ margin: "0 0 20px 0", color: "#666", fontSize: "0.9rem" }}>Offer: {reportingDeal.offer}</p>
            
            <form onSubmit={handleSubmitReport} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "5px", fontWeight: "bold", fontSize: "0.9rem" }}>
                Reason for report:
                <select required value={reportReason} onChange={(e) => setReportReason(e.target.value)} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", outline: "none", fontSize: "1rem" }}>
                  <option value="">-- Choose Reason --</option>
                  <option value="unresponsive">Unresponsive / Merchant Refused Coupon</option>
                  <option value="prohibited">Prohibited Products</option>
                  <option value="closed">Business Closed Permanently</option>
                  <option value="fine-print">Fine-Print Misrepresentation Issue</option>
                </select>
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "5px", fontWeight: "bold", fontSize: "0.9rem" }}>
                Additional Details:
                <textarea rows={4} value={reportDetails} onChange={(e) => setReportDetails(e.target.value)} placeholder="Provide context to facilitate curation tasks..." style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", outline: "none", fontFamily: "sans-serif", fontSize: "0.95rem" }} />
              </label>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button type="button" onClick={() => setReportingDeal(null)} style={{ padding: "10px 20px", borderRadius: "6px", border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer", fontWeight: "bold" }}>Cancel</button>
                <button type="submit" disabled={submittingReport} style={{ padding: "10px 20px", borderRadius: "6px", border: "none", background: "#d9534f", color: "white", cursor: "pointer", fontWeight: "bold" }}>
                  {submittingReport ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}