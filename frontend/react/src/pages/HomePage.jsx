import MainLayout from "../layouts/MainLayout";
import "./HomePage.css";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="home-page">

        <section className="hero">
          <p className="hero-eyebrow">COFFEE WRITER</p>

          <h1>
            Your coffee,
            <br />
            your records.
          </h1>

          <p className="hero-description">
            기록하고, 비교하고, 더 나은 한 잔을 만들어보세요.
          </p>

          <button className="record-button">
            + Record Espresso
          </button>
        </section>


        <section className="recent-section">

          <div className="section-header">
            <div>
              <p className="section-eyebrow">JOURNAL</p>
              <h2>Recent Espresso</h2>
            </div>

            <button className="view-all-button">
              View all →
            </button>
          </div>


          <div className="espresso-list">

            <article className="espresso-card">

              <div className="espresso-info">
                <p className="espresso-bean">
                  Ethiopia Guji
                </p>

                <p className="espresso-meta">
                  18g → 40g · 28s
                </p>
              </div>

              <div className="espresso-rating">
                <span>★</span>
                4.5
              </div>

            </article>


            <article className="espresso-card">

              <div className="espresso-info">
                <p className="espresso-bean">
                  Colombia Pink Bourbon
                </p>

                <p className="espresso-meta">
                  18g → 36g · 30s
                </p>
              </div>

              <div className="espresso-rating">
                <span>★</span>
                4.0
              </div>

            </article>

          </div>

        </section>


        <section className="stats-section">

          <div className="section-header">
            <div>
              <p className="section-eyebrow">OVERVIEW</p>
              <h2>Your Espresso</h2>
            </div>
          </div>

          <div className="stats">

            <div className="stat">
              <strong>24</strong>
              <span>Records</span>
            </div>

            <div className="stat">
              <strong>4.2</strong>
              <span>Avg Rating</span>
            </div>

            <div className="stat">
              <strong>18</strong>
              <span>Beans</span>
            </div>

          </div>

        </section>

      </div>
    </MainLayout>
  );
}