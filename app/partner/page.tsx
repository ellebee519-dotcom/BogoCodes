"use client";

import React, { useState } from "react";
import Link from "next/link";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function MerchantPreLaunchPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    category: "Food",
    proposedOffer: "",
    street: "",
    city: "",
    state: "MO",
    zipCode: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/merchant-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <div style={{ backgroundColor: "#b2cba2", minHeight: "100vh", fontFamily: "sans-serif", padding: "40px 15px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        
        {/* Centered Logo */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Link href="/">
            <img 
              src="/bogo-logo.png" 
              alt="BogoCodes" 
              style={{ height: "110px", width: "auto", objectFit: "contain", cursor: "pointer" }} 
            />
          </Link>
        </div>

        {status === "success" ? (
          /* Success Screen Only */
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <h1 style={{ color: "#1d4370", marginTop: 0, fontSize: "2rem" }}>
              Welcome Partner!
            </h1>
            <div style={{ backgroundColor: "#e6f4ea", color: "#137333", padding: "20px", borderRadius: "8px", marginTop: "20px", textAlign: "center", lineHeight: "1.6" }}>
              Your deal submission has been received. We will be in touch before our official launch in November.
            </div>
          </div>
        ) : (
          /* Pre-Submission Screen */
          <>
            <h1 style={{ color: "#1d4370", marginTop: 0, textAlign: "center" }}>
              Partner With Us Before Launch!
            </h1>
            <p style={{ color: "#555", lineHeight: "1.5", textAlign: "center" }}>
              We are officially launching in <strong>November</strong>. Submit your offer details below to get listed when we go live.
            </p>

            {status === "error" && (
              <div style={{ backgroundColor: "#fce8e6", color: "#c5221f", padding: "12px", borderRadius: "8px", marginBottom: "15px", textAlign: "center" }}>
                An error occurred while submitting. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
              <label style={{ fontWeight: "bold", color: "#333" }}>
                Business Name:
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", boxSizing: "border-box" }}
                />
              </label>

              <label style={{ fontWeight: "bold", color: "#333" }}>
                Contact Email:
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", boxSizing: "border-box" }}
                />
              </label>

              <label style={{ fontWeight: "bold", color: "#333" }}>
                Category:
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", boxSizing: "border-box" }}
                >
                  <option value="Food">Food</option>
                  <option value="Retail">Retail</option>
                  <option value="Services">Services</option>
                  <option value="Health & Beauty">Health & Beauty</option>
                  <option value="Fun & Recreation">Fun & Recreation</option>
                </select>
              </label>

              <label style={{ fontWeight: "bold", color: "#333" }}>
                Proposed Offer (e.g., Buy 1 Get 1 Free Appetizer):
                <input
                  type="text"
                  required
                  value={formData.proposedOffer}
                  onChange={(e) => setFormData({ ...formData, proposedOffer: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", boxSizing: "border-box" }}
                />
              </label>

              <label style={{ fontWeight: "bold", color: "#333" }}>
                Street Address:
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", boxSizing: "border-box" }}
                />
              </label>

              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "10px" }}>
                <label style={{ fontWeight: "bold", color: "#333" }}>
                  City:
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", boxSizing: "border-box" }}
                  />
                </label>

                <label style={{ fontWeight: "bold", color: "#333" }}>
                  State:
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", boxSizing: "border-box", backgroundColor: "white" }}
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={{ fontWeight: "bold", color: "#333" }}>
                  Zip Code:
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", boxSizing: "border-box" }}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  backgroundColor: "#1d4370",
                  color: "white",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                {status === "submitting" ? "Submitting..." : "Submit Pre-Launch Offer"}
              </button>
            </form>
          </>
        )}

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link href="/" style={{ color: "#1d4370", textDecoration: "underline" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}