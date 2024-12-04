"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

// Redux Provider 컴포넌트
export default function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
