import React, { useEffect } from "react";
import PageHeader from "../components/common/PageHeader";
import "./Weddings.css";
import {
  FaUserFriends,
  FaFan,
  FaCamera,
  FaMusic,
  FaGlassCheers,
  FaRecordVinyl,
  FaShieldAlt,
} from "react-icons/fa";
import AOS from "aos";

const Weddings = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="page weddings-page-design">
      <PageHeader
        title="WEDDINGS & EVENTS"
        subtitle="Create timeless memories at Gorakhpur's most prestigious wedding destination."
        bgImage="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      {/* --- Section 1: The Wedding Lawn --- */}
      <section className="wedding-section light">
        <div className="container">
          {/* Header */}
          <div className="text-center" data-aos="fade-up">
            <span className="sub-heading">GRAND CELEBRATIONS</span>
            <h2 className="main-heading">THE WEDDING LAWN</h2>
            <div className="separator-center"></div>
            <p className="section-desc-center">
              Spread across acres of manicured gardens, our grand wedding lawn
              is the largest in Gorakhpur, designed to host celebrations of
              unmatched grandeur.
            </p>
          </div>

          {/* Setup Split */}
          <div className="lawn-content-split">
            <div className="lawn-image-wrapper" data-aos="fade-right">
              <img
                src="https://i.pinimg.com/1200x/d4/9e/ae/d49eaec1fd128542eb69857c51a214d0.jpg"
                alt="Wedding Lawn Setup"
              />
            </div>
            <div className="lawn-text-content" data-aos="fade-left">
              <p>
                Imagine exchanging vows under a canopy of stars on a lush green
                lawn that stretches as far as the eye can see. Our grand wedding
                lawn accommodates over 2,500 guests, making it the perfect venue
                for lavish Indian weddings where no detail is too small and no
                celebration too grand.
              </p>
              <p>
                The lawn features a professionally designed floral aisle flanked
                by towering palm trees, an ornate fountain that serves as a
                breathtaking backdrop, and a grand stage equipped with
                state-of-the-art lighting and sound systems. Every corner of the
                venue offers a picture-perfect moment for your pre-wedding
                shoot.
              </p>
              <p>
                Our dedicated events team works closely with you to bring your
                vision to life — from traditional décor themes to contemporary
                minimal setups. At Elevate Resort, your wedding isn't just an
                event; it's a masterpiece.
              </p>
              <button className="inquire-btn">INQUIRE NOW</button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="lawn-features-grid">
            <div
              className="lawn-feature-card"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <FaUserFriends className="lawn-icon" />
              <h4>2500+ CAPACITY</h4>
              <span>
                The largest wedding lawn in Gorakhpur, perfect for grand
                celebrations.
              </span>
            </div>
            <div
              className="lawn-feature-card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <FaFan className="lawn-icon" />
              <h4>FLORAL DÉCOR</h4>
              <span>
                Stunning floral styles, mandap decorations, and petal-free
                walkways.
              </span>
            </div>
            <div
              className="lawn-feature-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaCamera className="lawn-icon" />
              <h4>PRE-WEDDING SHOOTS</h4>
              <span>
                Picturesque spots throughout the resort for memorable photo
                sessions.
              </span>
            </div>
            <div
              className="lawn-feature-card"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <FaMusic className="lawn-icon" />
              <h4>GRAND STAGE</h4>
              <span>
                Professional stage setup with premium sound and lighting
                systems.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Poolside Functions --- */}
      <section className="wedding-section dark">
        <div className="container">
          {/* Header */}
          <div className="text-center" data-aos="fade-up">
            <span className="sub-heading">PRE-WEDDING FESTIVITIES</span>
            <h2 className="main-heading">POOLSIDE FUNCTIONS</h2>
            <div className="separator-center"></div>
            <p className="section-desc-center">
              From vibrant Haldi ceremonies to sparkling cocktail evenings, our
              poolside venues add a splash of magic to your celebrations.
            </p>
          </div>

          <div className="poolside-content-split">
            <div className="poolside-text-col" data-aos="fade-right">
              <p>
                Our poolside event area transforms into a vibrant celebration
                space for Haldi, Mehendi, Sangeet, and cocktail parties. With
                dedicated DJ decks, ambient lighting, and professionally
                designed décor setups, every pre-wedding function becomes an
                unforgettable experience.
              </p>
              <p>
                Safety is our priority — our swimming pool features 24/7
                ozonation filtration technology, ensuring crystal-clear, safe
                water for all guests. The poolside area can be customized with
                floating flowers, lanterns, and themed decorations to match your
                celebration's color palette.
              </p>

              {/* 3 Green Glass Cards */}
              <div className="poolside-cards-row">
                <div className="glass-card">
                  <FaGlassCheers className="glass-icon" />
                  <h5>HALDI & MEHENDI</h5>
                  <span>
                    Vibrant poolside celebrations with traditional and modern
                    setups.
                  </span>
                </div>
                <div className="glass-card">
                  <FaRecordVinyl className="glass-icon" />
                  <h5>DJ DECK & COCKTAILS</h5>
                  <span>
                    Dedicated DJ area and service stations for lively evening
                    functions.
                  </span>
                </div>
                <div className="glass-card">
                  <FaShieldAlt className="glass-icon" />
                  <h5>24/7 OZONATION</h5>
                  <span>
                    Safety-first filtration technology ensuring crystal-clear,
                    safe water.
                  </span>
                </div>
              </div>

              <button className="inquire-btn">PLAN YOUR FUNCTION</button>
            </div>

            <div className="poolside-img-col" data-aos="fade-left">
              <img
                src="https://i.pinimg.com/736x/e5/ff/4e/e5ff4e17dcabdaed21400614b77c317c.jpg"
                alt="Poolside Haldi Function"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Weddings;
