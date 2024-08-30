export interface ICharacterObject {
    name: string;
    imageId?: number;
    description?: string;
    id: number;
    factionIds?: number[];
    eventIds?: number[];
    locationId?: number;
    goals?: string;
    status?: string;
    hp: number;
    level: number;
};

export interface IEnemyObject {
    name: string;
    id: number;
    challengeRating: number;
    description?: string;
    imageId?: number;
    factionIds?: number[];
    hp: number;
};

export interface IHazardObject {
    name: string;
    type: string;
    description?: string;
    imageId?: number;
    multiplier?: boolean;
    challengeModifier: number;
};

export interface IEncounterObject {
    name?: string;
    type?: string;
    challengeRating: number;
    enemies: IEnemyObject[];
    hazards: IHazardObject[];
    environment?: string;
};

export interface IEntounterTableObject {
    name?: string;
    id: number;
    type: string;
    environments?: string[];
    locationIds?: number[];
    encounterList: IEncounterObject[];
};

export interface IFactionObject {
    name: string;
    imageId?: number;
    description?: string;
    id: number;
    characterIdList: number[];
    enemyIdList: number[];
    eventIdList: number[];
};

export interface IEventObject {
    name: string;
    description?: string;
    id: number;
    factions?: {
        factionId: number;
        involvement: string;
    }[];
    characters?: {
        characterId: number;
        involvement: string;
    }[];
    locations?: {
        locationId: number;
        involvement: string;
    }[];
    date: string;
    duration: number; // in minutes
    outcome?: string;
};

export interface ILocationObject {
    name: string;
    imageId?: number;
    description?: string;
    id: number;
    characterIdList?: number[];
    eventIdList?: number[];
    factionIdList?: number[];
    encounterTableId?: number;
    mapId?: number;
};

export interface IMapObject {
    name: string;
    imageId?: number;
    description?: string;
    id: number;
    locationId?: number; // If this is set, this map is a submap and will not appear in the base map selection unless expanded in the toolbar perhaps
    locationList: ILocationObject[];
};

export interface IPartyObject {
    name: string;
    imageId?: number;
    tokenImageId?: number;
    description?: string;
    id: number;
    characterList?: ICharacterObject[];
    enemyList?: IEnemyObject[];
    factionList?: IFactionObject[];
    locationId?: number;
};

export interface ICampaignObject {
    userId: number;
    name: string;
    imageId?: number;
    description: string;
    id: number;
    characterList: ICharacterObject[];
    encounterTableList: IEntounterTableObject[];
    factionList: IFactionObject[];
    date: string;
    mapList: IMapObject[];
    partyList: IPartyObject[];
};