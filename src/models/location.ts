export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime_epoch: number;
    localtime: string;
    tz_id: string,
}

export interface SearchLocation {
    id: number,
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}