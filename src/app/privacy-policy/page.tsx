//src/app/privacy-policy/page.tsx
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Game Explorer",
  description:
    "Read the Game Explorer Privacy Policy to understand how we handle your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <ShieldCheck className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100">
            Privacy
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
              Policy
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last updated: [Date - e.g., October 26, 2023]
          </p>
        </header>

        <div className="prose prose-slate prose-invert max-w-none bg-slate-800/70 backdrop-blur-sm border border-slate-700 p-6 sm:p-8 rounded-xl shadow-xl leading-relaxed">
          <p>
            Welcome to Game Explorer ("we," "our," or "us"). We are committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website [Your Website URL, e.g., gameexplorer.com]. Please
            read this privacy policy carefully. If you do not agree with the
            terms of this privacy policy, please do not access the site.
          </p>

          <h2>1. INFORMATION WE COLLECT</h2>
          <p>
            We may collect information about you in a variety of ways. The
            information we may collect on the Site includes:
          </p>
          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, email
            address, etc., that you voluntarily give to us when you [describe
            when you collect personal data, e.g., register with the Site,
            contact us].
          </p>
          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the
            Site, such as your IP address, your browser type, your operating
            system, your access times, and the pages you have viewed directly
            before and after accessing the Site. [Specify if you use analytics
            like Google Analytics]
          </p>

          <h2>2. USE OF YOUR INFORMATION</h2>
          <p>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the Site to: ... [List uses,
            e.g., improve our website, respond to inquiries]
          </p>

          <h2>3. DISCLOSURE OF YOUR INFORMATION</h2>
          <p>
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows: ... [List
            disclosures, e.g., By Law or to Protect Rights, Third-Party Service
            Providers]
          </p>
          <p>
            Our game data is sourced from the RAWG Video Games Database API.
            Please refer to{" "}
            <a
              href="https://rawg.io/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300"
            >
              RAWG's Privacy Policy
            </a>{" "}
            for information on how they handle data.
          </p>

          <h2>4. TRACKING TECHNOLOGIES</h2>
          <h3>Cookies and Web Beacons</h3>
          <p>
            We may use cookies, web beacons, tracking pixels, and other tracking
            technologies on the Site to help customize the Site and improve your
            experience. [Specify your cookie usage].
          </p>

          <h2>5. SECURITY OF YOUR INFORMATION</h2>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>

          <h2>6. POLICY FOR CHILDREN</h2>
          <p>
            We do not knowingly solicit information from or market to children
            under the age of 13. If we learn that we have collected personal
            information from a child under age 13 without verification of
            parental consent, we will delete that information as quickly as
            possible. If you believe we might have any information from or about
            a child under 13, please contact us at [Your Contact Email].
          </p>

          <h2>7. CHANGES TO THIS PRIVACY POLICY</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>

          <h2>8. CONTACT US</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us at: [Your Contact Email or Link to Contact Page]
          </p>
        </div>
      </div>
    </div>
  );
}
