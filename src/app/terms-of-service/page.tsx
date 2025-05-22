//src/app/terms-of-service/page.tsx

import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service - Game Explorer",
  description: "Read the Game Explorer Terms of Service.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <FileText className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100">
            Terms of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">
              Service
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last updated: [Date - e.g., October 26, 2023]
          </p>
        </header>

        <div className="prose prose-slate prose-invert max-w-none bg-slate-800/70 backdrop-blur-sm border border-slate-700 p-6 sm:p-8 rounded-xl shadow-xl leading-relaxed">
          <h2>1. AGREEMENT TO TERMS</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity (“you”)
            and [Your Company Name] (“we,” “us” or “our”), concerning your
            access to and use of the [Your Website URL] website as well as any
            other media form, media channel, mobile website or mobile
            application related, linked, or otherwise connected thereto
            (collectively, the “Site”).
          </p>
          <p>
            You agree that by accessing the Site, you have read, understood, and
            agree to be bound by all of these Terms of Service. If you do not
            agree with all of these Terms of Service, then you are expressly
            prohibited from using the Site and you must discontinue use
            immediately.
          </p>

          <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and
            all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the “Content”) and the trademarks, service marks, and
            logos contained therein (the “Marks”) are owned or controlled by us
            or licensed to us, and are protected by copyright and trademark
            laws... [Continue with your IP terms].
          </p>
          <p>
            Game data, including images, descriptions, and other related assets,
            are provided by the RAWG Video Games Database API (rawg.io) and are
            subject to their terms and ownership. We do not claim ownership of
            this third-party data.
          </p>

          <h2>3. USER REPRESENTATIONS</h2>
          <p>
            By using the Site, you represent and warrant that: (1) all
            registration information you submit will be true, accurate, current,
            and complete; (2) you will maintain the accuracy of such information
            and promptly update such registration information as necessary...
            [Add more representations as needed].
          </p>

          <h2>4. PROHIBITED ACTIVITIES</h2>
          <p>
            You may not access or use the Site for any purpose other than that
            for which we make the Site available. The Site may not be used in
            connection with any commercial endeavors except those that are
            specifically endorsed or approved by us. As a user of the Site, you
            agree not to: ... [List prohibited activities, e.g., systematically
            retrieve data, harass, abuse, or harm another person, use the Site
            in a manner inconsistent with any applicable laws or regulations.].
          </p>

          <h2>5. SITE MANAGEMENT</h2>
          <p>
            We reserve the right, but not the obligation, to: (1) monitor the
            Site for violations of these Terms of Service; (2) take appropriate
            legal action against anyone who, in our sole discretion, violates
            the law or these Terms of Service... [Add more site management
            terms].
          </p>

          <h2>6. TERM AND TERMINATION</h2>
          <p>
            These Terms of Service shall remain in full force and effect while
            you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE
            TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION
            AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE
            (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY
            REASON OR FOR NO REASON... [Continue with termination clauses].
          </p>

          <h2>7. GOVERNING LAW</h2>
          <p>
            These Terms of Service and your use of the Site are governed by and
            construed in accordance with the laws of [Your Jurisdiction, e.g.,
            the State of California] applicable to agreements made and to be
            entirely performed within [Your Jurisdiction], without regard to its
            conflict of law principles.
          </p>

          <h2>8. DISCLAIMER</h2>
          <p>
            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
            THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE
            RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
            WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR
            USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES
            OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT... [Continue with disclaimer].
          </p>

          <h2>9. LIMITATIONS OF LIABILITY</h2>
          <p>
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE
            TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
            EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES... [Continue
            with limitations of liability].
          </p>

          <h2>10. CONTACT US</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive
            further information regarding use of the Site, please contact us at:
            [Your Contact Email or Link to Contact Page].
          </p>
        </div>
      </div>
    </div>
  );
}
