// pages/index.js
import FindHero from "@/components/FindHero";
import PopularHouses from "@/components/PopularHouses";
import Footer from "@/components/Footer";
import withAuth from "@/HOC/withAuth"; // Import the HOC

function Home() {
  // Render the protected content if the user is signed in
  return (
    <div>
      <FindHero />
      <PopularHouses />
      <Footer />
    </div>
  );
}

// Wrap the Home component with the HOC
export default withAuth(Home);
