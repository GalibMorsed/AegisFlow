import React, { useState } from "react";
import Nav from "../homeComponents/Nav";
import ChatBox from "../homeComponents/Chat_bot";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can integrate backend / email service later.
    console.log("Contact form submitted:", form);

    setSubmitted(true);
    window.alert("Your message has been sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Nav />

      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {/* Header */}
          <header className="mb-6">
            <p className="text-[11px] text-slate-500 mb-1">
              Support &gt; Contact
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              Contact & support
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Reach out if you need help, want to report an issue, or have a
              suggestion about the Crowd Management System.
            </p>
          </header>

          {/* Main content card */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
            {/* Contact form */}
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-4">
                Send us a message
              </h2>

              {submitted && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] text-emerald-700">
                  Your message has been sent. We&apos;ll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What do you need help with?"
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your question, issue, or feedback."
                    rows={4}
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-slate-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Contact info / quick help */}
            <aside className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 mb-2">
                  Quick information
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  This contact form is intended for support regarding camera
                  setup, staff management, events, and general system usage.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <p className="font-medium text-slate-900 text-[13px]">
                    Typical topics
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Issues with logging in or accessing your profile</li>
                    <li>Problems with tasks, events, or staff assignments</li>
                    <li>Suggestions to improve the dashboard or workflow</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-slate-900 text-[13px]">
                    Internal contact
                  </p>
                  <p className="mt-1">
                    Please refer to your project coordinator or system
                    administrator for operational or urgent issues.
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                We aim to review messages regularly during working hours.
              </div>
            </aside>
          </section>

          <div className="text-center mt-8 text-[11px] text-slate-500">
            © {currentYear} Crowd Management System. All rights reserved.
          </div>
        </main>
      </div>
      <ChatBox />
    </>
  );
};

export default ContactPage;
