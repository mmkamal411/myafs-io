interface SearchResponse {
  data: Array<{
    id: string;
    type: 'event' | 'ticket' | 'metric' | 'project';
    title: string;
    description?: string;
    language?: string;
    date?: string;
    priority?: string;
    status?: string;
  }>;
  hasMore: boolean;
}

// Mock search API with simulated delay
export const searchAPI = {
  search: async (query: string, page: number = 1): Promise<SearchResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // Mock data - replace with actual API call
    const mockData = [
      {
        id: '1',
        type: 'event',
        title: 'Team Planning Meeting',
        description: 'Weekly team sync and sprint planning',
        date: '2024-03-20',
        status: 'Upcoming'
      },
      {
        id: '2',
        type: 'ticket',
        title: 'Fix Authentication Bug',
        description: 'Users unable to login with SSO',
        priority: 'High',
        status: 'In Progress'
      },
      {
        id: '3',
        type: 'project',
        title: 'User Dashboard Redesign',
        description: 'Implement new dashboard layout',
        language: 'TypeScript',
        status: 'Active'
      }
    ];

    // Filter and paginate results
    const pageSize = 20;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const filteredData = mockData.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );

    return {
      data: filteredData.slice(start, end),
      hasMore: filteredData.length > end
    };
  }
};