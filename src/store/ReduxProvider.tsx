'use client'; // Bắt buộc phải có dòng này

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}