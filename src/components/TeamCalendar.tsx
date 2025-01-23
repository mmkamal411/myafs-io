import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'sprint_planning' | 'standup' | 'code_freeze' | 'release' | 'retro';
  startTime: string;
  endTime: string;
  attendees: string[];
  description?: string;
  location?: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Sprint Planning',
    type: 'sprint_planning',
    startTime: '2024-03-18T10:00:00Z',
    endTime: '2024-03-18T12:00:00Z',
    attendees: ['Team Alpha', 'Product Owner'],
    description: 'Sprint 24 Planning Session',
    location: 'Main Conference Room'
  },
  {
    id: '2',
    title: 'Daily Standup',
    type: 'standup',
    startTime: '2024-03-18T09:00:00Z',
    endTime: '2024-03-18T09:15:00Z',
    attendees: ['Team Alpha'],
    location: 'Virtual'
  },
  {
    id: '3',
    title: 'Code Freeze',
    type: 'code_freeze',
    startTime: '2024-03-20T00:00:00Z',
    endTime: '2024-03-21T00:00:00Z',
    attendees: ['All Teams'],
    description: 'Production deployment preparation'
  },
  {
    id: '4',
    title: 'Release Window',
    type: 'release',
    startTime: '2024-03-21T10:00:00Z',
    endTime: '2024-03-21T12:00:00Z',
    attendees: ['DevOps Team', 'Team Leads'],
    description: 'v2.4.0 Release'
  },
  {
    id: '5',
    title: 'Sprint Retrospective',
    type: 'retro',
    startTime: '2024-03-22T14:00:00Z',
    endTime: '2024-03-22T15:00:00Z',
    attendees: ['Team Alpha'],
    location: 'Virtual'
  }
];

const getEventColor = (type: Event['type']) => {
  switch (type) {
    case 'sprint_planning':
      return 'bg-green-100 text-green-600 border-green-200';
    case 'standup':
      return 'bg-blue-100 text-blue-600 border-blue-200';
    case 'code_freeze':
      return 'bg-red-100 text-red-600 border-red-200';
    case 'release':
      return 'bg-purple-100 text-purple-600 border-purple-200';
    case 'retro':
      return 'bg-orange-100 text-orange-600 border-orange-200';
  }
};

const TeamCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleSyncCalendar = () => {
    // Implement calendar sync logic
    console.log('Syncing calendar...');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Team Calendar
        </h2>
        <button
          onClick={handleSyncCalendar}
          className="px-4 py-2 bg-accent-gradient text-white text-sm font-medium rounded-lg hover:shadow-md transition-all duration-300"
        >
          Sync Calendar
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={`p-4 rounded-lg border ${getEventColor(event.type)} cursor-pointer hover:shadow-md transition-all duration-300`}
            onClick={() => handleEventClick(event)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {' - '}
                      {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {event.location && (
                    <>
                      <span>•</span>
                      <span>{event.location}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Users className="w-4 h-4" />
                <span>{event.attendees.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">{selectedEvent.title}</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Time</div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(selectedEvent.startTime).toLocaleString()}
                    {' - '}
                    {new Date(selectedEvent.endTime).toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedEvent.location && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Location</div>
                  <div>{selectedEvent.location}</div>
                </div>
              )}

              <div>
                <div className="text-sm text-gray-600 mb-1">Attendees</div>
                <div className="space-y-1">
                  {selectedEvent.attendees.map((attendee, index) => (
                    <div key={index}>{attendee}</div>
                  ))}
                </div>
              </div>

              {selectedEvent.description && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Description</div>
                  <div>{selectedEvent.description}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-accent-gradient text-white font-medium rounded-lg hover:shadow-md transition-all duration-300">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCalendar;