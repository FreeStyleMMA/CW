import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import "./HomePage.css";

import {
  getOverview,
  getRecentRecords,
} from "../api/DashboardApi";

export default function HomePage() {
  const [overview, setOverview] = useState({
    totalRecords: 0,
    averageRating: 0,
    totalBeans: 0,
  });

  const [recentRecords, setRecentRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [overviewData, recentData] = await Promise.all([
          getOverview(),
          getRecentRecords(),
        ]);

        setOverview({
          totalRecords: overviewData?.totalRecords ?? 0,
          averageRating: overviewData?.averageRating ?? 0,
          totalBeans: overviewData?.totalBeans ?? 0,
        });

        setRecentRecords(Array.isArray(recentData) ? recentData : []);
      } catch (error) {
        console.error("홈페이지 데이터 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <MainLayout>
      <div className="home-page">
        {/* Hero */}
        <section className="hero">
          <p className="hero-eyebrow">COFFEE WRITER</p>

          <h1>
            커피, 오늘의 기록
          </h1>

          <p className="hero-description">
            기록하고, 비교하고, 더 나은 한 잔을 만들어보세요.
          </p>

          <Link
            to="/recipe/espresso/write"
            className="record-button"
          >
            + 추출 일지 작성
          </Link>
        </section>

        {/* 최근 기록 */}
        <section className="recent-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">JOURNAL</p>
              <h3>최근 기록</h3>
            </div>

            <Link
              to="/recipe/espresso"
              className="view-all-button"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="empty-record">
              최근 기록을 불러오는 중입니다.
            </div>
          ) : recentRecords.length === 0 ? (
            <div className="empty-record">
              아직 작성한 추출 기록이 없습니다.
              <br />
              첫 번째 커피 기록을 작성해보세요.
            </div>
          ) : (
            <div className="espresso-list">
              {recentRecords.map((record) => (
                <Link
                  to={`/recipe/espresso/${record.id}`}
                  className="espresso-card"
                  key={record.id}
                >
                  <div className="espresso-info">
                    <p className="espresso-bean">
                      {record.beanName || "미등록 원두"}
                    </p>

                    <p className="espresso-roastery">
                      {record.roasteryName || "로스터리 미등록"}
                    </p>

                    <p className="espresso-meta">
                      {record.dose ?? "-"}g →{" "}
                      {record.yield ?? "-"}g ·{" "}
                      {record.extractionTime ?? "-"}s
                    </p>

                    <p className="espresso-date">
                      {record.recordDate || ""}
                    </p>
                  </div>

                  <div className="espresso-rating">
                    <span>★</span>
                    {record.rating ?? 0}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Overview */}
        <section className="stats-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">OVERVIEW</p>
              <h2>에스프레소 기록</h2>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <strong>{overview.totalRecords}</strong>
              <span>Records</span>
            </div>

            <div className="stat">
              <strong>
                {Number(overview.averageRating).toFixed(1)}
              </strong>
              <span>Avg Rating</span>
            </div>

            <div className="stat">
              <strong>{overview.totalBeans}</strong>
              <span>Beans</span>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}