import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Sparkline, SparklineChart } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const generateSparklineData = () => {
  return [...Array(20)].map(() => Math.random() * 100);
};

const cryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 30000, change: 2.5, marketCap: 580, volume: 25, sparkline: generateSparklineData() },
  { name: 'Ethereum', symbol: 'ETH', price: 2000, change: -1.8, marketCap: 240, volume: 15, sparkline: generateSparklineData() },
  { name: 'Cardano', symbol: 'ADA', price: 0.5, change: 3.2, marketCap: 16, volume: 0.8, sparkline: generateSparklineData() },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.08, change: 1.5, marketCap: 11, volume: 0.5, sparkline: generateSparklineData() },
  { name: 'Ripple', symbol: 'XRP', price: 0.6, change: -0.7, marketCap: 30, volume: 1.2, sparkline: generateSparklineData() },
  { name: 'Polkadot', symbol: 'DOT', price: 7, change: 4.2, marketCap: 8, volume: 0.4, sparkline: generateSparklineData() },
  { name: 'Solana', symbol: 'SOL', price: 40, change: 5.1, marketCap: 15, volume: 1.1, sparkline: generateSparklineData() },
  { name: 'Chainlink', symbol: 'LINK', price: 12, change: -2.3, marketCap: 6, volume: 0.3, sparkline: generateSparklineData() },
];

const generateChartData = () => {
  return [...Array(30)].map((_, i) => ({
    day: i + 1,
    BTC: Math.random() * 5000 + 28000,
    ETH: Math.random() * 500 + 1800,
    ADA: Math.random() * 0.2 + 0.4,
    DOGE: Math.random() * 0.05 + 0.05,
  }));
};

const MetricCard = ({ name, symbol, price, change }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="font-bold text-sm">{name}</h3>
      <span className="text-xs text-muted-foreground">{symbol}</span>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">${price.toLocaleString()}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
        {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {Math.abs(change)}%
      </p>
    </CardContent>
  </Card>
);

const TinySparkline = ({ data, color }) => (
  <SparklineChart width={100} height={30} data={data}>
    <Sparkline dataKey="value" stroke={color} fill="none" />
  </SparklineChart>
);

const CryptoDashboard = () => {
  const [chartData, setChartData] = useState(generateChartData());

  const refreshData = () => {
    setChartData(generateChartData());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crypto Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cryptoData.slice(0, 4).map((crypto) => (
          <MetricCard key={crypto.symbol} {...crypto} />
        ))}
      </div>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">Price Trends (30 Days)</h2>
          <Button onClick={refreshData} size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="BTC" stroke="#f7931a" strokeWidth={2} />
                <Line type="monotone" dataKey="ETH" stroke="#627eea" strokeWidth={2} />
                <Line type="monotone" dataKey="ADA" stroke="#0033ad" strokeWidth={2} />
                <Line type="monotone" dataKey="DOGE" stroke="#ba9f33" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Major Cryptocurrencies</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
                <TableHead className="text-right">Market Cap (B)</TableHead>
                <TableHead className="text-right">Volume (B)</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptoData.map((crypto) => (
                <TableRow key={crypto.symbol}>
                  <TableCell className="font-medium">{crypto.name}</TableCell>
                  <TableCell>{crypto.symbol}</TableCell>
                  <TableCell className="text-right">${crypto.price.toLocaleString()}</TableCell>
                  <TableCell className={`text-right ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.change}%
                  </TableCell>
                  <TableCell className="text-right">${crypto.marketCap}B</TableCell>
                  <TableCell className="text-right">${crypto.volume}B</TableCell>
                  <TableCell className="text-right">
                    <TinySparkline 
                      data={crypto.sparkline.map(value => ({ value }))} 
                      color={crypto.change >= 0 ? "#22c55e" : "#ef4444"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoDashboard;