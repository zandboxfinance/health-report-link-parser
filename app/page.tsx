'use client';
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportLinkGenerator() {
  const [inputUrl, setInputUrl] = useState("");
  const [reports, setReports] = useState<{ original: string; report1: string; report2: string }[]>([]);


  const generateLinks = () => {
    const rawLinks = inputUrl
      .split('\n')
      .map(link => link.trim())
      .filter(link => link !== '');

    const generatedReports: typeof reports = [];

    rawLinks.forEach((link) => {
      try {
        const url = new URL(link);
        const query = url.search;

      const report1Url = `https://health.mattc.art/${query}`;

      setReport1(report1Url);
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
        multiline={true}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      
      <Button variant="outline" onClick={generateLinks}>產生報告連結</Button>

      {reports.length > 0 && reports.map((r, index) => (
        <Card key={index}>
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold">原始網址 {index + 1}:</p>

            <p className="font-semibold">客戶 Report 1:</p>
            <a
              href={r.report1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block break-all"
            >
              {r.report1}
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
