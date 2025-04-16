'use client';
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportLinkGenerator() {
  const [inputUrl, setInputUrl] = useState("");
  const [report1, setReport1] = useState("");
  const [report2, setReport2] = useState("");

  const generateLinks = () => {
    try {
      const url = new URL(inputUrl);
      const query = url.search;

      const report1Url = `https://health.mattc.art/${query}`;
      const report2Url = `https://health-admin.mattc.art/${query}`;

      setReport1(report1Url);
      setReport2(report2Url);
    } catch (error) {
      alert("請輸入正確的網址格式。");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Report Link 產生器</h1>
      <Input
        placeholder="貼上 Jinmu 的報告網址"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      <Button variant="outline" onClick={generateLinks}>產生報告連結</Button>

      {report1 && (
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">客戶 Report 1 連結：</p>
            <a
              href={report1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {report1}
            </a>
          </CardContent>
        </Card>
      )}

      {report2 && (
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">教授 Report 2 連結：</p>
            <a
              href={report2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {report2}
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
