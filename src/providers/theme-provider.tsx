"use client";
import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  let primaryColor = "#000";
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          borderRadius: 2,
        },
        components: {
          Button: {
            boxShadow: "none",
            controlOutline: "none",
            colorBorder: primaryColor,
            controlHeight: 40,
            defaultBg: "transparent",
            defaultHoverBg: "transparent",
            borderColorDisabled: 'transparent',
          },
          Input: {
            activeShadow: "none",
            controlOutline: "none",
            controlHeight: 40,
          },
          InputNumber: {
            controlHeight: 40,
            controlOutline: "none",
          },
          Select: {
            controlHeight: 40,
            boxShadow: "none",
            controlOutline: "none",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
