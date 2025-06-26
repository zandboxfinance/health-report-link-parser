'use client';
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportLinkGenerator() {
  const [inputUrl, setInputUrl] = useState("");
  const [report1, setReport1] = useState<string[]>([]);
  const [report2, setReport2] = useState<string[]>([]);

  const generateLinks = () => {
    const rawLinks = inputUrl
      .split('\n')
      .map(link => link.trim())
      .filter(link => link !== '');

    const report1Array: string[] = [];
    const report2Array: string[] = [];

    rawLinks.forEach((link) => {
      try {
        const url = new URL(link);
        const query = url.search;

        const report1Url = `https://health.mattc.art${query}`;
        const report2Url = `https://health-admin.mattc.art${query}`;

        report1Array.push(report1Url);
        report2Array.push(report2Url);
      } catch (err) {
        console.warn("❌ Invalid URL:", link);
        alert("請輸入正確的網址格式。");
      }
    });

    setReport1(report1Array);
    setReport2(report2Array);
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

      {report1.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold">客戶 Report 1 連結：</p>
            {report1.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block break-all"
              >
                {link}
              </a>
            ))}
          </CardContent>
        </Card>
      )}

      {/* {report2.length > 0 && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold">教授 Report 2 連結：</p>
            {report2.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block break-all"
              >
                {link}
              </a>
            ))}
          </CardContent>
        </Card>
      )} */}

    </div>
  );
}
