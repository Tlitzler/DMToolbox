export interface ICharacterObject {
    name: string;
    imageURL?: string;
    isPlayer?: boolean;
    description?: string;
    id: number;
    factionIds?: number[];
    eventIds?: number[];
    locationId?: number;
    goals?: string;
    status?: string;
    hp: number;
    level: number;
    class?: string[];
    itemIds?: number[];
    platinum?: number;  // amount of platinum carried by character
    gold?: number; // amount of gold carried by character
    siler?: number; // amount of silver carried by character
    copper?: number; // amount of copper carried by character
};

export interface IEnemyObject {
    name: string;
    id: number;
    challengeRating: number;
    description?: string;
    imageURL?: string;
    factionIds?: number[];
    hp: number;
    itemIds?: number[]; // typically magic or special items
    loot?: string; // mundane items or gold
};

export interface IHazardObject {
    name: string;
    id: number;
    type: string;
    description?: string;
    imageURL?: string;
    multiplier?: boolean;
    challengeModifier: number;
};

export interface IEncounterObject {
    name?: string;
    id: number;
    type?: string;
    challengeRating: number;
    enemyIds: number[];
    hazardIds: number[];
    environment?: string;
};

export interface IEntounterTableObject {
    name?: string;
    id: number;
    type: string;
    environments?: string[];
    locationIds?: number[];
    encounterIds: number[];
};

export interface IFactionObject {
    name: string;
    id: number;
    imageURL?: string;
    description?: string;
    characterIds: number[];
    enemyIds: number[];
    eventIds: number[];
};

export interface IEventObject {
    name: string;
    id: number;
    description?: string;
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
    id: number;
    imageURL?: string; // This image is used similarly to roll20 windows with the image and text below
    description?: string;
    characterIds?: number[];
    eventIds?: number[];
    factionIds?: number[];
    encounterTableIds?: number[];
    mapId?: number;
    mapIconId?: number; // This image is used as a map icon, a few will be available to all users or users can upload their own
    iconSize?: number; // How much the icon should be scaled, defaults to 1
    x?: number;
    y?: number;
};

export interface IMapObject {
    name: string;
    id: number;
    imageURL?: string;
    description?: string;
    locationId?: number; // If this is set, this map is a submap and will not appear in the base map selection unless expanded in the toolbar perhaps
    locationIds: number[];
    hexes?: boolean;
    width?: number; // in squares or hexes
    height?: number; // in squares or hexes
    scale?: number; // number of feet per square or hex, defaults to 5
};

export interface IPartyObject {
    name: string;
    id: number;
    imageURL?: string;
    tokenimageURL?: string;
    description?: string;
    characterIds?: number[];
    enemyIds?: number[];
    factionIds?: number[];
    mapId?: number; // If this is set, this party is on a map
    x?: number; // the x location of the party on the map, if the map is a grid it's in squares. Otherwise it's in pixels or something
    y?: number;// same as x
    locationId?: number;
};

export interface IItemObject {
    name: string;
    id: number;
    description?: string;
    imageURL?: string;
    function: string;
    value: number;
};

export interface IFolderObject {
    name: string;
    id: number;
    contents?: {
        type: string;
        id: number;
    }[];
};

export interface INoteObject {
    name: string;
    id: number;
    description: string;
    date: string;
};

export interface ICampaignObject {
    userId: number;
    name: string;
    id: number;
    imageURL?: string; // preview image, not map image
    description: string;
    defaultMapId: number | null;
    characters: ICharacterObject[];
    enemies: IEnemyObject[];
    hazards: IHazardObject[];
    encounters: IEncounterObject[];
    encounterTables: IEntounterTableObject[];
    factions: IFactionObject[];
    events: IEventObject[];
    locations: ILocationObject[];
    maps: IMapObject[];
    parties: IPartyObject[];
    items: IItemObject[];
    folders: IFolderObject[];
    date: string | null;
};