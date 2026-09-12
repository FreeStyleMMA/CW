import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";

import "./BeanCompairPage.css";

export default function BeanComparePage() {
  const [searchParams] = useSearchParams();

  const beanId = searchParams.get("beanId");

  const [records, setRecords] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  
  console.log("요청 beanId",beanId);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!beanId) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          `/api/recipe/bean/${beanId}`
        );
        const data = Array.isArray(response.data)
          ? response.data
          : [];

        setRecords(data);

        /*
         * 처음에는 최신 기록 2개를 기본 선택
         */
        setSelectedIds(
          data
            .slice(0, 2)
            .map((record) => record.id)
        );
      } catch (error) {
        console.error("원두 기록 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [beanId]);

  const selectedRecords = useMemo(() => {
    return records.filter((record) =>
      selectedIds.includes(record.id)
    );
  }, [records, selectedIds]);

  const handleSelect = (recordId) => {
    setSelectedIds((previous) => {
      if (previous.includes(recordId)) {
        return previous.filter((id) => id !== recordId);
      }

      if (previous.length >= 3) {
        alert("최대 3개까지 비교할 수 있습니다.");
        return previous;
      }

      return [...previous, recordId];
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="compare-page">
          기록을 불러오는 중입니다.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="compare-page">
        <section className="compare-header">
          <p className="compare-eyebrow">
            레시피 연구소
          </p>

          <h1>추출 기록 비교</h1>

          <p>
            동일한 원두로 추출한 기록을 선택해
            결과를 비교해보세요.
          </p>
        </section>

        <section className="record-selection">
          <div className="selection-header">
            <h2>비교할 기록 선택</h2>
            <span>
              {selectedIds.length} / 3
            </span>
          </div>

          {records.length === 0 ? (
            <div className="empty-record">
              비교할 추출 기록이 없습니다.
            </div>
          ) : (
            <div className="record-options">
              {records.map((record) => (
                <label
                  className="record-option"
                  key={record.id}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(record.id)}
                    onChange={() => handleSelect(record.id)}
                  />

                  <div>
                    <strong>
                      {record.createdAt || "날짜 미등록"}
                    </strong>

                    <span>
                      {record.dose ?? "-"}g →{" "}
                      {record.espressoOutput ?? "-"}g ·{" "}
                      {record.extractSecond ?? "-"}초
                    </span>
                  </div>

                  <em>
                    ★ {record.rating ?? 0}
                  </em>
                </label>
              ))}
            </div>
          )}
        </section>

        {selectedRecords.length > 0 && (
          <section className="comparison-section">
            <div className="comparison-title">
              <h2>추출 결과 비교</h2>
              <span>
                {selectedRecords[0]?.beanName || "원두"}
              </span>
            </div>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>항목</th>

                    {selectedRecords.map((record) => (
                      <th key={record.id}>
                        {record.createdAt || `기록 ${record.id}`}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th>투입량</th>

                    {selectedRecords.map((record) => (
                      <td key={record.id}>
                        {record.dose ?? "-"}g
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>추출량</th>

                    {selectedRecords.map((record) => (
                      <td key={record.id}>
                        {record.espressoOutput ?? "-"}g
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>추출 시간</th>

                    {selectedRecords.map((record) => (
                      <td key={record.id}>
                        {record.extractSecond ?? "-"}초
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>추출 비율</th>

                    {selectedRecords.map((record) => {
                      const ratio =
                        record.dose && record.espressoOutput
                          ? (
                              record.espressoOutput / record.dose
                            ).toFixed(2)
                          : "-";

                      return (
                        <td key={record.id}>
                          {ratio === "-" ? "-" : `${ratio}:1`}
                        </td>
                      );
                    })}
                  </tr>

                 <tr>
  <th>평점</th>

  {selectedRecords.map((record) => (
    <td key={record.id}>
      {"★".repeat(record.rating ?? 0)}
    </td>
  ))}
</tr>

                  <tr>
                    <th>수온</th>

                    {selectedRecords.map((record) => (
                      <td key={record.id}>
                        {record.temperature
                          ? `${record.temperature}℃`
                          : "-"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>분쇄도</th>

                    {selectedRecords.map((record) => (
                      <td key={record.id}>
                        {record.grindingSize ?? "-"}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th>메모</th>

                    {selectedRecords.map((record) => (
                      <td key={record.id}>
                        {record.note || "-"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
}