import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { generateSEOMetadata } from "@/components/seo-head";
import Script from "next/script";
import "./globals.css";

const criticalCSS = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
  .bg-gradient-to-br { background: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
  .from-indigo-900 { --tw-gradient-from: #312e81; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(49, 46, 129, 0)); }
  .via-purple-900 { --tw-gradient-stops: var(--tw-gradient-from), #581c87, var(--tw-gradient-to, rgba(88, 28, 135, 0)); }
  .to-pink-900 { --tw-gradient-to: #831843; }
  .text-white { color: #ffffff; }
  .py-24 { padding-top: 6rem; padding-bottom: 6rem; }
  .text-center { text-align: center; }
  .text-6xl { font-size: 3.75rem; line-height: 1; }
  .font-extrabold { font-weight: 800; }
  .mb-6 { margin-bottom: 1.5rem; }
  .bg-white { background-color: #ffffff; }
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .border-b { border-bottom-width: 1px; }
  .h-16 { height: 4rem; }
  .flex { display: flex; }
  .justify-between { justify-content: space-between; }
  .items-center { align-items: center; }
  .text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .font-bold { font-weight: 700; }
  .bg-gray-900 { background-color: #111827; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .grid { display: grid; }
  .gap-8 { gap: 2rem; }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .min-h-screen { min-height: 100vh; }
  .relative { position: relative; }
  .overflow-hidden { overflow: hidden; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
`;

export const metadata: Metadata = generateSEOMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        suppressHydrationWarning={true}
      >
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/673b5b2e2480f5b4f59f4e5a/1id3oj8qs';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
            
            // Customize Tawk.to appearance
            Tawk_API.customStyle = {
              visibility : {
                desktop : {
                  position : 'br',
                  xOffset : 20,
                  yOffset : 20
                },
                mobile : {
                  position : 'br',
                  xOffset : 10,
                  yOffset : 10
                }
              }
            };
          `}
        </Script>
      </body>
    </html>
  );
}
