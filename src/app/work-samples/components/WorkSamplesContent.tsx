'use client';

import React, { useState } from 'react';
import { Terminal, BarChart2, FileText, ExternalLink, Github, Copy, Check } from 'lucide-react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

type SampleTab = 'code' | 'output' | 'analysis';

interface CodeLine {
  type: string;
  text: string;
}

interface WorkSample {
  id: string;
  title: string;
  project: string;
  description: string;
  tab: SampleTab;
  codeLines: CodeLine[][];
  insight: string;
  chartType?: string;
  chartData?: any[];
  analysisPoints?: string[];
}

const samples: WorkSample[] = [
  {
    id: 'data-cleaning',
    title: 'CSV Data Cleaning — Pandas Pipeline',
    project: 'CSV Data Cleaning Pipeline',
    description: 'Automated data cleaning pipeline removing duplicates, fixing formats, and validating records.',
    tab: 'code',
    insight: 'Automated cleaning reduced manual processing time by ~30% and improved data accuracy significantly.',
    codeLines: [
      [{ type: 'keyword', text: 'import' }, { type: 'normal', text: ' pandas ' }, { type: 'keyword', text: 'as' }, { type: 'normal', text: ' pd' }],
      [{ type: 'keyword', text: 'import' }, { type: 'normal', text: ' numpy ' }, { type: 'keyword', text: 'as' }, { type: 'normal', text: ' np' }],
      [],
      [{ type: 'comment', text: '# Load raw dataset' }],
      [{ type: 'variable', text: 'df' }, { type: 'normal', text: ' = pd.' }, { type: 'function', text: 'read_csv' }, { type: 'normal', text: '(' }, { type: 'string', text: '"raw_data.csv"' }, { type: 'normal', text: ')' }],
      [{ type: 'function', text: 'print' }, { type: 'normal', text: '(' }, { type: 'string', text: 'f"Loaded {len(df)} rows, {df.shape[1]} columns"' }, { type: 'normal', text: ')' }],
      [],
      [{ type: 'comment', text: '# Step 1: Remove duplicate records' }],
      [{ type: 'variable', text: 'before' }, { type: 'normal', text: ' = ' }, { type: 'function', text: 'len' }, { type: 'normal', text: '(df)' }],
      [{ type: 'variable', text: 'df' }, { type: 'normal', text: ' = df.' }, { type: 'function', text: 'drop_duplicates' }, { type: 'normal', text: '()' }],
      [{ type: 'function', text: 'print' }, { type: 'normal', text: '(' }, { type: 'string', text: 'f"Removed {before - len(df)} duplicates"' }, { type: 'normal', text: ')' }],
      [],
      [{ type: 'comment', text: '# Step 2: Handle missing values' }],
      [{ type: 'variable', text: 'df' }, { type: 'normal', text: ' = df.' }, { type: 'function', text: 'dropna' }, { type: 'normal', text: '(subset=[' }, { type: 'string', text: '"id"' }, { type: 'normal', text: ', ' }, { type: 'string', text: '"name"' }, { type: 'normal', text: '])' }],
      [{ type: 'variable', text: 'df[' }, { type: 'string', text: '"value"' }, { type: 'normal', text: '] = df[' }, { type: 'string', text: '"value"' }, { type: 'normal', text: '].' }, { type: 'function', text: 'fillna' }, { type: 'normal', text: '(df[' }, { type: 'string', text: '"value"' }, { type: 'normal', text: '].' }, { type: 'function', text: 'median' }, { type: 'normal', text: '())' }],
      [],
      [{ type: 'comment', text: '# Step 3: Standardize formats' }],
      [{ type: 'variable', text: 'df[' }, { type: 'string', text: '"name"' }, { type: 'normal', text: '] = df[' }, { type: 'string', text: '"name"' }, { type: 'normal', text: '].' }, { type: 'function', text: 'str.strip' }, { type: 'normal', text: '().' }, { type: 'function', text: 'str.title' }, { type: 'normal', text: '()' }],
      [{ type: 'variable', text: 'df[' }, { type: 'string', text: '"date"' }, { type: 'normal', text: '] = pd.' }, { type: 'function', text: 'to_datetime' }, { type: 'normal', text: '(df[' }, { type: 'string', text: '"date"' }, { type: 'normal', text: '], errors=' }, { type: 'string', text: '"coerce"' }, { type: 'normal', text: ')' }],
      [],
      [{ type: 'comment', text: '# Step 4: Validate and export' }],
      [{ type: 'variable', text: 'df' }, { type: 'normal', text: ' = df.' }, { type: 'function', text: 'reset_index' }, { type: 'normal', text: '(drop=' }, { type: 'builtin', text: 'True' }, { type: 'normal', text: ')' }],
      [{ type: 'variable', text: 'df' }, { type: 'normal', text: '.' }, { type: 'function', text: 'to_csv' }, { type: 'normal', text: '(' }, { type: 'string', text: '"clean_data.csv"' }, { type: 'normal', text: ', index=' }, { type: 'builtin', text: 'False' }, { type: 'normal', text: ')' }],
      [{ type: 'function', text: 'print' }, { type: 'normal', text: '(' }, { type: 'string', text: 'f"Clean dataset: {len(df)} rows saved"' }, { type: 'normal', text: ')' }],
    ],
    chartType: 'bar',
    chartData: [
      { group: 'Duplicates', rate: 0.12 },
      { group: 'Missing IDs', rate: 0.05 },
      { group: 'Bad Formats', rate: 0.08 },
      { group: 'Invalid Dates', rate: 0.04 },
      { group: 'Null Values', rate: 0.09 },
      { group: 'Clean Rate', rate: 0.97 },
    ],
    analysisPoints: [
      'Duplicate removal is the first step — even a small percentage of duplicates can skew aggregations and counts significantly.',
      'Dropping rows with missing primary keys (id, name) is safer than imputing — these records cannot be reliably identified.',
      'Median imputation for numeric columns is preferred over mean when outliers are present, as it is more robust.',
      'String standardization (strip + title case) prevents groupby mismatches caused by leading/trailing spaces or inconsistent casing.',
      'Date coercion with errors="coerce" converts unparseable dates to NaT rather than raising exceptions, allowing downstream filtering.',
    ],
  },
  {
    id: 'sql-analysis',
    title: 'SQL Data Extraction & Reporting',
    project: 'SQL Data Analysis & Reporting',
    description: 'SQL queries for data extraction, aggregation, and generating structured reports.',
    tab: 'code',
    insight: 'Combining SQL for extraction with Python for transformation creates a robust, automated reporting pipeline.',
    codeLines: [
      [{ type: 'keyword', text: 'import' }, { type: 'normal', text: ' pandas ' }, { type: 'keyword', text: 'as' }, { type: 'normal', text: ' pd' }],
      [{ type: 'keyword', text: 'import' }, { type: 'normal', text: ' sqlite3' }],
      [],
      [{ type: 'comment', text: '# Connect to database' }],
      [{ type: 'variable', text: 'conn' }, { type: 'normal', text: ' = sqlite3.' }, { type: 'function', text: 'connect' }, { type: 'normal', text: '(' }, { type: 'string', text: '"data.db"' }, { type: 'normal', text: ')' }],
      [],
      [{ type: 'comment', text: '# Query: aggregate records by category' }],
      [{ type: 'variable', text: 'query' }, { type: 'normal', text: ' = ' }, { type: 'string', text: '"""' }],
      [{ type: 'string', text: '    SELECT category,' }],
      [{ type: 'string', text: '           COUNT(*) AS total_records,' }],
      [{ type: 'string', text: '           AVG(value) AS avg_value,' }],
      [{ type: 'string', text: '           SUM(amount) AS total_amount' }],
      [{ type: 'string', text: '    FROM records' }],
      [{ type: 'string', text: '    WHERE status = "active"' }],
      [{ type: 'string', text: '    GROUP BY category' }],
      [{ type: 'string', text: '    ORDER BY total_amount DESC' }],
      [{ type: 'string', text: '"""' }],
      [],
      [{ type: 'comment', text: '# Load into DataFrame for further processing' }],
      [{ type: 'variable', text: 'df' }, { type: 'normal', text: ' = pd.' }, { type: 'function', text: 'read_sql_query' }, { type: 'normal', text: '(query, conn)' }],
      [],
      [{ type: 'comment', text: '# Validate and export report' }],
      [{ type: 'variable', text: 'df[' }, { type: 'string', text: '"avg_value"' }, { type: 'normal', text: '] = df[' }, { type: 'string', text: '"avg_value"' }, { type: 'normal', text: '].' }, { type: 'function', text: 'round' }, { type: 'normal', text: '(' }, { type: 'number', text: '2' }, { type: 'normal', text: ')' }],
      [{ type: 'variable', text: 'df' }, { type: 'normal', text: '.' }, { type: 'function', text: 'to_excel' }, { type: 'normal', text: '(' }, { type: 'string', text: '"report.xlsx"' }, { type: 'normal', text: ', index=' }, { type: 'builtin', text: 'False' }, { type: 'normal', text: ')' }],
      [{ type: 'function', text: 'print' }, { type: 'normal', text: '(' }, { type: 'string', text: 'f"Report generated: {len(df)} categories"' }, { type: 'normal', text: ')' }],
    ],
    chartType: 'bar-horizontal',
    chartData: [
      { feature: 'Category A', importance: 0.85 },
      { feature: 'Category B', importance: 0.72 },
      { feature: 'Category C', importance: 0.65 },
      { feature: 'Category D', importance: 0.58 },
      { feature: 'Category E', importance: 0.43 },
    ],
    analysisPoints: [
      'Using GROUP BY with COUNT and SUM provides a quick summary of data distribution across categories.',
      'Filtering with WHERE status = "active" before aggregation ensures only valid records are included in the report.',
      'Loading SQL results into pandas DataFrames enables further cleaning, formatting, and export to Excel.',
      'Rounding numeric columns to 2 decimal places before export improves readability in business reports.',
      'Combining SQL for data extraction with Python for transformation creates a reproducible, automated reporting pipeline.',
    ],
  },
  {
    id: 'excel-automation',
    title: 'Excel Workflow Automation',
    project: 'Excel Workflow Automation',
    description: 'Python-based automation of Excel cleaning workflows to replace manual data processing.',
    tab: 'code',
    insight: 'Automating repetitive Excel tasks with Python saved approximately 30% of manual processing time at Afrilance.',
    codeLines: [
      [{ type: 'keyword', text: 'import' }, { type: 'normal', text: ' pandas ' }, { type: 'keyword', text: 'as' }, { type: 'normal', text: ' pd' }],
      [{ type: 'keyword', text: 'from' }, { type: 'normal', text: ' openpyxl ' }, { type: 'keyword', text: 'import' }, { type: 'normal', text: ' load_workbook' }],
      [],
      [{ type: 'comment', text: '# Load Excel file with multiple sheets' }],
      [{ type: 'variable', text: 'xl' }, { type: 'normal', text: ' = pd.' }, { type: 'function', text: 'ExcelFile' }, { type: 'normal', text: '(' }, { type: 'string', text: '"data.xlsx"' }, { type: 'normal', text: ')' }],
      [{ type: 'variable', text: 'sheets' }, { type: 'normal', text: ' = xl.sheet_names' }],
      [],
      [{ type: 'comment', text: '# Process each sheet automatically' }],
      [{ type: 'variable', text: 'cleaned_sheets' }, { type: 'normal', text: ' = {}' }],
      [{ type: 'keyword', text: 'for' }, { type: 'normal', text: ' sheet ' }, { type: 'keyword', text: 'in' }, { type: 'normal', text: ' sheets:' }],
      [{ type: 'variable', text: '    df' }, { type: 'normal', text: ' = xl.' }, { type: 'function', text: 'parse' }, { type: 'normal', text: '(sheet)' }],
      [{ type: 'comment', text: '    # Remove empty rows and columns' }],
      [{ type: 'variable', text: '    df' }, { type: 'normal', text: ' = df.' }, { type: 'function', text: 'dropna' }, { type: 'normal', text: '(how=' }, { type: 'string', text: '"all"' }, { type: 'normal', text: ')' }],
      [{ type: 'variable', text: '    df' }, { type: 'normal', text: ' = df.' }, { type: 'function', text: 'dropna' }, { type: 'normal', text: '(axis=' }, { type: 'number', text: '1' }, { type: 'normal', text: ', how=' }, { type: 'string', text: '"all"' }, { type: 'normal', text: ')' }],
      [{ type: 'comment', text: '    # Standardize column names' }],
      [{ type: 'variable', text: '    df.columns' }, { type: 'normal', text: ' = [c.' }, { type: 'function', text: 'strip' }, { type: 'normal', text: '().' }, { type: 'function', text: 'lower' }, { type: 'normal', text: '().' }, { type: 'function', text: 'replace' }, { type: 'normal', text: '(' }, { type: 'string', text: '" "' }, { type: 'normal', text: ', ' }, { type: 'string', text: '"_"' }, { type: 'normal', text: ')' }, { type: 'keyword', text: ' for' }, { type: 'normal', text: ' c ' }, { type: 'keyword', text: 'in' }, { type: 'normal', text: ' df.columns]' }],
      [{ type: 'variable', text: '    cleaned_sheets[sheet]' }, { type: 'normal', text: ' = df' }],
      [],
      [{ type: 'comment', text: '# Write cleaned data back to Excel' }],
      [{ type: 'keyword', text: 'with' }, { type: 'normal', text: ' pd.' }, { type: 'function', text: 'ExcelWriter' }, { type: 'normal', text: '(' }, { type: 'string', text: '"cleaned_data.xlsx"' }, { type: 'normal', text: ') ' }, { type: 'keyword', text: 'as' }, { type: 'normal', text: ' writer:' }],
      [{ type: 'keyword', text: '    for' }, { type: 'normal', text: ' name, df ' }, { type: 'keyword', text: 'in' }, { type: 'normal', text: ' cleaned_sheets.' }, { type: 'function', text: 'items' }, { type: 'normal', text: '():' }],
      [{ type: 'normal', text: '        df.' }, { type: 'function', text: 'to_excel' }, { type: 'normal', text: '(writer, sheet_name=name, index=' }, { type: 'builtin', text: 'False' }, { type: 'normal', text: ')' }],
    ],
    chartType: 'pie',
    chartData: [
      { name: 'Automated', value: 70, color: 'hsl(158 64% 52%)' },
      { name: 'Manual Review', value: 20, color: 'hsl(186 100% 60%)' },
      { name: 'Exceptions', value: 10, color: 'hsl(35 90% 65%)' },
    ],
    analysisPoints: [
      'Automating multi-sheet Excel processing eliminates repetitive manual work and reduces human error in data preparation.',
      'Standardizing column names (lowercase, underscores) ensures consistency across sheets and simplifies downstream processing.',
      'Dropping fully empty rows and columns before processing prevents false aggregations and improves data quality.',
      'Using ExcelWriter to write multiple sheets in one pass is more efficient than writing individual files.',
      'This automation approach reduced manual processing time by approximately 30% at Afrilance, freeing up time for higher-value analysis.',
    ],
  },
];

