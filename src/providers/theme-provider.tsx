"use client";
import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  let primaryColor = "#252B37";
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          borderRadius : 2,
        },
        components: {
            Button: {
                boxShadow :'none',
                controlOutline : 'none',
                colorBorder : primaryColor,
                controlHeight : 45,
            },
            Input: {
                activeShadow : 'none',
                controlOutline : 'none',
                controlHeight : 45,
            },
            Select: {
                controlHeight : 45,
                boxShadow : 'none',
                controlOutline : 'none',
            },
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
