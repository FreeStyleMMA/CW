import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../api/axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
   * 현재 로그인 사용자 조회
   */
  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await api.get("/api/auth");

      setUser(response.data ?? null);
    } catch (error) {
     
      if (error.response?.status !== 401) {
        console.error("현재 사용자 조회 실패:", error);
      }

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * 앱 최초 실행 시 로그인 상태 확인
   */
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  /*
   * 로그인 성공 시 호출
   * api에서 정보 받고 저장
   * 정보 조회 실패 시 다시 요청
   */
  const login = useCallback(
    async (memberId, password) => {
      const response = await api.post("/api/auth/login", {
        memberId, password
    });

      const loginUser = response.data;

      if (loginUser) {
        setUser(loginUser);
      } else {
        await fetchCurrentUser();
      }

      return response.data;
    },
    [fetchCurrentUser]
  );

  /*
   * 로그아웃
   */
  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      
      console.error("로그아웃 요청 실패:", error);
    } finally {
      setUser(null);
    }
  }, []);

  /*
   * 로그인 여부
   */
  const isAuthenticated = Boolean(user);

 
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      loading,
      isAuthenticated,
      login,
      logout,
      refreshUser: fetchCurrentUser,
    }),
    [
      user,
      loading,
      isAuthenticated,
      login,
      logout,
      fetchCurrentUser,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/*
 * 컴포넌트에서 사용하는 커스텀 Hook
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth는 AuthProvider 내부에서 사용해야 합니다."
    );
  }

  return context;
}