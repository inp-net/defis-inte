//Import et export des types prisma pour les modifier si besoin et les utiliser dans le reste du projet
import type { User } from "$lib/server/prisma";

export type {
    User,
}

//#region Types Custom

//#region Churros
export type UserChurros = {
    uid: string;
    fullName: string;
    pictureURL: string;
    churrosGroups: ChurrosGroups[];
    yearTier: number;
};

export type ChurrosGroups = {
    group: ClubInfo;
    secretary: boolean;
    president: boolean;
    vicePresident: boolean;
    treasurer: boolean;
};

export type ClubInfo = {
    uid: string;
};
//#endregion

//#endregion