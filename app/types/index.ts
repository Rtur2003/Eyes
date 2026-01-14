// Type Definitions
export interface Metric {
    id: string;
    label: string;
    value: string | number;
    trend?: number;
    status: 'optimal' | 'warning' | 'critical';
}

export interface UserState {
    name: string;
    rank: 'Sovereign' | 'Elite' | 'Initiate';
    netWorth: number;
    isAuthenticated: boolean;
}
