import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { generateSEOMetadata } from "@/components/seo-head";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = generateSEOMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            // Only load Tawk.to on non-admin pages
            if (!window.location.pathname.startsWith('/admin')) {
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
            }
          `}
        </Script>
      </body>
    </html>
  );
}
