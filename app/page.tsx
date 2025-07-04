'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react'; 

type Entry = {
  name: string;
  inputUrl: string;
};

export default function ReportLinkGenerator() {
  const [entries, setEntries] = useState<Entry[]>(
    () => Array.from({ length: 10 }, () => ({ name: '', inputUrl: '' }))
  );

  const [reports, setReports] = useState<
    { original: string; report1: string; report2: string }[]
  >([]);

  const handleEntryChange = (index: number, field: keyof Entry, value: string) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addInputGroup = () => {
    setEntries([...entries, { name: '', inputUrl: '' }]);
  };

  const removeInputGroup = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const generateLinks = () => {
    const generatedReports: typeof reports = [];

    entries.forEach(({ name, inputUrl }) => {
      if (!name.trim() || !inputUrl.trim()) return;

      const rawLinks = inputUrl
        .split('\n')
        .map(link => link.trim())
        .filter(link => link !== '');

      rawLinks.forEach((link) => {
        try {
          const url = new URL(link);
          url.searchParams.set('name', name);
          const queryString = url.search;

          generatedReports.push({
            original: link,
            report1: `https://health.mattc.art${queryString}`,
            report2: `https://health-admin.mattc.art${queryString}`,
          });
        } catch (err) {
          console.warn('❌ Invalid URL:', link);
          alert('請輸入正確的網址格式。');
        }
      });
    });

    setReports(generatedReports);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Report Link 產生器</h1>

      {entries.map((entry, index) => (
        <div
          key={index}
          className="space-y-2 border p-6 rounded-lg mb-4 relative"
        >
          {entries.length > 1 && (
            <button
              onClick={() => removeInputGroup(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              aria-label="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <Input
            placeholder="輸入患者姓名"
            value={entry.name}
            onChange={(e) => handleEntryChange(index, 'name', e.target.value)}
          />
          <Input
            placeholder="貼上 Jinmu 的報告網址"
            value={entry.inputUrl}
            multiline={true}
            onChange={(e) => handleEntryChange(index, 'inputUrl', e.target.value)}
          />
        </div>
      ))}

      <Button variant="outline" onClick={addInputGroup}>
        新增輸入 ➕
      </Button>

      <span style={{padding:5}}/>
      <Button variant="default" onClick={generateLinks}>
        產生報告連結
      </Button>

      {reports.length > 0 &&
        reports.map((r, index) => (
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

              <p className="font-semibold">教授 Report 2:</p>
              <a
                href={r.report2}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block break-all"
              >
                {r.report2}
              </a>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
