"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BackgroundVideo from "@/components/BackgroundVideo";
export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState();
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(screenWidth);
  useEffect(() => {
    session &&
      router.push(
        `/LandingPage`
      );
  }, [session]);
  return (
    <>
      <BackgroundVideo />
      <section className={styles.header}>
        <h1>PARUL HACK-VERSE</h1>
      </section>
      <section className={styles.card}>
        <div className={styles.textData}>
          <div className={styles.details}>
            <h1>Registrations Open</h1>
            <div className={styles.specifics}>
              <h2>Till 25th October</h2>
              <p>
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1.3rem"
                    width="1.3rem"
                  >
                    <path d="M19.5 4h-3V2.5a.5.5 0 00-1 0V4h-7V2.5a.5.5 0 00-1 0V4h-3A2.503 2.503 0 002 6.5v13A2.503 2.503 0 004.5 22h15a2.502 2.502 0 002.5-2.5v-13A2.502 2.502 0 0019.5 4zM21 19.5c0 .828-.672 1.5-1.5 1.5h-15C3.67 21 3 20.328 3 19.5V11h18v8.5zm0-9.5H3V6.5C3 5.672 3.67 5 4.5 5h3v1.5a.5.5 0 001 0V5h7v1.5a.5.5 0 001 0V5h3c.828 0 1.5.672 1.5 1.5V10z" />
                  </svg>
                </span>
                3-4 January 2025
              </p>
              <p>
                <span>
                  <svg
                    viewBox="0 0 500 1000"
                    fill="currentColor"
                    height="1.3rem"
                    width="1.3rem"
                  >
                    <path d="M250 100c69.333 0 128.333 24.333 177 73s73 107.667 73 177c0 70.667-20.667 151.667-62 243s-83.333 165.667-126 223l-62 84c-6.667-8-15.667-19.667-27-35-11.333-15.333-31.333-45-60-89s-54-87.333-76-130-42-91.667-60-147S0 394 0 350c0-69.333 24.333-128.333 73-177s107.667-73 177-73m0 388c37.333 0 69.333-13.333 96-40s40-58.667 40-96-13.333-69-40-95-58.667-39-96-39-69 13-95 39-39 57.667-39 95 13 69.333 39 96 57.667 40 95 40" />
                  </svg>
                </span>
                Parul University, Vadodara
              </p>
              <p>
                <span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.3rem"
                    width="1.3rem"
                  >
                    <path d="M22 12 A10 10 0 0 1 12 22 A10 10 0 0 1 2 12 A10 10 0 0 1 22 12 z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                48 hour Hackathon
              </p>
              <div className={styles.prize}>
                <img src="/images/trophy.png" alt="" />
                <div className={styles.prizeDetails}>
                  <h5>Prize Pool Worth</h5>
                  <h5>6.45 Lakh rupees</h5>
                </div>
              </div>
            </div>
            <section className={styles.logos}>
              <img src="/images/GKM_logo.png" alt="" />
              <img src="/images/Nexium_logo.png" alt="" />
              <img src="/images/RYM_logo.png" alt="" />
              <img src="/images/University_logo.png" alt="" />
            </section>
          </div>
          <div className={styles.registerbtn}>
            <button
              onClick={() => {
                signIn("google");
              }}
            >
              Register Now
            </button>
          </div>
        </div>
        {screenWidth > 426 && (
          <img
            src="/videos/gif_blob.gif"
            alt="Animated GIF"
            className={styles.animatedGif}
          />
        )}
      </section>
    </>
  );
}