function CodeToken({ type, text }: { type: string; text: string }) {
  const colorMap: Record<string, string> = {
    keyword: 'text-purple-400',
    string: 'text-emerald-400',
    comment: 'text-zinc-500 italic',
    function: 'text-cyan-400',
    number: 'text-amber-400',
    variable: 'text-blue-300',
    builtin: 'text-orange-400',
    normal: 'text-zinc-300',
  };
  return <span className={colorMap[type] || 'text-zinc-300'}>{text}</span>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-zinc-400">{label}</p>
        <p className="text-xs text-cyan-400 font-mono font-semibold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function WorkSamplesContent() {
  const [activeSample, setActiveSample] = useState(samples[0].id);
  const [activeTab, setActiveTab] = useState<SampleTab>('code');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sample = samples.find((s) => s.id === activeSample)!;

  const handleCopy = () => {
    const code = sample.codeLines
      .map((line) => line.map((t) => t.text).join(''))
      .join('\n');
    navigator.clipboard.writeText(code);
    setCopiedId(sample.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Work Samples</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Real code, real outputs, real analysis — from actual project work
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sample Selector */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">Samples</p>
          {samples.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveSample(s.id); setActiveTab('code'); }}
              className={`
                w-full text-left p-3.5 rounded-xl border transition-all duration-150
                ${activeSample === s.id
                  ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-400' :'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }
              `}
            >
              <p className="text-xs font-semibold leading-tight">{s.title}</p>
              <p className="text-xs text-zinc-500 mt-1 font-mono leading-tight">{s.project}</p>
            </button>
          ))}

          {/* Key Insight */}
          <div className="mt-4 p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/20">
            <p className="text-xs font-medium text-emerald-400 mb-1">Key Insight</p>
            <p className="text-xs text-zinc-300 leading-relaxed">{sample.insight}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3 space-y-4">
          {/* Sample Header */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-white">{sample.title}</h2>
                <p className="text-xs text-zinc-400 mt-1">{sample.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                    {sample.project}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/mgboh-freddie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all"
                >
                  <Github size={15} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-all"
                >
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            {[
              { id: 'code' as SampleTab, label: 'Source Code', icon: Terminal },
              { id: 'output' as SampleTab, label: 'Chart Output', icon: BarChart2 },
              { id: 'analysis' as SampleTab, label: 'Analysis Notes', icon: FileText },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-150
                    ${activeTab === tab.id
                      ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300'
                    }
                  `}
                >
                  <TabIcon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'code' && (
            <div className="code-block rounded-xl">
              <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/60" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  </div>
                  <Terminal size={12} className="text-zinc-500 ml-2" />
                  <span className="text-xs text-zinc-500 font-mono">{sample.id}.py</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs transition-all active:scale-95"
                >
                  {copiedId === sample.id ? (
                    <><Check size={12} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                  ) : (
                    <><Copy size={12} />Copy</>
                  )}
                </button>
              </div>
              <div className="p-5 overflow-x-auto scrollbar-thin">
                <div className="space-y-1 font-mono text-sm min-w-max">
                  {sample.codeLines.map((line, i) => (
                    <div key={i} className="flex hover:bg-zinc-800/40 rounded px-1 -mx-1 transition-colors">
                      <span className="text-zinc-600 text-xs w-7 text-right mr-5 select-none tabular-nums pt-0.5 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>
                        {line.length === 0 ? <>&nbsp;</> : line.map((token, j) => (
                          <CodeToken key={j} type={token.type} text={token.text} />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'output' && (
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-semibold text-white">Chart Output</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Simulated output visualization</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono">
                  {sample.chartType}
                </span>
              </div>

              {sample.chartType === 'bar' && sample.chartData && (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={sample.chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid stroke="hsl(240 6% 14%)" strokeDasharray="3 3" />
                    <XAxis dataKey="group" tick={{ fill: 'hsl(240 5% 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: 'hsl(240 5% 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
                            <p className="text-xs text-zinc-400">{label}</p>
                            <p className="text-xs text-cyan-400 font-mono font-semibold">{((payload[0].value as number) * 100).toFixed(1)}%</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                      {sample.chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.rate > 0.5 ? 'hsl(158 64% 52%)' : entry.rate > 0.3 ? 'hsl(186 100% 60%)' : 'hsl(0 84% 60%)'} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {sample.chartType === 'bar-horizontal' && sample.chartData && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sample.chartData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                    <CartesianGrid stroke="hsl(240 6% 14%)" strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{ fill: 'hsl(240 5% 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <YAxis type="category" dataKey="feature" tick={{ fill: 'hsl(240 5% 65%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} tickLine={false} axisLine={false} width={80} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
                            <p className="text-xs text-zinc-400">{label}</p>
                            <p className="text-xs text-emerald-400 font-mono font-semibold">{payload[0].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Bar dataKey="importance" radius={[0, 4, 4, 0]} fill="hsl(158 64% 52%)" fillOpacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {sample.chartType === 'pie' && sample.chartData && (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={sample.chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                      {sample.chartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} fillOpacity={0.85} />
                      ))}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 shadow-xl">
                            <p className="text-xs font-semibold text-white">{payload[0].name}</p>
                            <p className="text-xs text-cyan-400 font-mono">{payload[0].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Legend formatter={(value) => <span className="text-xs text-zinc-400">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              )}

              <div className="mt-4 p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                <p className="text-xs text-zinc-500 font-mono">
                  <span className="text-emerald-400">✓ insight:</span>{' '}
                  <span className="text-zinc-300">{sample.insight}</span>
                </p>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Analysis Notes</h3>
              <div className="space-y-3">
                {sample.analysisPoints?.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-zinc-950/40 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <span className="text-xs font-mono text-cyan-400 font-bold flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
                <p className="text-xs font-medium text-cyan-400 mb-1">Key Takeaway</p>
                <p className="text-sm text-zinc-300 leading-relaxed">{sample.insight}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}