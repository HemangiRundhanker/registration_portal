"use client";
import BackgroundVideo from "@/components/BackgroundVideo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Maintenance from "@/components/maintenance";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    name: "",
    purpose: "",
    program:"",
    school:""
  });
  const [studentCount, setStudentCount] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    // useEffect doesn't take async function as it's callback directly, instead use the async function inside of it
    const fetchStudentCount = async () => {
      try {
        const response = await fetch("/api/studentCount", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setStudentCount(result.count); // Assuming the response is { count: <number> }
        if (!response.ok) {
          alert("Error fetching student count");
        }
      } catch (error) {
        console.error("Error getting student count:", error);
      }
    };
    fetchStudentCount(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run the effect once

  useEffect(() => {
    if (session) {
      if (
        session.user.email == "rundhankerhemangi@gmail.com"
      ) {
        setIsAdmin(true);
      }
    }
  }, [session]);

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

  // Handle input changes
  const handleInputChange = (e) => {
    const isValidReferralUrl = (str) => {
      const regex =
        /^https:\/\/vision\.hack2skill\.com\/dashboard\/user_public_profile\/\?userId=[a-zA-Z0-9]+&tabIndex=[a-zA-Z]+$/;
      return regex.test(str);
    };
    if (e.target.name == "referral") {
      if (isValidReferralUrl(e.target.value)) {
        setIsValidated(true);
      }
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(isValidated);
  }, [isValidated]);

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // if (!isValidated) {
    //   alert("Enter a valid profile link!");
    //   return false;
    // }
    // Extract email from session
    const email = session?.user?.email; // Ensure session is available
    try {
      setLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email, // Include email from the session
        }),
      });
      const result = await response.json();
      console.log("Response:", result);
      if (response.ok) {
        setLoading(false);
        setSubmitted(true);
        alert("You have registered successfully");
        signOut({ callbackUrl: "/" }).then(() => {
          router.push("/");
        });
      } else {
        alert("Error registering user");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  function downloadStudentData() {
    const handleDownload = async () => {
      try {
        // Send a request to the backend to download the Excel file
        const response = await fetch("/api/importStudents");
        if (!response.ok) {
          throw new Error("Failed to download file");
        }
        // Create a blob from the response data
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        // Create a link element and simulate a click to download the file
        const a = document.createElement("a");
        a.href = url;
        a.download = "users_data.xlsx"; // The filename to save the file as
        document.body.appendChild(a);
        a.click();
        // Clean up the URL object and remove the link
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    };
    handleDownload();
  }

  if (status == "unauthenticated") return <p>Unauthorised</p>;

  return (
    <>
      {session ? (
        <>
          <BackgroundVideo />
          <section
            className={styles.header}
            onClick={
              session && session.user.email == "rundhankerhemangi@gmail.com"
                ? downloadStudentData
                : null
            }
          >
            <h1>Registration Form</h1>
          </section>
          <div className={styles.card}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.firstSection}>
                <section>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </section>
                <section>
                  <label htmlFor="phoneNumber">Contact</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </section>
                <section>
                  <label htmlFor="school">School</label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    required
                  />
                </section>
                <section>
                  <label htmlFor="program">Program</label>
                  <input
                    type="text"
                    name="program"
                    value={formData.program}
                    onChange={handleInputChange}
                    required
                  />
                </section>
                <section>
                  <label htmlFor="year">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                  />
                </section>
                <section>
                  <label htmlFor="enrollmentNum">Enrollment</label>
                  <input
                    type="text"
                    name="enrollmentNum"
                    value={formData.enrollmentNum}
                    onChange={handleInputChange}
                    required
                  />
                </section>
              </div>
              <br />
              <section className={styles.secondSection}>
                <section className={styles.purpose}>
                  <label htmlFor={styles.purpose}>
                    Why do you want to participate?
                  </label>
                  <textarea
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    required
                    rows={screenWidth > 426 ? 2 : 2}
                    cols={screenWidth > 426 ? 2 : 2}
                    placeholder={isAdmin?studentCount:null}
                  />
                </section>
              </section>
              <br />
              <button type="submit" className={styles.submitBtn}>
                {loading?"Submitting":"Submit"}
              </button>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" }).then(() => {
                    router.push("/");
                  });
                }}
                className={styles.signOut}
                type="button"
              >
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
                  </svg>
              </button>
            </form>
          </div>

          {/* {loading && (
            <h1
              style={{
                textAlign: "center",
                color: "white",
                fontFamily:
                  "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                margin: "0.5rem",
              }}
            >
              Saving User Data
            </h1>
          )} */}
        </>
      ) : (
        <p>Loading...</p> // Show loading state or a message if not signed in
      )}
      {/* <Maintenance/> */}
    </>
  );
}
