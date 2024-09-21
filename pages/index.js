// pages/index.js
import { getSession } from "next-auth/react";
import FindHero from "@/components/FindHero";

export default function Home({ session }) {
  // Render the protected content if the user is signed in
  return (
    <div>
      <FindHero />
    </div>
  );
}

// Use getServerSideProps to check the session and redirect if not logged in
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If there's no session, redirect to the login page
  if (!session) {
    return {
      redirect: {
        destination: '/login', // Redirect to your login page
        permanent: false,
      },
    };
  }

  // Pass the session data to the page as a prop
  return {
    props: { session },
  };
}
