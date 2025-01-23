import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeZone {
  name: string;
  shortName: string;
  offset: number;
}

const timeZones: TimeZone[] = [
  { name: 'Pacific', shortName: 'PST', offset: -8 },
  { name: 'Mountain', shortName: 'MST', offset: -7 },
  { name: 'Central', shortName: 'CST', offset: -6 },
  { name: 'Eastern', shortName: 'EST', offset: -5 }
];

const TimezoneDisplay = () => {
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const times = timeZones.map(tz => {
        const date = new Date(now.getTime());
        date.setHours(date.getHours() + tz.offset + date.getTimezoneOffset() / 60);
        return date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      });
      setTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-light-200 p-4">
      <div className="flex items-center gap-6">
        {timeZones.map((tz, index) => (
          <div key={tz.shortName} className="flex items-center gap-2">
            {index === 0 && <Clock className="w-4 h-4 text-light-500" />}
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-light-600">{tz.shortName}</span>
              <span className="text-sm font-medium">{times[index]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimezoneDisplay;