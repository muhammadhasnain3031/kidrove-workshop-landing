"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WorkshopPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus(res.ok ? "success" : "error");

      if (res.ok) {
        setFormData({ name: "", email: "", phone: "" });
      }
    } catch {
      setStatus("error");
    }
  };

  const faqs = [
    {
      q: "Do students need coding experience?",
      a: "No. This workshop is beginner friendly.",
    },
    {
      q: "Will recordings be available?",
      a: "Yes, all sessions will be recorded.",
    },
    {
      q: "Will students get a certificate?",
      a: "Yes, completion certificate will be provided.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  };

  return (
    <main className="min-h-screen bg-slate-50 text-gray-900">

      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                Summer 2026
              </span>

              <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
                AI & Robotics Workshop
              </h1>

              <p className="mt-6 text-lg text-white/90">
                Hands-on learning in AI, robotics, automation and future tech
                for kids with real projects.
              </p>

              <div className="flex gap-4 mt-8">
                <a
                  href="#register"
                  className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
                >
                  Enroll Now
                </a>

                <button className="border border-white px-6 py-3 rounded-xl hover:bg-white/10">
                  Learn More
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
            >
              <div className="grid grid-cols-2 gap-4 text-black">
                {[
                  ["Age", "8-14"],
                  ["Duration", "4 Weeks"],
                  ["Mode", "Online"],
                  ["Fee", "₹2,999"],
                ].map(([k, v], i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl p-4"
                  >
                    <p className="font-bold">{k}</p>
                    <p>{v}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Workshop Details
        </h2>

        <div className="grid md:grid-cols-5 gap-6">
          {[
            ["Age", "8-14"],
            ["Duration", "4 Weeks"],
            ["Mode", "Online"],
            ["Fee", "₹2,999"],
            ["Start", "15 July 2026"],
          ].map(([t, v], i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <h3 className="font-semibold text-gray-600">{t}</h3>
              <p className="text-xl font-bold text-indigo-600 mt-2">{v}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LEARNING */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Learning Outcomes
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "AI Basics",
              "Robotics Fundamentals",
              "Problem Solving",
              "Mini Projects",
              "Coding Logic",
              "Future Tech Awareness",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-100 p-5 rounded-xl font-medium"
              >
                ✅ {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-10">FAQs</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              layout
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenFaq(openFaq === i ? null : i)
                }
                className="w-full text-left p-5 font-semibold"
              >
                {faq.q}
              </button>

              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-5 pb-5 text-gray-600"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" className="max-w-3xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-3xl p-10"
        >
          <h2 className="text-4xl font-bold text-center mb-8">
            Register Now
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              className="w-full border p-4 rounded-xl text-gray-900 placeholder:text-gray-400"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              className="w-full border p-4 rounded-xl text-gray-900 placeholder:text-gray-400"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              className="w-full border p-4 rounded-xl text-gray-900 placeholder:text-gray-400"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <button
              disabled={status === "loading"}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-60"
            >
              {status === "loading"
                ? "Submitting..."
                : "Confirm Registration"}
            </button>
          </form>

          {status === "success" && (
            <p className="text-green-600 text-center mt-4 font-bold">
              Registration Successful 🎉
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 text-center mt-4 font-bold">
              Something went wrong
            </p>
          )}
        </motion.div>
      </section>
    </main>
  );
}